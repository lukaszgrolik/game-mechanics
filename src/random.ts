export function range(start: number, end: number): number {
    return start + Math.floor(Math.random() * (end - start + 1));
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
        throw new RangeError("getRandom: more elements taken than available");
    }

    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }

    return result;
}

