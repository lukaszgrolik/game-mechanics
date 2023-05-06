export function value(a: number = 0, b: number = 1) {
    return a + Math.random() * (b - a);
}

export function range(start: number, end: number): number {
    // return start + Math.floor(Math.random() * (end - start + 1));
    return start + Math.floor(Math.random() * (end - start));
}

export function sample<T>(arr: T[]): T {
    const index = Math.floor(Math.random() * arr.length);

    return arr[index];
}

export function samples<T>(arr: T[], n: number): T[] {
    const result = new Array(n);
    let len = arr.length;
    const taken = new Array(len);

    if (n > len) {
        throw new RangeError("more elements taken than available");
    }

    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }

    return result;
}

export function randomNormal(): number {
    let u = 0;
    let v = 0;

    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();

    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    num = num / 10.0 + 0.5; // Translate to 0 -> 1

    if (num > 1 || num < 0) return randomNormal() // resample between 0 and 1

    return num
}

export function sampleNormal<T>(values: T[]): T {
    const val = Math.abs(randomNormal() - .5) * 2;
    const l = values.length;

    let found: T = null as any;

    for (let i = 0; i < l; ++i) {
        const x = (i + 1) / l;

        if (val <= x) {
            found = values[i]
            break;
        }
    }

    return found;
}

export namespace weighted {
    export function value(cfg: number[]): number {
        let sum = 0;
        for (let i = 0; i < cfg.length; ++i) {
            sum += cfg[i];
        }

        const index = Math.floor(Math.random() * sum);

        let currentSum = 0;
        for (let i = 0; i < cfg.length; ++i) {
            currentSum += cfg[i];
            if (index < currentSum) return i;
        }

        throw new Error("iteration exceeded");
    }

    export function sample<T>(cfg: number[], arr: T[]) {
        if (cfg.length != arr.length) throw new Error('weights and values must be of the same length');

        const index = value(cfg);

        return arr[index];
    }

    export function samples() {

    }
}
