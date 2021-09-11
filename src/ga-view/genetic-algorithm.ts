interface BestFitted<T> {
    value: T;
    fitness: number;
    iteration: number;
}

interface Opts<T> {
    startValue: T;
    callbackEveryIteration: number;
    calcFitness: (value: T) => number;
    mutate: (value: T) => T;
    onIteration: (currentIteration: number, bestFittedArr: BestFitted<T>[]) => void | boolean;
    onNewBestFitted: (currentIteration: number, bestFittedArr: BestFitted<T>[]) => void;
}

export function geneticAlgorithm<T>(opts: Opts<T>) {
    let currentIteration = 0;
    let currentValue = opts.startValue;
    let currentFitness = 0;

    const bestFittedArr: BestFitted<T>[] = [];

    while (true) {
        currentIteration += 1;

        currentValue = opts.mutate(currentValue);
        currentFitness = opts.calcFitness(currentValue);

        const currentBestFitted = !bestFittedArr.length ? null : bestFittedArr[bestFittedArr.length - 1];

        if (bestFittedArr.length === 0 || (currentBestFitted && currentFitness > currentBestFitted.fitness)) {
            bestFittedArr.push({
                iteration: currentIteration,
                value: currentValue,
                fitness: currentFitness,
            });

            opts.onNewBestFitted(currentIteration, bestFittedArr);
        }

        if (currentIteration > 0 && currentIteration % opts.callbackEveryIteration === 0) {
            const stop = opts.onIteration(currentIteration, bestFittedArr)

            if (stop) {
                break;
            }
        }
    }
}