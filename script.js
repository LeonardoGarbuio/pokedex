const pokemonData = {
    venusaur: {
        id: 3,
        nomePopular: "Venusaur",
        nomeCientifico: "Bufo floris",
        classe: "Anfíbio / Fito-Simbiótico",
        ancestralComum: "Bulbasaur",
        metamorfose: "Bulbasaur -> Ivysaur -> Venusaur",
        arvoreFilogenetica: `[Ancestral Anfíbio Basal]\n ├── Linha Puramente Aquática\n │    └── Poliwag ➔ Poliwhirl\n │\n └── Linha Terrestre Simbiótica\n      └── Bulbasaur ➔ Ivysaur ➔ Venusaur`,
        biologia: "Exemplo perfeito de Simbiose (Mutualismo). A planta em suas costas realiza fotossíntese e fornece energia ao animal.",
        shinyFilter: "hue-rotate(35deg) saturate(1.5) brightness(1.1)",
        mega: {
            id: 10033,
            nomePopular: "Mega Venusaur",
            nomeCientifico: "Bufo floris gigas",
            biologia: "[MEGA EVOLUÇÃO] Hiper-mutação induzida por radiação de Mega Stone. A simbiose atinge um pico insustentável, onde a planta absorve energia metabólica massiva para criar uma estrutura floral gigantesca. Estado instável e temporário."
        }
    },
    charizard: {
        id: 6,
        nomePopular: "Charizard",
        nomeCientifico: "Lacerta flamma alatus",
        classe: "Réptil Voador (Falso Dragão)",
        ancestralComum: "Charmander",
        metamorfose: "Charmander -> Charmeleon -> Charizard",
        arvoreFilogenetica: `[Ancestral Reptiliano de Fogo]\n ├── Linha Quadrúpede Terrestre\n │    └── Salandit ➔ Salazzle\n │\n └── Linha Bípede Alada\n      └── Charmander ➔ Charmeleon ➔ Charizard`,
        biologia: "Um caso clássico de Evolução Convergente. Apesar da anatomia idêntica aos grandes dragões, pertence à linhagem dos lagartos de fogo.",
        shinyFilter: "grayscale(1) brightness(0.35) contrast(1.5)",
        mega: {
            id: 10034,
            nomePopular: "Mega Charizard X",
            nomeCientifico: "Lacerta flamma draconicus",
            biologia: "[MEGA EVOLUÇÃO] Atavismo genético radioativo. O corpo sofre hipertrofia imediata e reativa genes draconídeos dormentes. A combustão interna supera 2000°C, alterando letalmente sua estrutura óssea e o espectro térmico das chamas."
        }
    },
    gengar: {
        id: 94,
        nomePopular: "Gengar",
        nomeCientifico: "Spectrum toxicum",
        classe: "Organismo Gasoso Parasita",
        ancestralComum: "Gastly",
        metamorfose: "Gastly -> Haunter -> Gengar",
        arvoreFilogenetica: `[Ancestral Espectral Gasoso]\n ├── Linha Fogo Combustível\n │    └── Litwick ➔ Lampent\n │\n └── Linha Tóxica Venenosa\n      └── Gastly ➔ Haunter ➔ Gengar`,
        biologia: "Atua como um fungo ou organismo gasoso. Sobrevive atuando como um parasita sorrateiro de energia térmica.",
        shinyFilter: "brightness(0.7) contrast(1.2)",
        mega: {
            id: 10038,
            nomePopular: "Mega Gengar",
            nomeCientifico: "Spectrum toxicum abyssalis",
            biologia: "[MEGA EVOLUÇÃO] A radiação rompe sua coesão molecular, forçando o organismo a se fundir com o solo para estabilizar a própria massa gasosa. Esse estado expande suas capacidades predatórias de absorção térmica."
        }
    },
    vaporeon: {
        id: 134,
        nomePopular: "Vaporeon",
        nomeCientifico: "Canis aquaticus",
        classe: "Mamífero Marinho",
        ancestralComum: "Eevee (Irradiação Adaptativa)",
        metamorfose: "Eevee -> Vaporeon",
        arvoreFilogenetica: `[Ancestral Mamífero (Eevee)]\n ├── Adaptação Térmica\n │    ├── Flareon (Calor)\n │    └── Glaceon (Frio)\n │\n └── Adaptação Aquática\n      └── Vaporeon`,
        biologia: "Exemplo de Irradiação Adaptativa. Mutação genética do Eevee para ocupar nichos aquáticos.",
        shinyFilter: "hue-rotate(50deg) saturate(1.2)"
    },
    dragonite: {
        id: 149,
        nomePopular: "Dragonite",
        nomeCientifico: "Draco miticus",
        classe: "Dragão Verdadeiro",
        ancestralComum: "Dratini",
        metamorfose: "Dratini -> Dragonair -> Dragonite",
        arvoreFilogenetica: `[Ancestral Draconídeo Marinho]\n ├── Linha Serpentina das Profundezas\n │    └── Gyarados (Convergência)\n │\n └── Linha Alada de Superfície\n      └── Dratini ➔ Dragonair ➔ Dragonite`,
        biologia: "Superpredador aerodinâmico dos oceanos, com envergadura pequena porém potente.",
        shinyFilter: "hue-rotate(110deg) saturate(0.8) brightness(0.9)"
    },
    tyranitar: {
        id: 248,
        nomePopular: "Tyranitar",
        nomeCientifico: "Tyrannosaurus saxeus",
        classe: "Réptil Terrestre Encouraçado",
        ancestralComum: "Larvitar",
        metamorfose: "Larvitar -> Pupitar -> Tyranitar",
        arvoreFilogenetica: `[Ancestral Terrestre Cascudão]\n ├── Linha Couraçada Quadrúpede\n │    └── Aron ➔ Lairon ➔ Aggron\n │\n └── Linha Terópode Bípede\n      └── Larvitar ➔ Pupitar ➔ Tyranitar`,
        biologia: "Ciclo de vida semelhante aos insetos. Apex predador que fortifica sua carapaça mineral.",
        shinyFilter: "hue-rotate(-55deg) saturate(0.55) brightness(1.3)",
        mega: {
            id: 10049,
            nomePopular: "Mega Tyranitar",
            nomeCientifico: "Tyrannosaurus saxeus apex",
            biologia: "[MEGA EVOLUÇÃO] Exposição radioativa cristaliza e deforma subitamente a carapaça em estacas rígidas. A dor metabólica inibe o raciocínio superior, restringindo-o a instintos primitivos e violentos de territorialidade."
        }
    },
    lucario: {
        id: 448,
        nomePopular: "Lucario",
        nomeCientifico: "Canis aura",
        classe: "Mamífero Bípede",
        ancestralComum: "Riolu",
        metamorfose: "Riolu -> Lucario",
        arvoreFilogenetica: `[Ancestral Canídeo Lupino]\n ├── Linha Feral (Quadrúpede)\n │    └── Poochyena ➔ Mightyena\n │\n └── Linha Bípede Sensitiva\n      └── Riolu ➔ Lucario`,
        biologia: "Capaz de ler e manipular ondas eletromagnéticas (Aura) para prever movimentos.",
        shinyFilter: "hue-rotate(185deg) saturate(2)",
        mega: {
            id: 10052,
            nomePopular: "Mega Lucario",
            nomeCientifico: "Canis aura superior",
            biologia: "[MEGA EVOLUÇÃO] Hiper-estimulação das glândulas neurais. O excesso de energia eletromagnética cria marcas de queimadura em seu corpo e eleva perigosamente sua capacidade sensorial a níveis que beiram o colapso nervoso."
        }
    },
    garchomp: {
        id: 445,
        nomePopular: "Garchomp",
        nomeCientifico: "Carcharodontosaurus terrestris",
        classe: "Elasmobrânquio Terrestre",
        ancestralComum: "Gible",
        metamorfose: "Gible -> Gabite -> Garchomp",
        arvoreFilogenetica: `[Ancestral Cartilaginoso]\n ├── Linha Aquática\n │    └── Sharpedo\n │\n └── Linha Terrestre\n      └── Gible ➔ Gabite ➔ Garchomp`,
        biologia: "Evolução convergente com tubarões, adaptado para escavar em solo árido.",
        shinyFilter: "saturate(0.5) brightness(0.8)",
        mega: {
            id: 10058,
            nomePopular: "Mega Garchomp",
            nomeCientifico: "Carcharodontosaurus terrestris falx",
            biologia: "[MEGA EVOLUÇÃO] O surto de mutação funde os ossos dos membros superiores diretamente à epiderme. As barbatanas se hipertrofiam em foices expostas, resultando em um frenesi crônico por conta das lesões nervosas abertas."
        }
    },
    haxorus: {
        id: 612,
        nomePopular: "Haxorus",
        nomeCientifico: "Securisaurus maxillaris",
        classe: "Réptil Terrestre Escamoso",
        ancestralComum: "Axew",
        metamorfose: "Axew -> Fraxure -> Haxorus",
        arvoreFilogenetica: `[Ancestral Réptil Mandibular]\n ├── Linha Crânio Rígido\n │    └── Cranidos ➔ Rampardos\n │\n └── Linha Presas de Machado\n      └── Axew ➔ Fraxure ➔ Haxorus`,
        biologia: "Presas hipertrofiadas na forma de machados de queratina rígida.",
        shinyFilter: "grayscale(1) brightness(0.3) contrast(1.5)"
    },
    hydreigon: {
        id: 635,
        nomePopular: "Hydreigon",
        nomeCientifico: "Hydra tenebris",
        classe: "Dragão Policéfalo Múltiplo",
        ancestralComum: "Deino",
        metamorfose: "Deino -> Zweilous -> Hydreigon",
        arvoreFilogenetica: `[Ancestral Draconídeo das Trevas]\n ├── Linha Alada Simples\n │    └── Noibat ➔ Noivern\n │\n └── Linha Policéfala\n      └── Deino ➔ Zweilous ➔ Hydreigon`,
        biologia: "Caso de policefalia onde apenas a cabeça central possui funções cerebrais plenamente desenvolvidas.",
        shinyFilter: "hue-rotate(-120deg) saturate(1.2)"
    },
    greninja: {
        id: 658,
        nomePopular: "Greninja",
        nomeCientifico: "Rana shinobi",
        classe: "Anfíbio Aquático",
        ancestralComum: "Froakie",
        metamorfose: "Froakie -> Frogadier -> Greninja",
        arvoreFilogenetica: `[Ancestral Anfíbio Ágil]\n ├── Linha Venenosa\n │    └── Croagunk ➔ Toxicroak\n │\n └── Linha Hidrocinética\n      └── Froakie ➔ Frogadier ➔ Greninja`,
        biologia: "Manipula a umidade do ar para criar projéteis d'água pressurizada.",
        shinyFilter: "grayscale(1) brightness(0.25) contrast(1.5)",
        mega: {
            id: 10092,
            nomePopular: "Ash-Greninja",
            nomeCientifico: "Rana shinobi bond",
            biologia: "[FENÔMENO DE LIGAÇÃO] Uma mutação rara ativada por sincronia neural. A energia hidrodinâmica nas costas se condensa em uma shuriken massiva e a pigmentação se altera."
        }
    },
    talonflame: {
        id: 663,
        nomePopular: "Talonflame",
        nomeCientifico: "Falco flamma",
        classe: "Ave de Rapina Termofílica",
        ancestralComum: "Fletchling",
        metamorfose: "Fletchling -> Fletchinder -> Talonflame",
        arvoreFilogenetica: `[Ancestral Ave de Rapina]\n ├── Linha Voadora Padrão\n │    └── Pidgey ➔ Pidgeotto\n │\n └── Linha Termofílica\n      └── Fletchling ➔ Fletchinder ➔ Talonflame`,
        biologia: "Ave termofílica que inflama sacos de gás internos para ataques aéreos de alta temperatura.",
        shinyFilter: "hue-rotate(-20deg) saturate(1.5)"
    }
};

