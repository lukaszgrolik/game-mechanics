import { getLineSegmentSize } from "./line-segment";
import { Box, Circle } from "./shape2d";
import { Vector2 } from "./vec2";

export function getBoundingBox(points: Vector2[]): Box {
    const xList = points.map(p => p.x);
    const yList = points.map(p => p.y);

    const x = Math.min(...xList);
    const y = Math.min(...yList);
    const w = Math.abs(x - Math.max(...xList));
    const h = Math.abs(y - Math.max(...yList));

    return new Box(x, y, w, h);
}

export function getBoundingCircle(pos: Vector2, size: Vector2): Circle {
    const x = pos.x + size.x / 2;
    const y = pos.y + size.y / 2;
    const r = getLineSegmentSize(pos, pos.add(size.x, size.y)) / 2;

    return new Circle(x, y, r);
}