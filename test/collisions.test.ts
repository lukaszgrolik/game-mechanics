import 'mocha';
import * as should from 'should';

import { Box, boxesIntersect, Circle, circleAndBoxIntersect, circlesIntersect, getLineSegmentSize, lineSegmentsIntersect, pointAndPolygonIntersect, Polygon, polygonsIntersect, Vector2 } from "../src/utils";

describe('lineSegmentsIntersect', () => {
    const tests: { args: [Vector2, Vector2, Vector2, Vector2]; result: boolean; msg?: string }[] = [
        {args: [new Vector2(0, 0), new Vector2(2, 0), new Vector2(0, 1), new Vector2(2, 1)], result: false, msg: 'parallel horizontal non-colliding'},
        {args: [new Vector2(0, 0), new Vector2(0, 2), new Vector2(1, 0), new Vector2(1, 2)], result: false, msg: 'parallel vertical non-colliding'},
        {args: [new Vector2(0, 0), new Vector2(2, 0), new Vector2(1, -1), new Vector2(1, 1)], result: true, msg: 'perpendicular colliding at center'},
        {args: [new Vector2(0, 0), new Vector2(2, 0), new Vector2(0, 0), new Vector2(0, 1)], result: true, msg: 'perpendicular colliding at start'},
        {args: [new Vector2(0, 0), new Vector2(2, 0), new Vector2(0, -1), new Vector2(1, 1)], result: true, msg: 'angled colliding at center'},
        {args: [new Vector2(0, 0), new Vector2(2, 0), new Vector2(0, 0), new Vector2(2, 0)], result: true, msg: 'parallel horizontal identical'},
        {args: [new Vector2(0, 0), new Vector2(3, 0), new Vector2(1, 0), new Vector2(2, 0)], result: true, msg: 'parallel horizontal containing'},
        {args: [new Vector2(0, 0), new Vector2(3, 0), new Vector2(0, 0), new Vector2(2, 0)], result: true, msg: 'parallel horizontal starting at the same point'},
        {args: [new Vector2(0, 0), new Vector2(3, 0), new Vector2(2, 0), new Vector2(4, 0)], result: true, msg: 'parallel horizontal sharing fragment'},
    ];

    tests.forEach(test => {
        const p = test.args.map(pos => `{${pos.x},${pos.y}}`);
        const testName = `${p[0]}->${p[1]} - ${p[2]}->${p[3]}`;

        it(`${test.msg} | ${testName}`, () => {
            const res = lineSegmentsIntersect(...test.args);
            should.equal(res, test.result);
        });
    });
});

describe('circlesIntersect', () => {
    const tests: { args: [Circle, Circle]; result: boolean; }[] = [
        {args: [new Circle(0, 0, 2), new Circle(10, 10, 2)], result: false},
        {args: [new Circle(0, 0, 2), new Circle(1, 0, 2)], result: true},
        {args: [new Circle(0, 0, 2), new Circle(0, 0, 2)], result: true},
        {args: [new Circle(0, 0, 2), new Circle(4, 0, 2)], result: true},
    ];

    tests.forEach(test => {
        const p = test.args.map(c => `{${c.position.x},${c.position.y}} r=${c.r}`);
        const testName = `${p[0]} - ${p[1]}`;

        it(testName, () => {
            const res = circlesIntersect(...test.args);
            should.equal(res, test.result);
        });
    });
});

describe('boxesIntersect', () => {
    const tests: { args: [Box, Box]; result: boolean; msg?: string }[] = [
        {args: [new Box(0, 0, 2, 2), new Box(10, 10, 2, 2)], result: false, msg: 'non-colliding'},
        {args: [new Box(0, 0, 2, 2), new Box(1, 1, 2, 2)], result: true, msg: ''},
        {args: [new Box(0, 0, 2, 2), new Box(1, 0, 2, 2)], result: true, msg: ''},
        {args: [new Box(0, 0, 2, 2), new Box(0, 0, 2, 2)], result: true, msg: ''},
        {args: [new Box(0, 0, 2, 2), new Box(0, 2, 2, 2)], result: true, msg: ''},
        {args: [new Box(0, 0, 3, 3), new Box(1, 1, 1, 1)], result: true, msg: ''},
    ];

    tests.forEach(test => {
        const p = test.args.map(box => `{${box.position.x},${box.position.y}}[${box.size.x}, ${box.size.y}]`);
        const testName = `${p[0]} - ${p[1]}`;

        it(testName, () => {
            const res = boxesIntersect(...test.args);
            should.equal(res, test.result);
        });
    });
});

