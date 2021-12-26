import { Collider2d } from "./collider2d";
import { Transform } from "./transform";

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