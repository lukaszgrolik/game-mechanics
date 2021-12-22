import { getLineSegmentSize } from "./line-segment";
import { Vector2 } from "./vec2";

export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;

export function angle(p1: Vector2, p2: Vector2): number {
    const dy = p2.y - p1.y;
    const dx = p2.x - p1.x;

    return Math.atan2(dy, dx) * RAD_TO_DEG;
}

export function posOnCircle(r: number, deg: number): Vector2 {
    const rad = deg * DEG_TO_RAD;

    // return [r * Math.sin(rad), r * Math.cos(rad)];
    return new Vector2(r * Math.sin(rad), r * Math.cos(rad));
}

export function rotatePoint(p: Vector2, c: Vector2, deg: number): Vector2 {
    const currentAngle = angle(c, p);
    console.log('currentAngle', currentAngle);
    const r = getLineSegmentSize(p, c);
    console.log('r', r)
    const pos = posOnCircle(r, -currentAngle + deg);

    // return [c.x + pos[0], c.y + pos[1]];
    return pos;
}