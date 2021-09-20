// line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
// Return FALSE if the lines don't intersect
// export function lineSegmentsIntersect(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) {
export function lineSegmentsIntersect(p1: Vector2, p2: Vector2, p3: Vector2, p4: Vector2) {
	// if (p1.x === p2.x || p1.x === p2.x || p1.y === p2.y || (p1.x + ))

  // Check if none of the lines are of length 0
	if ((p1.x === p2.x && p1.y === p2.y) || (p3.x === p4.x && p3.y === p4.y)) {
		return false;
	}

	const denominator = ((p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y));

  // Lines are parallel
	if (denominator === 0) {
		// return false;
	}

	const ua = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denominator;
	const ub = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denominator;

  // is the intersection along the segments
	if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
		return false;
	}

  // Return a object with the x and y coordinates of the intersection
	return true;

	// const x = p1.x + ua * (p2.x - p1.x);
	// const y = p1.y + ua * (p2.y - p1.y);

	// return {x, y};
}

export function circlesIntersect(c1: Circle, c2: Circle): boolean {
	return getLineSegmentSize(c1.position, c2.position) <= c1.r + c2.r;
}

export function boxesIntersect(box1: Box, box2: Box): boolean {
	if (box2.position.x > box1.position.x + box1.size.x) return false;
	if (box2.position.x + box2.size.x < box1.position.x) return false;
	if (box2.position.y + box2.size.y < box1.position.y) return false;
	if (box2.position.y > box1.position.y + box1.size.y) return false;

	return true;
}

export function boxesContain(box1: Box, box2: Box): boolean {
	// if (box2.position.x > box1.position.x + box1.size.x) return false;
	// if (box2.position.x + box2.size.x < box1.position.x) return false;
	// if (box2.position.y + box2.size.y > box1.position.y) return false;
	// if (box2.position.y < box1.position.y + box1.size.y) return false;

	// return true;
	return false;
}

export function circleAndBoxIntersect(circle: Circle, rect: Box): boolean {
	const distX = Math.abs(circle.position.x - rect.position.x - rect.size.x / 2);
	const distY = Math.abs(circle.position.y - rect.position.y - rect.size.y / 2);

	if (distX > (rect.size.x / 2 + circle.r)) return false;
	if (distY > (rect.size.y / 2 + circle.r)) return false;

	if (distX <= (rect.size.x / 2)) return true;
	if (distY <= (rect.size.y / 2)) return true;

	const dx = distX - rect.size.x / 2;
	const dy = distY - rect.size.y / 2;

	return (dx * dx + dy * dy <= (circle.r ** 2));
}

export function polygonsIntersect(poly1: Polygon, poly2: Polygon): boolean {
	// [step] check if bounding circles intersect
	if (circlesIntersect(poly1.boundingBox.boundingCircle, poly2.boundingBox.boundingCircle) === false) return false;

	// [step] check if bounding boxes intersect
	if (boxesIntersect(poly1.boundingBox, poly2.boundingBox) === false) return false;

	// [step] check if line segments intersect
	let lineSegIntersect = false;
	for (let i = 0; i < poly1.lineSegments.length; i++) {
		const p1s = poly1.lineSegments[i];

		for (let j = 0; j < poly2.lineSegments.length; j++) {
			const p2s = poly2.lineSegments[j];

			if (lineSegmentsIntersect(p1s.a, p1s.b, p2s.a, p2s.b)) {
				lineSegIntersect = true;
				break;
			}
		}

		if (lineSegIntersect) break;
	}

	if (lineSegIntersect) {
		return true;
	}

	// [step] check if one of the polygons is nested inside the other one
	// let pointPolyIntersect = false;
	// for (let i = 0; i < poly2.points.length; i++) {
	// 	const point = poly2.points[i];

	// 	if (pointAndPolygonIntersect(point, poly1)) {
	// 		pointPolyIntersect = true;
	// 		break;
	// 	}
	// }

	// if (!polygonsIntersect) {
	// 	for (let i = 0; i < poly1.points.length; i++) {
	// 		const point = poly1.points[i];

	// 		if (pointAndPolygonIntersect(point, poly2)) {
	// 			pointPolyIntersect = true;
	// 			break;
	// 		}
	// 	}
	// }

	if (pointAndPolygonIntersect(poly2.centroid, poly1) || pointAndPolygonIntersect(poly1.centroid, poly2)) {
		return true
	}

	// @todo
	// poly1.boundingBox.x - poly2.boundingBox.x

	return false;
}

function pnpoly(nvert: number, vertx: number[], verty: number[], testx: number, testy: number): boolean {
	let i = 0;
	let j = 0;
	let c = false;

	for (i = 0, j = nvert - 1; i < nvert; j = i++) {
		if (((verty[i] > testy) != (verty[j] > testy)) &&
		(testx < (vertx[j] - vertx[i]) * (testy - verty[i]) / (verty[j] - verty[i]) + vertx[i])) {
			c = !c;
		}
	}

	return c;
}

export function pointAndPolygonIntersect(point: Vector2, polygon: Polygon): boolean {
	const xPoints = polygon.points.map(p => p.x);
	const yPoints = polygon.points.map(p => p.y);

	return pnpoly(polygon.points.length, xPoints, yPoints, point.x, point.y);
}

export function getLineSegmentSize(p1: Vector2, p2: Vector2): number {
	const squared = (p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2;

	return Math.sqrt(squared);
}

function getBoundingBox(points: Vector2[]): Box {
	const xList = points.map(p => p.x);
	const yList = points.map(p => p.y);

	const x = Math.min(...xList);
	const y = Math.min(...yList);
	const w = Math.abs(x - Math.max(...xList));
	const h = Math.abs(y - Math.max(...yList));

	return new Box(x, y, w, h);
}

function getBoundingCircle(pos: Vector2, size: Vector2): Circle {
	const x = pos.x + size.x / 2;
	const y = pos.y + size.y / 2;
	const r = getLineSegmentSize(pos, pos.add(size.x, size.y)) / 2;

	return new Circle(x, y, r);
}

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
// type Polygon = Point;

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

export class Box implements Shape2d {
	readonly position: Vector2;
	readonly size: Vector2;
	readonly boundingCircle: Circle;

	constructor(x: number, y: number, w: number, h: number) {
		this.position = new Vector2(x, y);
		this.size = new Vector2(w, h);
		this.boundingCircle = getBoundingCircle(this.position, this.size);
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