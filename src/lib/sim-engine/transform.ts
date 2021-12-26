import { Vector2 } from "../geom/vec2";

export class Transform {
    readonly position = Vector2.zero();

    constructor(body: { position: Vector2 }) {
        this.position = body.position;
    }
}