const pokemonListContainer = document.getElementById('pokemon-list');
const mainScreen = document.getElementById('main-screen');
const pokeImage = document.getElementById('poke-image');
const threeCanvas = document.getElementById('three-canvas');
const pokeName = document.getElementById('poke-name');
const pokeSciName = document.getElementById('poke-sci-name');
const dataPanel = document.getElementById('data-panel');
const imageBaseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

// Pagination State
let currentPageIndex = 0;
let currentPokeKey = 'charizard';
let isShiny = false;
let isMega = false;

const btnPrevPage = document.getElementById('btn-prev-page');
const btnNextPage = document.getElementById('btn-next-page');
const btnShiny = document.getElementById('btn-shiny');
const btnMega = document.getElementById('btn-mega');

// Fallback function when 3D model loading fails
function triggerFallback(pokeKey) {
    console.warn(`[Pokédex] Falha ao carregar 3D para ${pokeKey}. Fallback 2D ativado.`);
    threeCanvas.classList.add('hidden');
    pokeImage.classList.remove('hidden');
    pokeImage.style.opacity = '1';
}

function renderTerminalPage(pokeKey, pageIndex) {
    const data = pokemonData[pokeKey];
    let contentHTML = '';

    let nomePopular = data.nomePopular;
    let nomeCientifico = data.nomeCientifico;
    if (isMega && data.mega) {
        nomePopular = data.mega.nomePopular;
        nomeCientifico = data.mega.nomeCientifico;
    }

    if (pageIndex === 0) {
        contentHTML = `
            <div class="border-b border-green-700 pb-2 mb-2">
                <span class="text-green-200 text-sm md:text-base">» ESPÉCIME:</span><br>
                <strong class="uppercase text-white text-xl">${nomePopular}</strong>
            </div>
            <div class="border-b border-green-700 pb-2 mb-2">
                <span class="text-green-200 text-sm md:text-base">» NOMENCLATURA BINOMIAL:</span><br>
                <i class="text-green-300">${nomeCientifico}</i>
            </div>
            <div class="border-b border-green-700 pb-2 mb-2">
                <span class="text-green-200 text-sm md:text-base">» CLASSIFICAÇÃO:</span><br>
                <span>${data.classe}</span>
            </div>
        `;
    } else if (pageIndex === 1) {
        if (data.arvoreFilogenetica) {
            contentHTML = `
                <div>
                    <span class="text-green-200 text-sm md:text-base">» ÁRVORE FILOGENÉTICA (Clado: Chondrichthyes):</span><br>
                    <pre class="text-sm md:text-base text-yellow-300 mt-2 font-mono bg-transparent border-none overflow-hidden">${data.arvoreFilogenetica}</pre>
                </div>
            `;
        } else {
            contentHTML = `
                <div class="border-b border-green-700 pb-2 mb-2">
                    <span class="text-green-200 text-sm md:text-base">» ANCESTRALIDADE COMUM:</span><br>
                    <span class="text-white">${data.ancestralComum}</span>
                </div>
                <div>
                    <span class="text-green-200 text-sm md:text-base">» LINHA METAMÓRFICA:</span><br>
                    <p class="text-sm md:text-base text-yellow-300 mt-1">${data.metamorfose}</p>
                </div>
            `;
        }
    } else if (pageIndex === 2) {
        let biologia = data.biologia;
        if (isMega && data.mega) {
            biologia = data.mega.biologia;
        }
        contentHTML = `
            <div>
                <span class="text-green-200 text-sm md:text-base">» NOTAS BIOLÓGICAS:</span><br>
                <p class="text-base md:text-lg leading-relaxed text-gray-300 mt-2 text-justify">${biologia}</p>
            </div>
        `;
    }

    const titles = ["TAXONOMIA", "METAMORFOSE", "FISIOLOGIA"];
    
    // Digital pagination navigation UI
    const panelHTML = `
        <div class="flex justify-between items-center bg-gray-800 text-gray-400 p-1 mb-4 rounded border border-gray-700 shadow-inner text-xs">
            <button id="dig-btn-prev" class="px-2 hover:text-white cursor-pointer transition-colors active:scale-95">◀</button>
            <span>PÁG ${pageIndex + 1}/3: ${titles[pageIndex]}</span>
            <button id="dig-btn-next" class="px-2 hover:text-white cursor-pointer transition-colors active:scale-95">▶</button>
        </div>
        <div id="page-content" class="animate-pulse-once">
            ${contentHTML}
        </div>
    `;
    dataPanel.innerHTML = panelHTML;

    // Bind digital buttons inside the terminal
    document.getElementById('dig-btn-prev').onclick = () => prevPage();
    document.getElementById('dig-btn-next').onclick = () => nextPage();
}

