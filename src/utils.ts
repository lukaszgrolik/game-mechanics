export function arr<T>(n: number): number[] {
    return new Array(n).fill(undefined).map((_, i) => i);

}
export function times<T>(n: number, cb: (i: number) => T): T[] {
    return new Array(n).fill(undefined).map((_, i) => {
        return cb(i);
    });
}

export class List<T> {
    private readonly array: T[] = [];

    add(el: T) {
        this.array.push(el);
    }

    remove(el: T) {
        const index = this.array.indexOf(el);

        if (index === -1) {
            throw new Error();
        }
        else {
            this.array.splice(index, 1);
        }
    }
}