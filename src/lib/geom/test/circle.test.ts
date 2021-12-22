import 'mocha';
import * as should from 'should';
import { angle, posOnCircle, rotatePoint } from '../circle';
import { Vector2 } from '../vec2';

type ArrXY = [number, number];

function xy2Str(p: ArrXY) {
    return `${p[0]},${p[1]}`;
}

describe('circle', () => {
    describe('angle', () => {
        const tests: {p1: ArrXY, p2: ArrXY, res: number}[] = [
            {p1: [0, 0], p2: [0, 0], res: 0},
            {p1: [0, 0], p2: [1, 0], res: 90},
            {p1: [0, 0], p2: [1, 1], res: 45},
            {p1: [0, 0], p2: [0, 1], res: 0},
            {p1: [0, 0], p2: [-1, 0], res: -90},
            {p1: [0, 0], p2: [-1, -1], res: -135},
            {p1: [0, 0], p2: [0, -1], res: 180},
            {p1: [0, 0], p2: [-1, 1], res: -45},
            {p1: [0, 0], p2: [1, -1], res: 135},
        ];

        tests.forEach(t => {
            const testName = `${xy2Str(t.p1)} -> ${xy2Str(t.p2)} = ${t.res}`;

            it(testName, () => {
                const res = angle(new Vector2(t.p1[0], t.p1[1]), new Vector2(t.p2[0], t.p2[1]));

                should(res).equal(t.res);
            });
        });
    });

    describe('posOnCircle', () => {
        const tests: {r: number; deg: number; res: ArrXY}[] = [
            { r: 0, deg: 0, res: [0, 0] },
            { r: 1, deg: 0, res: [0, 1] },
            { r: 1, deg: 90, res: [1, 0] },
            { r: 1, deg: -90, res: [-1, 0] },
        ];

        tests.forEach(t => {
            const testName = `${t.r} -> ${t.deg}deg = ${xy2Str(t.res)}`

            it(testName, () => {
                const {x, y} = posOnCircle(t.r, t.deg);

                should({x, y}).deepEqual({x: t.res[0], y: t.res[1]});
            });
        });
    });

    describe('rotatePoint', () => {
        const tests: {p: ArrXY; c: ArrXY; deg: number; res: ArrXY}[] = [
            { p: [0, 0], c: [0, 0], deg: 0, res: [0, 0] },
            { p: [0, 0], c: [0, 1], deg: 0, res: [0, 0] },
            { p: [0, 0], c: [0, 1], deg: 90, res: [-1, 1] },
            { p: [0, 0], c: [0, 1], deg: 180, res: [0, 2] },
        ];

        tests.forEach(t => {
            const testName = `${xy2Str(t.p)} - ${xy2Str(t.c)} -> ${t.deg}deg = ${xy2Str(t.res)}`

            it(testName, () => {
                const {x, y} = rotatePoint(Vector2.xy(t.p), Vector2.xy(t.c), t.deg);

                should({x, y}).deepEqual({x: t.res[0], y: t.res[1]});
            });
        });
    });
});