describe('circleAndBoxIntersect', () => {
    const tests: { args: [Circle, Box]; result: boolean; msg?: string }[] = [
        {args: [new Circle(0, 0, 2), new Box(10, 10, 2, 2)], result: false, msg: 'non-colliding'},
        {args: [new Circle(0, 0, 1), new Box(-2, -2, 4, 4)], result: true, msg: 'circle inside box'},
        {args: [new Circle(0, 0, 4), new Box(-1, -1, 2, 2)], result: true, msg: 'box inside circle'},
        {args: [new Circle(0, 0, 1), new Box(-1, -1, 2, 2)], result: true, msg: 'circle inscribed in box'},
        // {args: [new Circle(0, 0, 2), new Box(1, 1, 2, 2)], result: true, msg: 'box inscribed in circle'},
        {args: [new Circle(0, 0, 1), new Box(1, -1, 2, 2)], result: true, msg: 'circle and box touching on the outside'},
        {args: [new Circle(0, 0, 2), new Box(1, 1, 5, 5)], result: true, msg: 'circle colliding with one side of the box'},
        {args: [new Circle(0, 0, 2), new Box(1, 1, 5, .5)], result: true, msg: 'circle colliding with two sides of the box'},
    ];

    tests.forEach(test => {
        const circle = test.args[0];
        const box = test.args[1];
        const c = `{${circle.position.x},${circle.position.y}}`;
        const b = `{${box.position.x},${box.position.y}}[${box.size.x},${box.size.y}]`;
        const testName = `${c} - ${b}`;

        it(`${test.msg} | ${testName}`, () => {
            const res = circleAndBoxIntersect(...test.args);
            should.equal(res, test.result);
        });
    });
});

describe('pointAndPolygonIntersect', () => {
    const tests: { args: [Vector2, Polygon]; result: boolean; msg?: string }[] = [
        {
            args: [
                new Vector2(10, 10),
                new Polygon([new Vector2(0, 0), new Vector2(0, 5), new Vector2(5, 5), new Vector2(5, 0)]),
            ],
            result: false,
            msg: 'non-colliding',
        },
        {
            args: [
                new Vector2(0, 0),
                new Polygon([new Vector2(0, 0), new Vector2(0, 5), new Vector2(5, 5), new Vector2(5, 0)]),
            ],
            result: true,
            msg: 'collides at corner',
        },
        {
            args: [
                new Vector2(0, 2),
                new Polygon([new Vector2(0, 0), new Vector2(0, 5), new Vector2(5, 5), new Vector2(5, 0)]),
            ],
            result: true,
            msg: 'collides within a segment',
        },
        {
            args: [
                new Vector2(2, 2),
                new Polygon([new Vector2(0, 0), new Vector2(0, 5), new Vector2(5, 5), new Vector2(5, 0)]),
            ],
            result: true,
            msg: 'collides inside',
        },
    ];

    tests.forEach(test => {
        const point = test.args[0];
        const poly = test.args[1];
        const pointStr = `{${point.x},${point.y}}`;
        const polyStr = (poly: Polygon) => `[${poly.points.map(p => `{${p.x},${p.y}}`).join(',')}]`;
        const testName = `${pointStr} - ${polyStr(poly)}`;

        it(`${test.msg} | ${testName}`, () => {
            const res = pointAndPolygonIntersect(...test.args);
            should.equal(res, test.result);
        });
    });
});

