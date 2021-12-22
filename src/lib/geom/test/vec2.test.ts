import 'mocha';
import * as should from 'should';

import { Vector2 } from "../vec2";

describe('Vector2', () => {
    it('updates', () => {
        {
            const v = new Vector2(1, 5)
            v.update(3, 4);

            should.equal(v.x, 3);
            should.equal(v.y, 4);
        }
    });

    it('adds x, y', () => {
        {
            const v1 = new Vector2(1, 5)
            const v2 = v1.add(0, 0);

            should.notEqual(v1, v2);
        }

        {
            const v = new Vector2(1, 5).add(0, 0);

            should.equal(v.x, 1);
            should.equal(v.y, 5);
        }

        {
            const v = new Vector2(1, 5).add(1, 1);

            should.equal(v.x, 2);
            should.equal(v.y, 6);
        }

        {
            const v = new Vector2(1, 5).add(-1, -1);

            should.equal(v.x, 0);
            should.equal(v.y, 4);
        }
    });

    it('adds vector', () => {
        {
            const v1 = new Vector2(1, 5)
            const v2 = v1.add(new Vector2(0, 0));

            should.notEqual(v1, v2);
        }

        {
            const v = new Vector2(1, 5).add(new Vector2(0, 0));

            should.equal(v.x, 1);
            should.equal(v.y, 5);
        }

        {
            const v = new Vector2(1, 5).add(new Vector2(1, 1));

            should.equal(v.x, 2);
            should.equal(v.y, 6);
        }

        {
            const v = new Vector2(1, 5).add(new Vector2(-1, -1));

            should.equal(v.x, 0);
            should.equal(v.y, 4);
        }
    });

    it('multiplies', () => {
        {
            const v1 = new Vector2(1, 5)
            const v2 = v1.mult(2);

            should.notEqual(v1, v2);
        }

        {
            const v = new Vector2(1, 5).mult(0);

            should.equal(v.x, 0);
            should.equal(v.y, 0);
        }

        {
            const v = new Vector2(1, 5).mult(1);

            should.equal(v.x, 1);
            should.equal(v.y, 5);
        }

        {
            const v = new Vector2(1, 5).mult(2);

            should.equal(v.x, 2);
            should.equal(v.y, 10);
        }

        {
            const v = new Vector2(1, 5).mult(.5);

            should.equal(v.x, .5);
            should.equal(v.y, 2.5);
        }

        {
            const v = new Vector2(1, 5).mult(-.5);

            should.equal(v.x, -.5);
            should.equal(v.y, -2.5);
        }
    });

    it('mult', () => {
        const v = new Vector2(1, 5).add(1, 1);

        should.equal(v.x, 2);
        should.equal(v.y, 6);
    });
});