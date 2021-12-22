import 'mocha';
import * as should from 'should';

import { Vector2 } from '../vec2';
import { getLineSegmentSize } from '../line-segment';

describe('line-segment', () => {
    describe('getLineSegmentSize', () => {
        const tests: { args: [Vector2, Vector2]; result: number; msg?: string }[] = [
            { args: [new Vector2(0, 0), new Vector2(0, 5)], result: 5, msg: 'horizontal' },
            { args: [new Vector2(0, 0), new Vector2(5, 0)], result: 5, msg: 'vertical' },
            { args: [new Vector2(0, 0), new Vector2(5, 5)], result: 5 * Math.sqrt(2), msg: '45deg' },
            { args: [new Vector2(0, 0), new Vector2(10, 10 * Math.sqrt(3))], result: 2 * 10, msg: '30/60deg' },
        ];

        tests.forEach(test => {
            const testName = '';

            it(`${test.msg} | ${testName}`, () => {
                const res = getLineSegmentSize(...test.args);
                should.equal(res, test.result);
            });
        });
    });
});