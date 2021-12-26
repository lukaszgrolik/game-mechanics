import { geneticAlgorithm } from "../../lib/genetic-algorithm/genetic-algorithm";
import { getBoundingBoxOfBoxes } from "../../lib/geom/bounding";
import { Box } from "../../lib/geom/shape2d";
import * as random from '../../lib/random';
import { SimEngine } from "../../lib/sim-engine/sim-engine";

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const signsArr = `${alphabet} `.split('');

interface Opts {
    // rects: Box[];
    simEngine: SimEngine;
    onGenerationFinished: () => void;
}

export function gaRects(gaOpts: Opts) {
    // const currentBestBoundingBox = new Box(0, 0, 1000, 1000);
    const {simEngine} = gaOpts;

    geneticAlgorithm({
        population: 1000,
        startValue: {
            boundingBox: new Box(0, 0, 1000, 1000),
            objects: simEngine.getObjects(),
        },
        callbackEveryIteration: 10,
        calcFitness: (val) => {
            // calc bounding rect size of all rects

            return val.boundingBox.getPerimeter();
        },
        canMutate: () => {
            return Math.random() < .2;
        },
        mutate: (val) => {
            // move some/all to random place without colliding within current bounding box

            for (let i = 0 ; i < val.objects.length; ++i) {
                const obj = val.objects[i];

                const bbPos = val.boundingBox.position;
                const bbSize = val.boundingBox.size;

                obj.transform.position.x = random.value(bbPos.x, bbPos.x + bbSize.x);
                obj.transform.position.y = random.value(bbPos.y, bbPos.y + bbSize.y);
            }

            simEngine.detectCollisions();

            const collBndBoxes = val.objects.map(obj => {
                return obj.collider2d.getBoundingBox();
            });
            const bndBox = getBoundingBoxOfBoxes(collBndBoxes);

            return {
                boundingBox: bndBox,
                objects: simEngine.getObjects(),
            };
        },
        onGeneration: opts => {
            // @todo avg gen time
            console.log('iteration done', opts.generation, opts.meanFitness, opts.bestFitted.slice());

            // return opts.generation > 100_000 || (opts.bestFitted.length > 0 && opts.bestFitted[opts.bestFitted.length - 1].value === wantedText);
            gaOpts.onGenerationFinished();

            return opts.generation >= 50;
        },
        onNewBestFitted: (currentIteration, bestFittedArr) => {
            console.log('new best fitted', currentIteration, bestFittedArr.slice());

            // currentBestBoundingBox =
        },
    })
}