let currentBedrockScene = null;
let bedrockRenderer = null;
let bedrockAnimationId = null;
let clock = new THREE.Clock();
let activeTextures = [];
let activeGeometries = [];
let activeMaterials = [];

function clearThreeJSMemory() {
    if (bedrockAnimationId) cancelAnimationFrame(bedrockAnimationId);
    
    activeTextures.forEach(t => t.dispose());
    activeGeometries.forEach(g => g.dispose());
    activeMaterials.forEach(m => m.dispose());
    
    activeTextures = [];
    activeGeometries = [];
    activeMaterials = [];

    if (bedrockRenderer) {
        bedrockRenderer.dispose();
        bedrockRenderer.forceContextLoss();
        bedrockRenderer = null;
    }
}

const BEDROCK_MATH = {
    sin: (deg) => Math.sin(deg * Math.PI / 180),
    cos: (deg) => Math.cos(deg * Math.PI / 180),
    abs: Math.abs,
    min: Math.min,
    max: Math.max,
    clamp: (v, min, max) => Math.max(min, Math.min(max, v)),
    pi: Math.PI,
    round: Math.round,
    floor: Math.floor,
    ceil: Math.ceil
};

function parseMolang(expr) {
    if (typeof expr === 'number') return () => expr;
    if (typeof expr !== 'string') return () => 0;
    
    let jsExpr = expr.replace(/math\./g, 'm.');
    jsExpr = jsExpr.replace(/q\./g, 'q.').replace(/query\./g, 'q.');
    
    try {
        const fn = new Function('m', 'q', `return ${jsExpr};`);
        return (q) => fn(BEDROCK_MATH, q);
    } catch(e) {
        return () => 0; // Fail silently for complex molang
    }
}

function parseTrack(trackData) {
    if (Array.isArray(trackData)) {
        const fns = trackData.map(parseMolang);
        return (q) => [fns[0](q), fns[1](q), fns[2](q)];
    }
    
    if (typeof trackData === 'object') {
        const keyframes = [];
        for (const [timeStr, data] of Object.entries(trackData)) {
            const time = parseFloat(timeStr);
            let valueArray;
            if (Array.isArray(data)) valueArray = data;
            else if (data.post) valueArray = data.post;
            else valueArray = [0,0,0];
            
            keyframes.push({ time, fns: valueArray.map(parseMolang) });
        }
        keyframes.sort((a, b) => a.time - b.time);
        
        if (keyframes.length === 0) return () => [0,0,0];
        if (keyframes.length === 1) return (q) => [keyframes[0].fns[0](q), keyframes[0].fns[1](q), keyframes[0].fns[2](q)];
        
        return (q) => {
            const t = q.anim_time;
            const maxTime = keyframes[keyframes.length-1].time;
            const modT = maxTime > 0 ? t % maxTime : 0;
            
            let k1 = keyframes[0], k2 = keyframes[keyframes.length-1];
            for(let i=0; i<keyframes.length-1; i++) {
                if(modT >= keyframes[i].time && modT <= keyframes[i+1].time) {
                    k1 = keyframes[i]; k2 = keyframes[i+1]; break;
                }
            }
            if (k1 === k2) return [k1.fns[0](q), k1.fns[1](q), k1.fns[2](q)];
            
            const progress = (modT - k1.time) / (k2.time - k1.time);
            const v1 = [k1.fns[0](q), k1.fns[1](q), k1.fns[2](q)];
            const v2 = [k2.fns[0](q), k2.fns[1](q), k2.fns[2](q)];
            
            return [
                v1[0] + (v2[0] - v1[0]) * progress,
                v1[1] + (v2[1] - v1[1]) * progress,
                v1[2] + (v2[2] - v1[2]) * progress
            ];
        }
    }
    return () => [0,0,0];
}

function setFaceUV(geometry, faceIndex, uX, uY, uW, uH, texW, texH) {
    const uvs = geometry.attributes.uv.array;
    const v0 = faceIndex * 8;
    
    let x1 = uX / texW;
    let x2 = (uX + uW) / texW;
    let y1 = 1.0 - (uY + uH) / texH;
    let y2 = 1.0 - uY / texH;

    uvs[v0 + 0] = x1; uvs[v0 + 1] = y2;
    uvs[v0 + 2] = x2; uvs[v0 + 3] = y2;
    uvs[v0 + 4] = x1; uvs[v0 + 5] = y1;
    uvs[v0 + 6] = x2; uvs[v0 + 7] = y1;
}

