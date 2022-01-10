import { geneticAlgorithm } from "../../lib/genetic-algorithm/genetic-algorithm";
import { getBoundingBoxOfBoxes } from "../../lib/geom/bounding";
import { Box } from "../../lib/geom/shape2d";
import * as random from '../../lib/random';
import { RectCollider } from "../../lib/sim-engine/collider2d";
import { SimEngine } from "../../lib/sim-engine/sim-engine";
import { SimObject } from "../../lib/sim-engine/sim-object";

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const signsArr = `${alphabet} `.split('');

interface Opts {
    // rects: Box[];
    size: {width: number; height: number};
    simEngine: SimEngine;
    rectObjects: SimObject[];
    rectsBB: SimObject;
    onGenerationFinished: () => void;
    onNewBestFitted: () => void;
}

export function gaRects(gaOpts: Opts) {
    const {simEngine} = gaOpts;
    const startingBB = new Box(0, 0, gaOpts.size.width, gaOpts.size.height);
    let bestFittedBB = startingBB;

    geneticAlgorithm({
        population: 10,
        startValue: {
            boundingBox: startingBB,
            objects: gaOpts.rectObjects.slice(),
        },
        callbackEveryIteration: 10,
        calcFitness: (val) => {
            // calc bounding rect size of all rects

            return 1 / val.boundingBox.getPerimeter();
        },
        canMutate: () => {
            return Math.random() < .2;
        },
        mutate: (val) => {
            // move some/all to 1) random place 2) without colliding 3) within current bounding box while 4) every rect touches at least one other rect's side

            const changePositions = () => {
                for (let i = 0; i < val.objects.length; ++i) {
                    const obj = val.objects[i];
                    const objSize = (obj.collider2d as RectCollider).box.size;

                    // const bbPos = bestFittedBB.position;
                    const bbPos = val.boundingBox.position;
                    // const bbSize = bestFittedBB.size;
                    const bbSize = val.boundingBox.size;

                    obj.transform.position.x = random.value(bbPos.x, bbPos.x + bbSize.x - objSize.x);
                    obj.transform.position.y = random.value(bbPos.y, bbPos.y + bbSize.y - objSize.y);
                }

                simEngine.detectCollisions();
            };

            changePositions();

            let i = 0;
            while (simEngine.getCollisions().length > 0) {
                changePositions();

                i += 1;
                const nIter = 1000;
                if (i == nIter) {
                    // console.warn(`loop broken after ${nIter} iterations`);
                    break;
                }
            }

            const collBndBoxes = val.objects.map(obj => {
                if (!obj.collider2d || obj.collider2d.isActive === false) return;

                return obj.collider2d.getBoundingBox();
            }).filter(bb => bb) as Box[];
            const bndBox = getBoundingBoxOfBoxes(collBndBoxes);

            return {
                boundingBox: bndBox,
                objects: gaOpts.rectObjects.slice(),
            };
        },
        onGeneration: opts => {
            // @todo avg gen time
            console.log('iteration done', opts.generation, opts.meanFitness, opts.bestFitted.slice());

            // return opts.generation > 100_000 || (opts.bestFitted.length > 0 && opts.bestFitted[opts.bestFitted.length - 1].value === wantedText);
            gaOpts.onGenerationFinished();

            return opts.generation >= 200;
        },
        onNewBestFitted: (currentIteration, bestFittedArr) => {
            console.log('new best fitted', currentIteration, bestFittedArr.slice());

            bestFittedBB = bestFittedArr[bestFittedArr.length - 1].value.boundingBox;

            console.log(bestFittedBB);
            gaOpts.rectsBB.transform.setPosition(bestFittedBB.position);
            (gaOpts.rectsBB.collider2d as RectCollider).box.setSize(bestFittedBB.size);

            gaOpts.onNewBestFitted();
        },
    })
}