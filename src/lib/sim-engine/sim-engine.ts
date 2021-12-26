import * as EventEmitter from 'events';

import { boxesIntersect, circleAndBoxIntersect, circlesIntersect } from "../geom/intersections";
import { Box, Circle } from "../geom/shape2d";
import { Vector2 } from "../geom/vec2";
import { SimObject } from './sim-object';

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