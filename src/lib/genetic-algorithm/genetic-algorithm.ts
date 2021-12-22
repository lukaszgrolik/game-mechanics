interface BestFitted<T> {
    value: T;
    fitness: number;
    generation: number;
}

interface OnGenerationOpts<T> {
    generation: number;
    bestFitted: BestFitted<T>[]
    meanFitness: number;
}

interface Opts<T> {
    population: number;
    startValue: T;
    callbackEveryIteration: number;
    calcFitness: (value: T) => number;
    canMutate: () => boolean;
    mutate: (value: T) => T;
    onGeneration: (opts: OnGenerationOpts<T>) => void | boolean;
    onNewBestFitted: (currentIteration: number, bestFittedArr: BestFitted<T>[]) => void;
}

export function geneticAlgorithm<T>(opts: Opts<T>) {
    let currentGen = 0;

    const currentPopulation: T[] = new Array(opts.population).fill(opts.startValue);

    // for (let i = 0; i < opts.population; i++) {
    //     currentPopulation[i] = opts.startValue
    // }

    // let currentValue = opts.startValue;
    let currentFitness = 0;

    const bestFittedArr: BestFitted<T>[] = [];

    while (true) {
        currentGen += 1;
        let currentGenFitnessSum = 0;

        for (let i = 0; i < opts.population; i++) {
            if (opts.canMutate()) {
                currentPopulation[i] = opts.mutate(currentPopulation[i]);
            }

            let currentValue = currentPopulation[i];

            currentFitness = opts.calcFitness(currentValue);
            currentGenFitnessSum += currentFitness;

            const currentBestFitted = !bestFittedArr.length ? null : bestFittedArr[bestFittedArr.length - 1];

            if (bestFittedArr.length === 0 || (currentBestFitted && currentFitness > currentBestFitted.fitness)) {
                bestFittedArr.push({
                    generation: currentGen,
                    value: currentValue,
                    fitness: currentFitness,
                });

                opts.onNewBestFitted(currentGen, bestFittedArr);
            }
        }

        if (currentGen > 0 && currentGen % opts.callbackEveryIteration === 0) {
            const stop = opts.onGeneration({
                generation: currentGen,
                bestFitted: bestFittedArr,
                meanFitness: currentGenFitnessSum / opts.population,
            });

            if (stop) {
                break;
            }
        }
    }
}