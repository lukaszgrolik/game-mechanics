import * as _ from '../../utils';
import { EcosystemBiome, EcosystemCondition, EcosystemObject, EcosystemBiomeUnit, EcosystemSystem } from "./biome-system";

// svg examples:
// 20x20 top-down grid - trees as rectangles | rain area as semi-transparent rectangle
// 1x29 side-view straight line
// (later) irregular sideview line | top-down voronoi

// normal trees - M sun, M rain, M temp
// pine trees - M sun, M rain, L temp
// cacti - H sun, L rain, H temp
// palm tree - H sun, H rain,
// fungi - L sun, H rain, L-M temp


// @todo object max growth height
// @todo object influence radius & strength // magical tree maintaining green area within strong winter environment
// @todo object spread
// @todo multiple biomes per spaceUnit? share + strength? e.g. desert + grass, snow + grass

// @todo biome in spaceUnit influences objects within
// @todo object influences its biome
// @todo biome influences neighboring biomes
// @todo object influences neighboring objects

// @todo biome influences effects (rain strength)
// @todo effect influences biome

// @todo object compatibility with multiple biomes

// questions:
// should effects in fact be objects?
// should conditions be explicitly applied to ecosystem instead of biomes? in such case biomes would be derived from conditions and it would be required to define which conditions are biomes made from

class EcosObj_Grass implements EcosystemObject {
    getFitness() {
        return 0;
    }

    grow(deltaTime: number) {

    }

    deteriorate(deltaTime: number) {

    }
}

class EcosObj_MapleTree implements EcosystemObject {
    size = { x: 1, y: 1 };

    getFitness() {
        return 0;
    }

    grow(deltaTime: number) {
        this.size.x += .02;
        this.size.y += .2;
    }

    deteriorate(deltaTime: number) {

    }
}

class EcosCond_Temperature implements EcosystemCondition { }
class EcosCond_Insolation implements EcosystemCondition { }
class EcosCond_Moisture implements EcosystemCondition { }
class EcosCond_Radiation implements EcosystemCondition { }

// effects:
// rain, snow, acid rain
// sun rays | corruption/death rays | radiation/mutation rays
// wind
// magic - super fast growth/heal | fast corruption/death | fast mutation/radiation

class EcosBiome_Barren implements EcosystemBiome { }
class EcosBiome_Grass implements EcosystemBiome { }
class EcosBiome_Highland implements EcosystemBiome { }
class EcosBiome_Jungle implements EcosystemBiome { }
class EcosBiome_Snow implements EcosystemBiome { }
class EcosBiome_Desert implements EcosystemBiome { }

const ecos = new EcosystemSystem<[number, number]>();

const ecosBiome_barren = new EcosBiome_Barren();
ecos.addBiomes([
    ecosBiome_barren,
    new EcosBiome_Grass(),
    new EcosBiome_Highland(),
    new EcosBiome_Jungle(),
    new EcosBiome_Snow(),
    new EcosBiome_Desert(),
]);

class Tile implements EcosystemBiomeUnit<[number, number]> {
    constructor(
        public position: [number, number],
        public biome: EcosystemBiome
    ) {

    }

    getNeighborSpaceUnits(): EcosystemBiomeUnit<[number, number]>[] {
        return [];
    }

    update(deltaTime: number) {

    }
}

ecos.addBiomeUnits(
    _.times(20, y => {
        return _.times(20, x => {
            const tileBiomeUnit = new Tile(
                [(-10 + x) * 10, (-10 + y) * 10],
                ecosBiome_barren
            );

            return tileBiomeUnit;
        });
    }).flat()
)

ecos.addObject(new EcosObj_MapleTree(), [0, 0]);

// set to moderate conditions, then colder, less sun and loop

const interval = 200;
setInterval(() => {
    ecos.update(interval / 1000);
}, interval);