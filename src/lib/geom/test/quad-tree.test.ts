import 'mocha';
import * as should from 'should';
import { QuadTree } from '../quad-tree';
import { Vector2 } from '../vec2';

describe('quad-tree', () => {
    it('test', () => {
        const items = [
            {id: 1, pos: new Vector2(0, 0), size: new Vector2(1, 1)},
            {id: 2, pos: new Vector2(12, 10), size: new Vector2(5, 5)},
            {id: 3, pos: new Vector2(15, 10), size: new Vector2(5, 5)},
        ]
        const qt = new QuadTree();
        qt.addObjects(items.map(item => {
            return {
                obj: item.id,
                pos: item.pos,
                size: item.size,
            };
        }));

        should(qt.objects).deepEqual([1, 2, 3]);
        should(qt.objectsQuadsMap.get(1)).deepEqual([])
        should(qt.objectsObjectsMap.get(1)).deepEqual([])

        should(qt.objectsObjectsMap.get(2)).deepEqual([3])
        should(qt.objectsObjectsMap.get(3)).deepEqual([2])
    });
});