function prevPage() {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        renderTerminalPage(currentPokeKey, currentPageIndex);
    }
}

function nextPage() {
    if (currentPageIndex < 2) {
        currentPageIndex++;
        renderTerminalPage(currentPokeKey, currentPageIndex);
    }
}

function renderPokemonData(pokeKey) {
    currentPokeKey = pokeKey;
    currentPageIndex = 0; // reset page on new selection
    const data = pokemonData[pokeKey];
    
    // Prepare visually for transition
    pokeImage.style.opacity = '0';
    threeCanvas.style.opacity = '0';
    
    setTimeout(() => {
        // Hide image initially while model loads
        pokeImage.classList.add('hidden');
        threeCanvas.classList.remove('hidden');
        threeCanvas.style.opacity = '1';
        
        let modelKey = pokeKey;
        let nomePopular = data.nomePopular;
        let nomeCientifico = data.nomeCientifico;
        
        if (data.mega) {
            btnMega.classList.remove('hidden');
        } else {
            btnMega.classList.add('hidden');
            isMega = false;
            btnMega.classList.remove('bg-purple-300', 'border-purple-500');
            btnMega.classList.add('bg-purple-500', 'border-purple-700');
        }

        if (isMega && data.mega) {
            modelKey = pokeKey + "_mega";
            nomePopular = data.mega.nomePopular;
            nomeCientifico = data.mega.nomeCientifico;
        }

        const basePath = isShiny ? "shiny/" : "";
        pokeImage.src = `${imageBaseUrl}${basePath}${data.id}.png`;
        pokeImage.alt = nomePopular;
        pokeImage.style.filter = "none";
        
        // Use custom Bedrock parser, passing isShiny to load the correct texture
        loadBedrockModel(modelKey, threeCanvas, () => {
            triggerFallback(pokeKey);
        }, isShiny);
        
        pokeName.innerText = nomePopular;
        pokeSciName.innerText = nomeCientifico;
        
        mainScreen.style.backgroundColor = '#8bac0f';
        setTimeout(() => { mainScreen.style.backgroundColor = '#9bbc0f'; }, 150);

        // Render first page of terminal content
        renderTerminalPage(pokeKey, currentPageIndex);
    }, 300);
}

