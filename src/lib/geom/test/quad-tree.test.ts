import 'mocha';
import * as should from 'should';
import { QuadTree } from '../quad-tree';
import { Vector2 } from '../vec2';

describe('quad-tree', () => {
    beforeEach(() => {

    });

    describe('addObjects', () => {
        it('test', () => {
            type Item = {
                id: number;
                pos: Vector2;
                size: Vector2;
                getPosition(): Vector2;
                getSize(): Vector2;
            };

            const items: Item[] = [
                {id: 1, pos: new Vector2(0, 0), size: new Vector2(1, 1)},
                {id: 2, pos: new Vector2(12, 10), size: new Vector2(5, 5)},
                {id: 3, pos: new Vector2(15, 10), size: new Vector2(5, 5)},
            ].map(item => {
                return {
                    id: item.id,
                    pos: item.pos,
                    size: item.size,
                    getPosition() {
                        return this.pos;
                    },
                    getSize() {
                        return this.size;
                    }
                };
            });
            const qt = new QuadTree<Item>({
                gridSize: new Vector2(10, 10),
                cellSize: new Vector2(10, 10),
            });
            qt.addObjects(items);

            should(qt.objects.map(o => o.id)).deepEqual([1, 2, 3]);
            should(qt.objectsQuadsMap.get(items[0])).deepEqual([])
            should(qt.objectsObjectsMap.get(items[0])).deepEqual([])

            should(qt.objectsObjectsMap.get(items[1])).deepEqual([3])
            should(qt.objectsObjectsMap.get(items[2])).deepEqual([2])
        });

        it('', () => {

        });
    });

    describe('removeObjects', () => {

    });

    describe('updateObjects', () => {

    });

    describe('findCollisions', () => {
        it('test', () => {
            type Item = {
                id: number;
                pos: Vector2;
                size: Vector2;
                getPosition(): Vector2;
                getSize(): Vector2;
            };

            const items: Item[] = [
                { id: 1, pos: new Vector2(0, 0), size: new Vector2(1, 1) },
                { id: 2, pos: new Vector2(12, 10), size: new Vector2(5, 5) },
                { id: 3, pos: new Vector2(15, 10), size: new Vector2(5, 5) },
            ].map(item => {
                return {
                    id: item.id,
                    pos: item.pos,
                    size: item.size,
                    getPosition() {
                        return this.pos;
                    },
                    getSize() {
                        return this.size;
                    }
                };
            });
            const qt = new QuadTree<Item>({
                gridSize: new Vector2(10, 10),
                cellSize: new Vector2(10, 10),
            });
            qt.addObjects(items);

            const collisions = qt.findCollisions();

            should(collisions.length).equal(2);
            should(collisions.map(c => c.id)).deepEqual([2, 3]);

            // should(qt.objects.map(o => o.id)).deepEqual([1, 2, 3]);
            // should(qt.objectsQuadsMap.get(items[0])).deepEqual([])
            // should(qt.objectsObjectsMap.get(items[0])).deepEqual([])

            // should(qt.objectsObjectsMap.get(items[1])).deepEqual([3])
            // should(qt.objectsObjectsMap.get(items[2])).deepEqual([2])
        });
    });

    describe('findCollisionsByQuads', () => {

    });
});