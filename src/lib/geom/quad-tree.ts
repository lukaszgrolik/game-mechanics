import { Vector2 } from "./vec2";

export function rectanglesIntersect(box1: QuadTreeObject, box2: QuadTreeObject): boolean {
    const box1Pos = box1.getPosition();
    const box1Size = box1.getSize();
    const box2Pos = box2.getPosition();

    if (box2Pos.x > box1Pos.x + box1Size.x) return false;

    const box2Size = box2.getSize();

    if (box2Pos.x + box2Size.x < box1Pos.x) return false;
    if (box2Pos.y + box2Size.y < box1Pos.y) return false;
    if (box2Pos.y > box1Pos.y + box1Size.y) return false;

    return true;
}

class Quad {

}

export interface QuadTreeObject {
    getPosition(): Vector2;
    getSize(): Vector2;
}

// interface AddObjectBody {
//     obj: QuadTreeObject;
//     pos: Vector2;
//     size: Vector2;
// }

type GridOpts = {
    gridSize: Vector2;
    cellSize: Vector2;
};
type QuadTreeOpts<T> = GridOpts & {
    onCollisionEnter?: (obj: T) => void;
    onCollisionExit?: (obj: T) => void;
};

export class QuadTree<T extends QuadTreeObject> {
    private gridSize: Vector2;
    private cellSize: Vector2;

    readonly quads: Quad[] = [];
    readonly objects: T[] = [];

    readonly objectsQuadsMap = new Map<T, Quad[]>();
    readonly quadsObjectsMap = new Map<Quad, T[]>();
    readonly objectsObjectsMap = new Map<T, T[]>();

    constructor(opts: QuadTreeOpts<T>) {
        this.gridSize = opts.gridSize
        this.cellSize = opts.cellSize;

        this.quads = new Array(this.gridSize.x * this.gridSize.y).fill(undefined);
        for (let i = 0; i < this.quads.length; i++) {
            const quad = new Quad();
            this.quads[i] = quad;
            this.quadsObjectsMap.set(quad, []);
        }
    }

    // public setGridSize(size: Vector2): void {

    // }

    // public setCellSize(cellSize: Vector2): void {

    // }

    public updateGrid(opts: GridOpts) {

    }

    // public addObject(obj: T): void {
    //     this.objects.push(obj);
    // }

    public addObjects(objs: T[]): void {
        this.objects.push(...objs);

        for (let i = 0; i < objs.length; i++) {
            const obj = objs[i];

            // @todo divide quad tree if necessary
            // @todo find which quads object collides with
            // @todo add object to quads
            // @todo add quads to object
        }

        // @todo call onCollisionEnter/Exit (max once for each obj)
    }

    // public removeObject(obj: T): void {
    //     const index = this.objects.indexOf(obj);

    //     if (index !== -1) {
    //         this.objects.splice(index, 1);
    //     }
    // }

    public removeObjects(objs: T[]): void {
        for (let i = 0; i < objs.length; i++) {
            const obj = objs[i];

            // this.removeObject(obj);
            const index = this.objects.indexOf(obj);
            if (index !== -1) {
                this.objects.splice(index, 1);
            }

            // @todo remove object from quads
        }

        // @todo call onCollisionEnter/Exit (max once for each obj)
    }

    public setObjectPosition(obj: T, pos: Vector2): void {
        // @todo find and update object
        // @todo find which quads object collides with after update
        // @todo update object quads
        // @todo update quads objects

        // @todo call onCollisionEnter/Exit
    }

    public setObjectSize(obj: T, pos: Vector2): void {
        // @todo find and update object
        // @todo find which quads object collides with after update
        // @todo update object quads
        // @todo update quads objects

        // @todo call onCollisionEnter/Exit
    }

    public updateObjects(objs: T[]): void {

    }

    public findCollisions(): T[] {
        const collisions: T[] = [];

        for (let i = 0; i < this.objects.length; i++) {
            const objA = this.objects[i];

            for (let j = 0; j < this.objects.length; j++) {
                const objB = this.objects[j];
                if (objA === objB) continue;
                if (collisions.includes(objA) && collisions.includes(objB)) continue;

                if (rectanglesIntersect(objA, objB)) {
                    collisions.push(objA, objB);
                }
            }
        }

        return collisions;
    }

    // @todo perf test
    public findCollisionsByQuads(): T[] {
        return this.x(this.quads);
    }

    public overlapRectangle(x: number, y: number, w: number, h: number): T[] {
        const collisions: T[] = [];

        // @todo find quads that collide with rectangle
        const quads: Quad[] = []

        return this.x(quads);
    }

    private x(quads: Quad[]): T[] {
        const collisions: T[] = [];

        return collisions;
    }
}