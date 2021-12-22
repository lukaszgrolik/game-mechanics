import { Vector2 } from "./vec2";

class Quad {

}

interface AddObjectBody<T> {
    obj: T;
    pos: Vector2;
    size: Vector2;
}

export class QuadTree<T> {
    private gridSize: Vector2;
    private cellSize: Vector2;

    readonly quads: Quad[] = [];
    readonly objects: T[] = [];

    readonly objectsQuadsMap = new Map<T, Quad[]>();
    readonly quadsObjectsMap = new Map<Quad, T[]>();
    readonly objectsObjectsMap = new Map<T, T[]>();

    constructor() {
        this.gridSize = new Vector2(10, 10);
        this.cellSize = new Vector2(10, 10);
    }

    public setGridSize(size: Vector2): void {

    }

    public setCellSize(cellSize: Vector2): void {

    }

    public addObject(obj: AddObjectBody<T>): void {

    }

    public addObjects(objs: AddObjectBody<T>[]): void {

    }

    public removeObject(obj: T): void {

    }

    public removeObjects(objs: T[]): void {

    }

    public setObjectPosition(obj: T, pos: Vector2): void {

    }

    public setObjectSize(obj: T, pos: Vector2): void {

    }
}