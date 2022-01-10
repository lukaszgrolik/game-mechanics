import { boxesIntersect, circleAndBoxIntersect, circlesIntersect } from "../geom/intersections";
import { Box, Circle } from "../geom/shape2d";
import { Transform } from "./transform";

export abstract class Collider2d {
    static collides(c1: Collider2d, c2: Collider2d) {
        const circleCollidesWithRect = (c: CircleCollider, r: RectCollider) => {
            const circle = new Circle(c.circle.position.x + c.transform.position.x, c.circle.position.y + c.transform.position.y, c.circle.r);
            const box = new Box(r.box.position.x + r.transform.position.x, r.box.position.y + r.transform.position.y, r.box.size.x, r.box.size.y);

            return circleAndBoxIntersect(circle, box);
        }

        if (c1 instanceof CircleCollider && c2 instanceof CircleCollider) {
            const circle1 = new Circle(c1.circle.position.x + c1.transform.position.x, c1.circle.position.y + c1.transform.position.y, c1.circle.r);
            const circle2 = new Circle(c2.circle.position.x + c2.transform.position.x, c2.circle.position.y + c2.transform.position.y, c2.circle.r);

            return circlesIntersect(circle1, circle2);
        }
        else if (c1 instanceof RectCollider && c2 instanceof RectCollider) {
            const b1 = new Box(c1.box.position.x + c1.transform.position.x, c1.box.position.y + c1.transform.position.y, c1.box.size.x, c1.box.size.y);
            const b2 = new Box(c2.box.position.x + c2.transform.position.x, c2.box.position.y + c2.transform.position.y, c2.box.size.x, c2.box.size.y);

            return boxesIntersect(b1, b2);
        }
        else if (c1 instanceof CircleCollider && c2 instanceof RectCollider) {
            return circleCollidesWithRect(c1, c2);
        }
        else if (c2 instanceof CircleCollider && c1 instanceof RectCollider) {
            return circleCollidesWithRect(c2, c1);
        }
        else {
            console.warn(`unsupported colliders scenario: ${c1} & ${c2}`);
            return false;
        }
    }

    isActive: boolean;

    constructor(readonly transform: Transform, isActive: boolean) {
        this.isActive = isActive;
    }

    setIsActive(val: boolean) {
        this.isActive = val;
    }

    abstract collidesWith(other: Collider2d): boolean;
    abstract getBoundingBox(): Box;
}

export class RectCollider extends Collider2d {
    constructor(transform: Transform, readonly box: Box, isActive: boolean = true) {
        super(transform, isActive);
    }

    collidesWith(other: Collider2d): boolean {
        return Collider2d.collides(this, other);
    }

    getBoundingBox() {
        return this.box;
    }
}

export class CircleCollider extends Collider2d {
    constructor(transform: Transform, readonly circle: Circle, isActive: boolean = true) {
        super(transform, isActive);
    }

    collidesWith(other: Collider2d): boolean {
        return Collider2d.collides(this, other);
    }

    getBoundingBox() {
        const { position: { x, y }, r } = this.circle;
        const side = r * 2;

        return new Box(x - r, y - r, side, side);
    }
}