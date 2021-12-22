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

const Wrapper = styled.div`

`;

const WIDTH = 1280;
const HEIGHT = 720;

const planet = {
    // radius: 100,
    // layers: 10,
    colors: ['red', 'orange', 'darkorange', 'grey', 'silver', 'darkgrey', 'white'],
};
const masks = [
    {
        id: 'full',
        innerCircleRadius: 0
    },
    {
        id: 'thick',
        innerCircleRadius: .25
    },
    {
        id: 'thin',
        innerCircleRadius: .45
    }
];
const maskIds = masks.map(m => m.id);

export const ProcgenSvgView: React.FC<{ store: Store.Store }> = observer(({ store }) => {

    React.useEffect(() => {

    }, []);

    return (
        <Wrapper>
            <svg
                width={WIDTH}
                height={HEIGHT}
                // width="100%"
                viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                style={{ backgroundColor: '#eee' }}
            >
                <defs>
                    {
                        masks.map(mask => {
                            return (
                                <mask
                                    key={mask.id}
                                    id={`my-mask_${mask.id}`}
                                    maskContentUnits="objectBoundingBox"
                                // maskUnits="objectBoundingBox"
                                >
                                    {/* <rect x={0} y={0} width={planet.radius * 2} height={planet.radius * 2} fill={'black'} /> */}
                                    <rect
                                        x={0}
                                        y={0}
                                        width={'100%'}
                                        height={'100%'}
                                        fill={'black'}
                                    />
                                    {/* <rect x={0} y={0} width={1} height={1} fill={'black'} /> */}

                                    <circle
                                        // cx={planet.radius}
                                        // cy={planet.radius}
                                        // r={planet.radius}
                                        // cx={'50%'}
                                        // cy={'50%'}
                                        // r={'50%'}
                                        cx={.5}
                                        cy={.5}
                                        r={.5}
                                        fill={'white'}
                                    />

                                    {
                                        mask.innerCircleRadius !== .5
                                        &&
                                        <circle
                                            // cx={'50%'}
                                            // cy={'50%'}
                                            // r={'25%'}
                                            cx={.5}
                                            cy={.5}
                                            r={mask.innerCircleRadius}
                                            fill={'black'}
                                        />
                                    }
                                </mask>
                            )
                        })
                    }
                </defs>

                {
                    _.arr(10).map(i => {
                        const x = random.range(0, WIDTH);
                        const y = random.range(0, HEIGHT);
                        const radius = random.range(30, 120);
                        const layers = random.range(5, 15);
                        const maskId = `my-mask_${random.sample(maskIds)}`;

                        return (
                            <g
                                key={i}
                                transform={`translate(${x}, ${y})`}
                                mask={`url(#${maskId})`}
                            >
                                {
                                    _.arr(layers).map(j => {
                                        const layerHeight = radius * 2 / layers;
                                        // const hue = random.range(0, 360);

                                        return (
                                            <rect
                                                key={`${i}x${j}`}
                                                x={0}
                                                y={layerHeight * j}
                                                width={radius * 2}
                                                height={layerHeight}
                                                strokeWidth={0}
                                                // fill={`hsl(${hue}, 50%, 50%)`}
                                                fill={random.sample(planet.colors)}
                                            />
                                        )
                                    })
                                }
                            </g>
                        );
                    })
                }
            </svg>
        </Wrapper>
    );
});