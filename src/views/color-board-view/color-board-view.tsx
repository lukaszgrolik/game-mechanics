import * as React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { action, makeObservable, observable } from 'mobx';
import { observer } from "mobx-react-lite";
import styled from '@emotion/styled';

import * as _ from '../../utils';
import * as Store from '../../store/store';
import { boxesIntersect, circleAndBoxIntersect, circlesIntersect } from '../../lib/geom/intersections';
import { Box, Circle } from '../../lib/geom/shape2d';
import { Vector2 } from '../../lib/geom/vec2';
import * as random from '../../lib/random';
import { CircleCollider, RectCollider, SimEngine, SimObject, Transform } from '../../lib/sim-engine/sim-engine';
import { posOnCircle } from '../../lib/geom/circle';

namespace A {
    class C {
        // color: Color;
        enabled = false;
    }

    export class X {
        // colors:

        run() {

        }
    }
}

const Wrapper = styled.div`

`;

// const WIDTH = 1280;
// const HEIGHT = 720;

const opts_matrix1 = {
    gridSize: { x: 61, y: 4 },
    cellSize: { x: 20, y: 20 },
    gutter: 3,
};
const opts_matrix2 = {
    gridSize: { x: 10, y: 10},
    cellSize: {x: 35, y: 35},
    gutter: 5,
};
const opts_radial = {
    lines: [
        {
            lineRadius: 150,
            pointRadius: 10,
            points: 25,
        },
        {
            lineRadius: 115,
            pointRadius: 8,
            points: 20,
        },
        {
            lineRadius: 50,
            pointRadius: 5,
            points: 13,
        },
    ],
};

export const ColorBoardView: React.FC<{ store: Store.Store }> = observer(({ store }) => {

    React.useEffect(() => {

    }, []);

    return (
        <Wrapper>
            <TestBlock settings={opts_matrix1} />
            <MatrixBlock settings={opts_matrix1} />
            <MatrixBlock settings={opts_matrix2} />
            <RadialBlock settings={opts_radial} />
        </Wrapper>
    );
});

function startLoop(cb: (deltaTime: number) => void) {
    let start = 0
    let previousTimeStamp = 0;
    let delta = -1;
    let prevDelta = -1;

    function anim(timestamp: number) {
        if (start === undefined) {
            start = timestamp;
        }
        const elapsed = timestamp - start;
        const delta = (timestamp - previousTimeStamp) / 1000;

        // console.log('elapsed', elapsed, 'timestamp', timestamp)

        cb(delta);

        previousTimeStamp = timestamp

        requestAnimationFrame(anim);
    }

    requestAnimationFrame(anim);
}

function startTestBlockLoop(opts: { svgEl: SVGSVGElement; settings: typeof opts_matrix1 }) {
    const cells = new Map<string, Element>();
    for (let y = 0; y < opts.settings.gridSize.y; y++) {
        for (let x = 0; x < opts.settings.gridSize.x; x++) {
            const key = `${x} ${y}`;
            const el = opts.svgEl.querySelector(`[data-cell="${key}"]`);
            if (!el) throw new Error(`cell not found: "${key}"`);

            cells.set(key, el);
        }
    }
    // console.log('cells', cells)

    const currentCell = { x: 0, y: 0 };
    const prevCell = { x: 0, y: 0 };

    let testElapsed = 0;

    //
    //
    //

    startLoop(deltaTime => {
        testElapsed += deltaTime;

        if (testElapsed >= .1) {
            testElapsed = 0;
            // const x = random.range(0, settings.gridSize.x);
            // const y = random.range(0, settings.gridSize.y);

            const el = cells.get(`${currentCell.x} ${currentCell.y}`);
            const prevEl = cells.get(`${prevCell.x} ${prevCell.y}`);

            if (el && prevEl) {
                const colorsCount = 6;
                const hue = random.range(0, colorsCount - 1) * 360 / colorsCount;
                prevEl.setAttribute('fill', `hsl(${hue}, 0%, 50%)`);
                el.setAttribute('fill', `hsl(${hue}, 50%, 50%)`);
            }

            prevCell.x = currentCell.x;
            prevCell.y = currentCell.y;

            if (currentCell.x < opts.settings.gridSize.x - 1) {
                currentCell.x += 1;
            }
            else {
                currentCell.x = 0;

                if (currentCell.y < opts.settings.gridSize.y - 1) {
                    currentCell.y += 1;
                }
                else {
                    currentCell.y = 0;
                }
            }
        }
    });
}

const TestBlock: React.FC<{ settings: typeof opts_matrix1 }> = observer(({settings}) => {
    const svgEl = React.useRef<SVGSVGElement>(null)

    React.useEffect(() => {
        if (svgEl.current) {
            startTestBlockLoop({svgEl: svgEl.current, settings});
        }
    }, []);

    return (
        <div>
            <svg
                ref={svgEl}
                width={1440}
                height={150}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                style={{ backgroundColor: '#eee' }}
            >
                {
                    _.arr(settings.gridSize.y).map(y => {
                        return _.arr(settings.gridSize.x).map(x => {
                            const hue = Math.random() * 360;

                            return (
                                <rect
                                    key={`${x}x${y}`}
                                    data-cell={`${x} ${y}`}
                                    x={x * settings.cellSize.x + settings.gutter * x}
                                    y={y * settings.cellSize.y + settings.gutter * y}
                                    width={settings.cellSize.x}
                                    height={settings.cellSize.y}
                                    strokeWidth={0}
                                    fill={`hsl(${hue}, 0%, 50%)`}
                                />
                            );
                        });
                    })
                }
            </svg>
        </div>
    )
});

const MatrixBlock: React.FC<{ settings: typeof opts_matrix1 }> = observer(({ settings }) => {
    return (
        <div>
            <svg
                width={1440}
                height={500}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                style={{ backgroundColor: '#eee' }}
            >
                {
                    _.arr(settings.gridSize.y).map(y => {
                        return _.arr(settings.gridSize.x).map(x => {
                            const hue = Math.random() * 360;

                            return (
                                <rect
                                    key={`${x}x${y}`}
                                    x={x * settings.cellSize.x + settings.gutter * x}
                                    y={y * settings.cellSize.y + settings.gutter * y}
                                    width={settings.cellSize.x}
                                    height={settings.cellSize.y}
                                    strokeWidth={0}
                                    fill={`hsl(${hue}, 50%, 50%)`}
                                />
                            );
                        });
                    })
                }
            </svg>
        </div>
    );
});

const RadialBlock: React.FC<{ settings: typeof opts_radial }> = observer(({ settings }) => {

    React.useEffect(() => {

    }, []);

    return (
        <div>
            <svg
                width={1440}
                height={500}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                style={{ backgroundColor: '#eee' }}
            >
                <g transform={`translate(${200}, ${200})`}>
                    {
                        settings.lines.map((line, lineN) => {
                            const angle = 360 / line.points;
                            // console.log('fragments', fragments)

                            return _.arr(line.points).map(i => {
                                const hue = Math.random() * 360;
                                // const angle = fragments * i;
                                const p = posOnCircle(line.lineRadius, angle * i);

                                return (
                                    <circle
                                        key={`${lineN}x${i}`}
                                        cx={p.x}
                                        cy={p.y}
                                        r={line.pointRadius}
                                        strokeWidth={0}
                                        fill={`hsl(${hue}, 50%, 50%)`}
                                    />
                                );
                            });
                        })
                    }
                </g>
            </svg>
        </div>
    );
});