function renderMenu() {
    pokemonListContainer.innerHTML = '';
    Object.keys(pokemonData).forEach(key => {
        const poke = pokemonData[key];
        const btn = document.createElement('button');
        btn.className = "bg-blue-200 hover:bg-blue-400 border-b-4 border-r-4 border-blue-600 rounded p-1 flex items-center justify-center transition-all active:border-b-0 active:border-r-0 active:mt-1 shadow-inner";
        const basePath = isShiny ? "shiny/" : "";
        const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${basePath}${poke.id}.png`;
        btn.innerHTML = `<img src="${spriteUrl}" alt="${poke.nomePopular}" class="w-10 h-10 pixelated">`;
        btn.onclick = () => {
            if (currentPokeKey !== key) {
                isMega = false;
                btnMega.classList.remove('bg-purple-300', 'border-purple-500');
                btnMega.classList.add('bg-purple-500', 'border-purple-700');
            }
            document.body.style.cursor = 'wait';
            setTimeout(() => document.body.style.cursor = 'default', 300);
            renderPokemonData(key);
        };
        pokemonListContainer.appendChild(btn);
    });
}

function initMenu() {
    renderMenu();
    // Initialize with first loaded pokemon
    renderPokemonData('charizard');
}

window.onload = () => {
    initMenu();
    
    // Bind physical hardware buttons below the screen
    btnPrevPage.onclick = () => prevPage();
    btnNextPage.onclick = () => nextPage();

    if (btnShiny) {
        btnShiny.onclick = () => {
            isShiny = !isShiny;
            if (isShiny) {
                btnShiny.classList.add('bg-yellow-200', 'border-yellow-400');
                btnShiny.classList.remove('bg-yellow-400', 'border-yellow-600');
            } else {
                btnShiny.classList.remove('bg-yellow-200', 'border-yellow-400');
                btnShiny.classList.add('bg-yellow-400', 'border-yellow-600');
            }
            
            renderMenu();
            renderPokemonData(currentPokeKey);
        };
    }

    if (btnMega) {
        btnMega.onclick = () => {
            if (!pokemonData[currentPokeKey].mega) return;
            isMega = !isMega;
            if (isMega) {
                btnMega.classList.add('bg-purple-300', 'border-purple-500');
                btnMega.classList.remove('bg-purple-500', 'border-purple-700');
            } else {
                btnMega.classList.remove('bg-purple-300', 'border-purple-500');
                btnMega.classList.add('bg-purple-500', 'border-purple-700');
            }
            
            renderPokemonData(currentPokeKey);
        };
    }
};
