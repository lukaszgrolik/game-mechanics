import { Vector2 } from "./vec2";

export function getLineSegmentSize(p1: Vector2, p2: Vector2): number {
    const squared = (p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2;

    return Math.sqrt(squared);
}

export class LineSegment {
    readonly a: Vector2;
    readonly b: Vector2;
    readonly size: number;

    constructor(a: Vector2, b: Vector2) {
        this.a = a;
        this.b = b;
        this.size = getLineSegmentSize(a, b);
    }
}