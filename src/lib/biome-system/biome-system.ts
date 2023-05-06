import * as _ from '../../utils';

// tests:


// use cases:
// default desert biome becomes green if grass planted

// interface BiomeGrid {
//     getNeighborTiles(tile: BiomeTile): BiomeTile[];
// }

// interface BiomeTile {
//     onUpdate(): void;
// }

// class BiomeSystem {
//     update(deltaTime: number) {

//     }
// }

//
//
//
//
//

// use cases:
// trees growing over time
// vegetation grows in good conditions and dies in bad conditions |
// vegetation appears near friendly species (e.g. trees, grass, bushes)
// influence of temperature, sun, rain/snow - leaves change colors in autumn, trees lose leaves in winter, trees grow faster in rain and sun

export interface EcosystemBiome {

}

export interface EcosystemCondition {

}

export interface EcosystemBiomeUnit<TPos> {
    position: TPos;
    biome: EcosystemBiome;
    getNeighborSpaceUnits(): EcosystemBiomeUnit<TPos>[];
    update(deltaTime: number): void;
}

export interface EcosystemObject {
    getFitness(): number;
    grow(deltaTime: number): void;
    deteriorate(deltaTime: number): void;
}

export class EcosystemSystem<TPos> {
    readonly biomeUnits: EcosystemBiomeUnit<TPos>[] = [];
    readonly objects: EcosystemObject[] = [];



    addBiomes(biomes: EcosystemBiome[]) {

    }

    addBiomeUnits(biomeUnits: EcosystemBiomeUnit<TPos>[]) {
        this.biomeUnits.push(...biomeUnits);
    }

    addObject(ecosObject: EcosystemObject, pos: TPos) {
        this.objects.push(ecosObject);

        // @todo assign object to space unit
    }

    // applyBiome(pos: TPos, strength: number) {

    // }

    applyCondition(pos: TPos) {

    }

    update(deltaTime: number) {
        for (let i = 0; i < this.biomeUnits.length; i++) {
            const spaceUnit = this.biomeUnits[i];

            spaceUnit.update(deltaTime);
        }

        for (let i = 0; i < this.objects.length; i++) {
            const obj = this.objects[i];

            const fitness = obj.getFitness();
        }
    }
}

