class Opt<T> {
    value: T;

    constructor(value: T) {
        this.value = value;
    }
}

function Some<T>(val: T): Opt<T> {
    return new Opt(val);
}

function None() {

}

class Enum {

}

new Enum()

//
//
//

function x(): Opt<number> {
    return Some(123);
}

const res = x();
res

function match<T>(val: T, patterns: (() => null)[]) {

}

match(res, [
    () => null
]);