export function arr<T>(n: number): number[] {
    return new Array(n).fill(undefined).map((_, i) => i);

}
export function times<T>(n: number, cb: (i: number) => T): T[] {
    return new Array(n).fill(undefined).map((_, i) => {
        return cb(i);
    });
}