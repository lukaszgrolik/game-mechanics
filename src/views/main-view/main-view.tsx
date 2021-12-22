import * as React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { action, makeObservable, observable } from 'mobx';
import { observer } from "mobx-react-lite";
import styled from '@emotion/styled';

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

function initSimEngine1(simEngine: SimEngine) {
    const getRandomRectObject = () => {
        const x = random.value(0, WIDTH);
        const y = random.value(0, HEIGHT);
        const w = random.value(25, 200);
        const h = random.value(25, 200);

        const box = new Box(0, 0, w, h);

        const transform = new Transform({
            position: new Vector2(x, y),
        });
        const collider = new RectCollider(transform, box);

        const simObj = new SimObject(transform, collider);

        return simObj;
    }
    const rectObjects = new Array(30).fill(null).map((_, i) => {
        return getRandomRectObject();
    });

    simEngine.addObjects(rectObjects);

    simEngine.detectCollisions();

    // setInterval(() => {
    //     const obj = getRandomRectObject();
    //     simEngine.addObjects(obj);

    //     simEngine.detectCollisions();
    // }, 250);

}
function initSimEngine2(simEngine: SimEngine) {
    const getRandomRectObject = () => {
        const x = random.value(0, WIDTH);
        const y = random.value(0, HEIGHT);
        const w = random.value(25, 200);
        const h = random.value(25, 200);

        const box = new Box(0, 0, w, h);

        const transform = new Transform({
            position: new Vector2(x, y),
        });
        const collider = new RectCollider(transform, box);

        const simObj = new SimObject(transform, collider);

        return simObj;
    }
    const rectObjects = new Array(30).fill(null).map((_, i) => {
        return getRandomRectObject();
    });
    const circleObjects = new Array(30).fill(null).map((_, i) => {
        const x = random.value(0, WIDTH);
        const y = random.value(0, HEIGHT);
        const r = random.value(10, 100);

        const circle = new Circle(0, 0, r);

        const transform = new Transform({
            position: new Vector2(x, y),
        });
        const collider = new CircleCollider(transform, circle);

        const simObj = new SimObject(transform, collider);

        return simObj;
    });

    simEngine.addObjects([...rectObjects, ...circleObjects]);

    simEngine.detectCollisions();
}

export const MainView: React.FC<{store: Store.Store}> = observer(({store}) => {
    const [simEngine1] = React.useState(new SimEngine());
    const [simEngine2] = React.useState(new SimEngine());

    React.useEffect(() => {
        initSimEngine1(simEngine1);
        initSimEngine2(simEngine2);

        // @todo fix rendering non-observable simEngine1.objects
    }, []);

    return (
        <Wrapper>
            <svg width={WIDTH} height={HEIGHT} version="1.1" xmlns="http://www.w3.org/2000/svg" style={{backgroundColor: '#eee'}}>
                {
                    simEngine1.getObjects().map((obj, i) => {
                        const isColliding = simEngine1.getCollisions().includes(obj);
                        const color = isColliding ? 'red' : 'black';

                        return (
                            <rect
                                key={i}
                                x={obj.transform.position.x}
                                y={obj.transform.position.y}
                                width={(obj.collider2d as RectCollider).box.size.x}
                                height={(obj.collider2d as RectCollider).box.size.y}
                                fill="transparent"
                                stroke={color}
                                strokeWidth={1}
                            />
                        );
                    })
                }
            </svg>

            <svg width={WIDTH} height={HEIGHT} version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ backgroundColor: '#eee' }}>
                {
                    simEngine2.getObjects().map((obj, i) => {
                        const isColliding = simEngine2.getCollisions().includes(obj);
                        const color = isColliding ? 'red' : 'black';

                        if (obj.collider2d instanceof RectCollider) {
                            return (
                                <rect
                                    key={i}
                                    x={obj.transform.position.x}
                                    y={obj.transform.position.y}
                                    width={(obj.collider2d as RectCollider).box.size.x}
                                    height={(obj.collider2d as RectCollider).box.size.y}
                                    fill="transparent"
                                    stroke={color}
                                    strokeWidth={1}
                                />
                            );
                        }
                        else if (obj.collider2d instanceof CircleCollider) {
                            return (
                                <circle
                                    key={i}
                                    cx={obj.transform.position.x}
                                    cy={obj.transform.position.y}
                                    r={(obj.collider2d as CircleCollider).circle.r}
                                    fill="transparent"
                                    stroke={color}
                                    strokeWidth={1}
                                />
                            );
                        }
                        else {
                            // console.warn(`unsupported collider type: ${obj.collider2d}`)
                            return null;
                        }
                    })
                }
            </svg>
        </Wrapper>
    );
});