describe('Vector2', () => {
    it('update', () => {
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

describe('Polygon', () => {
    describe('lineSegments');
    describe('centroid');
    describe('boundingBox');
});

describe('polygonsIntersect', () => {
    const tests: { args: [Polygon, Polygon]; result: boolean; msg?: string }[] = [
        {
            args: [
                new Polygon([new Vector2(0, 0), new Vector2(0, 5), new Vector2(5, 5), new Vector2(5, 0)]),
                new Polygon([new Vector2(10, 10), new Vector2(15, 10), new Vector2(15, 15), new Vector2(10, 15)]),
            ],
            result: false,
            msg: 'non-colliding',
        },
        {
            args: [
                new Polygon([new Vector2(0, 0), new Vector2(0, 5), new Vector2(5, 5), new Vector2(5, 0)]),
                new Polygon([new Vector2(4, 4), new Vector2(4, 9), new Vector2(9, 9), new Vector2(9, 4)]),
            ],
            result: true,
            msg: 'colliding in 2 points',
        },
        {
            args: [
                new Polygon([new Vector2(0, 0), new Vector2(0, 5), new Vector2(5, 5), new Vector2(5, 0)]),
                new Polygon([new Vector2(5, 5), new Vector2(5, 10), new Vector2(10, 10), new Vector2(10, 5)]),
            ],
            result: true,
            msg: 'colliding in 1 point on the corner',
        },
        {
            args: [
                new Polygon([new Vector2(0, 0), new Vector2(0, 5), new Vector2(5, 5), new Vector2(5, 0)]),
                new Polygon([new Vector2(5, 2), new Vector2(10, 5), new Vector2(15, 2), new Vector2(10, 0)]),
            ],
            result: true,
            msg: 'colliding in 1 point on the line',
        },
        {
            args: [
                new Polygon([new Vector2(0, 0), new Vector2(0, 5), new Vector2(5, 5), new Vector2(5, 0)]),
                new Polygon([new Vector2(5, 1), new Vector2(5, 4), new Vector2(10, 4), new Vector2(10, 1)]),
            ],
            result: true,
            msg: 'colliding in segment of parallel line from outside',
        },
        {
            args: [
                new Polygon([new Vector2(0, 0), new Vector2(0, 5), new Vector2(5, 5), new Vector2(5, 0)]),
                new Polygon([new Vector2(0, 1), new Vector2(0, 4), new Vector2(4, 4), new Vector2(4, 1)]),
            ],
            result: true,
            msg: 'colliding in segment of parallel line from inside',
        },
        {
            args: [
                new Polygon([new Vector2(0, 0), new Vector2(0, 5), new Vector2(5, 5), new Vector2(5, 0)]),
                new Polygon([new Vector2(1, 1), new Vector2(1, 4), new Vector2(4, 4), new Vector2(4, 1)]),
            ],
            result: true,
            msg: 'colliding when nested',
        },

    ];

    tests.forEach(test => {
        const p1 = test.args[0];
        const p2 = test.args[1];
        const pStr = (poly: Polygon) => `[${poly.points.map(p => `{${p.x},${p.y}}`).join(',')}]`;
        const testName = `${pStr(p1)} - ${pStr(p2)}`;

        it(`${test.msg} | ${testName}`, () => {
            const res = polygonsIntersect(...test.args);
            should.equal(res, test.result);
        });
    });
});

describe('getLineSegmentSize', () => {
    const tests: { args: [Vector2, Vector2]; result: number; msg?: string }[] = [
        {args: [new Vector2(0, 0), new Vector2(0, 5)], result: 5, msg: 'horizontal'},
        {args: [new Vector2(0, 0), new Vector2(5, 0)], result: 5, msg: 'vertical'},
        {args: [new Vector2(0, 0), new Vector2(5, 5)], result: 5 * Math.sqrt(2), msg: '45deg'},
        {args: [new Vector2(0, 0), new Vector2(10, 10 * Math.sqrt(3))], result: 2 * 10, msg: '30/60deg'},
    ];

    tests.forEach(test => {
        const testName = '';

        it(`${test.msg} | ${testName}`, () => {
            const res = getLineSegmentSize(...test.args);
            should.equal(res, test.result);
        });
    });
});