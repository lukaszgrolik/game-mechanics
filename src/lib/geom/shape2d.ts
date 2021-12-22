import { getBoundingBox, getBoundingCircle } from "./bounding";
import { LineSegment } from "./line-segment";
import { Vector2 } from "./vec2";

export interface Shape2d {

}

export class Circle implements Shape2d {
    readonly position: Vector2;
    r: number;

    constructor(x: number, y: number, r: number) {
        this.position = new Vector2(x, y);
        this.r = r;
    }
}

type BoxPoints = [Vector2, Vector2, Vector2, Vector2];
export class Box implements Shape2d {
    readonly position: Vector2;
    readonly size: Vector2;

    readonly points: BoxPoints;
    readonly boundingCircle: Circle;

    constructor(x: number, y: number, w: number, h: number) {
        this.position = new Vector2(x, y);
        this.size = new Vector2(w, h);

        this.points = this.getPoints(this.position, this.size);
        this.boundingCircle = getBoundingCircle(this.position, this.size);
    }

    private getPoints(pos: Vector2, size: Vector2): BoxPoints {
        return [
            pos,
            pos.add(size.x, 0),
            pos.add(size),
            pos.add(0, size.y),
        ];
    }
}
// console.log('boxesIntersect', boxesIntersect(new Box(0, 0, 10, 10), new Box(20, 20, 10, 10)))
// console.log('boxesIntersect', boxesIntersect(new Box(0, 0, 10, 10), new Box(5, 5, 10, 10)))
// console.log('boxesIntersect', boxesIntersect(new Box(0, 0, 10, 10), new Box(5, 5, 2, 2)))

// console.log('intersectRect', intersectRect({left: 0})
// console.log('intersectRect', intersectRect()
// console.log('intersectRect', intersectRect()

// function intersectRect(r1, r2) {
// 	return !(r2.left > r1.right ||
// 		r2.right < r1.left ||
// 		r2.top > r1.bottom ||
// 		r2.bottom < r1.top);
// }

export class Polygon implements Shape2d {
    // readonly points: Vector2[] = [];
    readonly lineSegments: LineSegment[] = [];
    readonly centroid: Vector2;
    readonly boundingBox: Box;

    constructor(readonly points: Vector2[]) {
        // this.points.push(...points);
        this.lineSegments.push(...this.getSegments())
        this.centroid = this.getCentroid();
        this.boundingBox = getBoundingBox(this.points);
    }

    private getSegments(): LineSegment[] {
        const res: LineSegment[] = [];

        for (let i = 0; i < this.points.length - 1; i++) {
            const p = this.points[i];

            res.push(new LineSegment(p, this.points[i + 1]))
        }

        return res;
    }

    private getCentroid(): Vector2 {
        let x = 0;
        let y = 0;

        for (let i = 0; i < this.points.length; i++) {
            const p = this.points[i];

            x += p.x / this.points.length;
            y += p.y / this.points.length;
        }

        return new Vector2(x, y);
    }
}