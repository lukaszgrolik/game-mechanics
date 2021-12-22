export class Vector2 {
    static zero() {
        return new Vector2(0, 0);
    }

    static one() {
        return new Vector2(1, 1);
    }

    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    update(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(x: number, y: number): Vector2;
    add(v: Vector2): Vector2;
    add(...args: unknown[]): Vector2 {
        if (args[0] instanceof Vector2) {
            const v = args[0];

            return new Vector2(this.x + v.x, this.y + v.y);
        }
        else if (args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'number') {
            const x = args[0];
            const y = args[1];

            return new Vector2(this.x + x, this.y + y);
        }
        else {
            throw new Error('invalid ');
        }
    }

    mult(val: number): Vector2 {
        return new Vector2(this.x * val, this.y * val);
    }
}