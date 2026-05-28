import json
with open('models/charizard.geo.json') as f:
    geo = json.load(f)['minecraft:geometry'][0]
    for b in geo['bones']:
        print(f"{b['name']}: parent={b.get('parent')}, pivot={b.get('pivot')}")
