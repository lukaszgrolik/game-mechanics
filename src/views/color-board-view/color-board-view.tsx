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

const Wrapper = styled.div`

`;

// const WIDTH = 1280;
// const HEIGHT = 720;

const opts_kb = {
    keySize: { x: 20, y: 20},
    keyboards: 4,
    keys: 61,
    gutter: 3,
};
const opts_matrix = {
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
    const [simEngine1] = React.useState(new SimEngine());
    const [simEngine2] = React.useState(new SimEngine());

    React.useEffect(() => {

    }, []);

    return (
        <Wrapper>
            <svg
                width={1440}
                height={150}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                style={{ backgroundColor: '#eee' }}
            >
                {
                    _.arr(opts_kb.keyboards).map(y => {
                        return _.arr(opts_kb.keys).map(x => {
                            const hue = Math.random() * 360;

                            return (
                                <rect
                                    key={`${x}x${y}`}
                                    x={x * opts_kb.keySize.x + opts_kb.gutter * x}
                                    y={y * opts_kb.keySize.y + opts_kb.gutter * y}
                                    width={opts_kb.keySize.x}
                                    height={opts_kb.keySize.y}
                                    strokeWidth={0}
                                    fill={`hsl(${hue}, 50%, 50%)`}
                                />
                            );
                        });
                    })
                }
            </svg>

            <svg
                width={1440}
                height={500}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                style={{ backgroundColor: '#eee' }}
            >
                {
                    _.arr(opts_matrix.gridSize.y).map(y => {
                        return _.arr(opts_matrix.gridSize.x).map(x => {
                            const hue = Math.random() * 360;

                            return (
                                <rect
                                    key={`${x}x${y}`}
                                    x={x * opts_matrix.cellSize.x + opts_matrix.gutter * x}
                                    y={y * opts_matrix.cellSize.y + opts_matrix.gutter * y}
                                    width={opts_matrix.cellSize.x}
                                    height={opts_matrix.cellSize.y}
                                    strokeWidth={0}
                                    fill={`hsl(${hue}, 50%, 50%)`}
                                />
                            );
                        });
                    })
                }
            </svg>

            <svg
                width={1440}
                height={500}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                style={{ backgroundColor: '#eee' }}
            >
                <g transform={`translate(${200}, ${200})`}>
                    {
                        opts_radial.lines.map((line, lineN) => {
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
        </Wrapper>
    );
});