function loadBedrockModel(pokeKey, containerElement, fallbackCallback) {
    clearThreeJSMemory();
    
    if (currentBedrockScene) {
        containerElement.innerHTML = '';
        currentBedrockScene = null;
    }

    const scene = new THREE.Scene();
    currentBedrockScene = scene;

    const camera = new THREE.PerspectiveCamera(45, containerElement.clientWidth / containerElement.clientHeight, 0.1, 1000);
    camera.position.set(0, 5, 45); // Afastando um pouco para não cortar

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(containerElement.clientWidth, containerElement.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // Fundo 100% invisível/transparente
    containerElement.appendChild(renderer.domElement);
    bedrockRenderer = renderer;

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(20, 50, 20);
    scene.add(dirLight);

    const jsonUrl = `models/${pokeKey}.geo.json`;
    const animUrl = `models/${pokeKey}.animation.json`;
    const textureUrl = `models/${pokeKey}.png`;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(textureUrl, (texture) => {
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        activeTextures.push(texture);
        
        Promise.all([
            fetch(jsonUrl).then(r => r.ok ? r.json() : null),
            fetch(animUrl).then(r => r.ok ? r.json() : null)
        ])
        .then(([geoData, animData]) => {
            if (!geoData) throw new Error("Geometry not found");
            
            const geo = geoData['minecraft:geometry'][0];
            const texW = geo.description.texture_width || 64;
            const texH = geo.description.texture_height || 64;
            const bones = geo.bones;

            const material = new THREE.MeshLambertMaterial({ 
                map: texture, 
                alphaTest: 0.1,
                transparent: true,
                side: THREE.DoubleSide
            });
            activeMaterials.push(material);

            const rootGroup = new THREE.Group();
            
            const boneGroups = {};
            const animatedBones = [];

            // Setup animations
            let activeAnim = null;
            if (animData && animData.animations) {
                const animKeys = Object.keys(animData.animations);
                let selectedKey = animKeys.find(k => k.includes('ground_idle')) || animKeys.find(k => k.includes('idle')) || animKeys[0];
                if (selectedKey) activeAnim = animData.animations[selectedKey];
            }

            bones.forEach(bone => {
                const group = new THREE.Group();
                group.name = bone.name;
                
                let animTracks = null;
                if (activeAnim && activeAnim.bones && activeAnim.bones[bone.name]) {
                    const bAnim = activeAnim.bones[bone.name];
                    animTracks = {
                        rot: bAnim.rotation ? parseTrack(bAnim.rotation) : null,
                        pos: bAnim.position ? parseTrack(bAnim.position) : null
                    };
                }

                boneGroups[bone.name] = { 
                    group, 
                    data: bone, 
                    basePos: [0,0,0], 
                    baseRot: bone.rotation || [0,0,0],
                    animTracks 
                };
                
                if (animTracks) animatedBones.push(boneGroups[bone.name]);
            });

            bones.forEach(bone => {
                const bg = boneGroups[bone.name];
                const group = bg.group;

                const px = bone.pivot ? bone.pivot[0] : 0;
                const py = bone.pivot ? bone.pivot[1] : 0;
                const pz = bone.pivot ? bone.pivot[2] : 0;

                let parentPx = 0, parentPy = 0, parentPz = 0;
                
                if (bone.parent && boneGroups[bone.parent]) {
                    const parentBg = boneGroups[bone.parent];
                    parentBg.group.add(group);
                    parentPx = parentBg.data.pivot ? parentBg.data.pivot[0] : 0;
                    parentPy = parentBg.data.pivot ? parentBg.data.pivot[1] : 0;
                    parentPz = parentBg.data.pivot ? parentBg.data.pivot[2] : 0;
                } else {
                    rootGroup.add(group);
                }

                // Base position relative to parent in raw coordinates
                bg.basePos = [px - parentPx, py - parentPy, pz - parentPz];
                
                // Initialize with negated X for position and -X, -Y for rotation
                group.position.set(-bg.basePos[0], bg.basePos[1], bg.basePos[2]);
                group.rotation.set(
                    THREE.MathUtils.degToRad(-bg.baseRot[0]),
                    THREE.MathUtils.degToRad(-bg.baseRot[1]),
                    THREE.MathUtils.degToRad(bg.baseRot[2]),
                    'ZYX'
                );

                if (bone.cubes) {
                    bone.cubes.forEach(cube => {
                        const w = cube.size[0];
                        const h = cube.size[1];
                        const d = cube.size[2];
                        
                        const inflate = cube.inflate || 0;
                        const geom = new THREE.BoxGeometry(w + inflate*2, h + inflate*2, d + inflate*2);
                        activeGeometries.push(geom);
                        
                        if (cube.uv) {
                            const u = cube.uv[0];
                            const v = cube.uv[1];
                            setFaceUV(geom, 0, u + d + w, v + d, d, h, texW, texH); 
                            setFaceUV(geom, 1, u, v + d, d, h, texW, texH);         
                            setFaceUV(geom, 2, u + d, v, w, d, texW, texH);         
                            setFaceUV(geom, 3, u + d + w, v, w, d, texW, texH);     
                            setFaceUV(geom, 4, u + d, v + d, w, h, texW, texH);     
                            setFaceUV(geom, 5, u + d + w + d, v + d, w, h, texW, texH); 
                        }

                        const mesh = new THREE.Mesh(geom, material);
                        
                        const ox = cube.origin[0];
                        const oy = cube.origin[1];
                        const oz = cube.origin[2];
                        
                        const cx = ox + w / 2;
                        const cy = oy + h / 2;
                        const cz = oz + d / 2;
                        
                        mesh.position.set(-(cx - px), cy - py, cz - pz);

                        if (cube.rotation) {
                            const cubeGroup = new THREE.Group();
                            const cpx = cube.pivot ? cube.pivot[0] : cx;
                            const cpy = cube.pivot ? cube.pivot[1] : cy;
                            const cpz = cube.pivot ? cube.pivot[2] : cz;
                            
                            cubeGroup.position.set(-(cpx - px), cpy - py, cpz - pz);
                            cubeGroup.rotation.set(
                                THREE.MathUtils.degToRad(-cube.rotation[0]),
                                THREE.MathUtils.degToRad(-cube.rotation[1]),
                                THREE.MathUtils.degToRad(cube.rotation[2]),
                                'ZYX'
                            );
                            
                            mesh.position.set(-(cx - cpx), cy - cpy, cz - cpz);
                            cubeGroup.add(mesh);
                            group.add(cubeGroup);
                        } else {
                            group.add(mesh);
                        }
                    });
                }
            });

            scene.add(rootGroup);

            // Rotate whole model to face camera correctly (Three.js uses Z backwards)
            rootGroup.rotation.y = Math.PI;

            const box = new THREE.Box3().setFromObject(rootGroup);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            
            const scale = 20 / maxDim; // Reduzindo a escala para caber na tela sem cortar
            rootGroup.scale.set(scale, scale, scale);
            
            rootGroup.position.x = -center.x * scale;
            rootGroup.position.y = -center.y * scale;
            rootGroup.position.z = -center.z * scale;
            
            // Attach animation loop
            clock.start();
            
            function animate() {
                if (!currentBedrockScene) return;
                bedrockAnimationId = requestAnimationFrame(animate);
                
                const time = clock.getElapsedTime();
                const q = { anim_time: time };
                
                animatedBones.forEach(bg => {
                    let aRot = [0,0,0];
                    let aPos = [0,0,0];
                    if (bg.animTracks.rot) aRot = bg.animTracks.rot(q);
                    if (bg.animTracks.pos) aPos = bg.animTracks.pos(q);
                    
                    bg.group.position.set(
                        -(bg.basePos[0] + aPos[0]), 
                        bg.basePos[1] + aPos[1], 
                        bg.basePos[2] + aPos[2]
                    );
                    
                    bg.group.rotation.set(
                        THREE.MathUtils.degToRad(-(bg.baseRot[0] + aRot[0])),
                        THREE.MathUtils.degToRad(-(bg.baseRot[1] + aRot[1])),
                        THREE.MathUtils.degToRad(bg.baseRot[2] + aRot[2]),
                        'ZYX'
                    );
                });
                
                controls.update();
                renderer.render(scene, camera);
            }
            animate();
            
        })
        .catch(err => {
            console.error("Bedrock Parser Error:", err);
            if (fallbackCallback) fallbackCallback();
        });
    }, undefined, (err) => {
        console.error("Texture Load Error:", err);
        if (fallbackCallback) fallbackCallback();
    });

    window.addEventListener('resize', () => {
        if (!currentBedrockScene) return;
        camera.aspect = containerElement.clientWidth / containerElement.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerElement.clientWidth, containerElement.clientHeight);
    });
}
