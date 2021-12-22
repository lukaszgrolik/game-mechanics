import * as EventEmitter from 'events';

import { boxesIntersect, circleAndBoxIntersect, circlesIntersect } from "../geom/intersections";
import { Box, Circle } from "../geom/shape2d";
import { Vector2 } from "../geom/vec2";

export class Transform {
    readonly position = Vector2.zero();

    constructor(body: { position: Vector2 }) {
        this.position = body.position;
    }
}

abstract class Collider2d {
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

    constructor(readonly transform: Transform) {

    }

    abstract collidesWith(other: Collider2d): boolean;
}

export class RectCollider extends Collider2d {
    constructor(transform: Transform, readonly box: Box) {
        super(transform);
    }

    collidesWith(other: Collider2d): boolean {
        return Collider2d.collides(this, other);
    }
}

export class CircleCollider extends Collider2d {
    constructor(transform: Transform, readonly circle: Circle) {
        super(transform);
    }

    collidesWith(other: Collider2d): boolean {
        return Collider2d.collides(this, other);
    }
}

export class SimObject {
    readonly transform: Transform;
    // readonly shape2d: Shape2d;
    readonly collider2d: Collider2d;

    // constructor(transform: Transform, shape2d: Shape2d, collider2d: Collider2d) {
    constructor(transform: Transform, collider2d: Collider2d) {
        this.transform = transform;
        // this.shape2d = shape2d;
        this.collider2d = collider2d;
    }
}

export class SimEngine {
    public readonly events = new EventEmitter();

    private readonly objects: SimObject[] = [];
    private readonly collisions: SimObject[] = [];

    constructor() {

    }

    getObjects() {
        return this.objects.slice();
    }

    addObjects(objects: SimObject[]) {
        this.objects.push(...objects);

        this.events.emit('objectsAdded');
    }

    getCollisions() {
        return this.collisions.slice();
    }

    detectCollisions() {
        this.collisions.length = 0;

        for (let i = 0; i < this.objects.length; i++) {
            const obj = this.objects[i];

            for (let j = 0; j < this.objects.length; j++) {
                if (i === j) continue;

                const obj2 = this.objects[j];

                if (obj.collider2d.collidesWith(obj2.collider2d)) {
                    this.collisions.push(obj);
                }
            }
        }

        this.events.emit('collisionsUpdated');
    }
}