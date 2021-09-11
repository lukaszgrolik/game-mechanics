import * as React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { action, makeObservable, observable } from 'mobx';
import { observer } from "mobx-react-lite";
import styled from '@emotion/styled';

import * as Store from './store/store';
import { Box, boxesIntersect, Circle, circleAndBoxIntersect, circlesIntersect, Shape2d, Vector2 } from './utils';

const Wrapper = styled.div`

`;

const WIDTH = 1280;
const HEIGHT = 720;

function randomValue(a: number, b: number) {
    return a + Math.random() * (b - a);
}

class Transform {
    readonly position = Vector2.zero();

    constructor(body: {position: Vector2}) {
        this.position = body.position;
    }
}

abstract class Collider2d {
    static collides(c1: Collider2d, c2: Collider2d) {
        const circleCollidesWithRect = (circleColl: CircleCollider, rectColl: RectCollider) => {
            const circle = new Circle(circleColl.circle.position.x + circleColl.transform.position.x, circleColl.circle.position.y + circleColl.transform.position.y, circleColl.circle.r);
            const box = new Box(rectColl.box.position.x + rectColl.transform.position.x, rectColl.box.position.y + rectColl.transform.position.y, rectColl.box.size.x, rectColl.box.size.y);

            return circleAndBoxIntersect(circle, box);
        }

        if (c1 instanceof CircleCollider && c2 instanceof CircleCollider) {
            const circle1 = new Circle(c1.circle.position.x + c1.transform.position.x, c1.circle.position.y + c1.transform.position.y, c1.circle.r);
            const circle2 = new Circle(c2.circle.position.x + c2.transform.position.x, c2.circle.position.y + c2.transform.position.y, c2.circle.r);

            return circlesIntersect(circle1, circle2);
        }
        else if (c1 instanceof RectCollider && c2 instanceof RectCollider) {
            const b1 = new Box(c1.box.position.x + c1.transform.position.x, c1.box.position.y + c1.transform.position.y, c1.box.size.x, c1.box.size.y);
            const b2 = new Box(c2.box.position.x + c2.transform.position.x, c2.box.position.y + c2.transform.position.y, c2.box.size.x, c2.box.size.y);

            return boxesIntersect(b1, b2);
        }
        else if (c1 instanceof CircleCollider && c2 instanceof RectCollider) {
            return circleCollidesWithRect(c1, c2);
        }
        else if (c2 instanceof CircleCollider && c1 instanceof RectCollider) {
            return circleCollidesWithRect(c2, c1);
        }
        else {
            console.warn(`unsupported colliders scenario: ${c1} & ${c2}`);
            return false;
        }
    }

    constructor(readonly transform: Transform) {

    }

    abstract collidesWith(other: Collider2d): boolean;
}

class RectCollider extends Collider2d {
    constructor(transform: Transform, readonly box: Box) {
        super(transform);
    }

    collidesWith(other: Collider2d): boolean {
        return Collider2d.collides(this, other);
    }
}

class CircleCollider extends Collider2d {
    constructor(transform: Transform, readonly circle: Circle) {
        super(transform);
    }

    collidesWith(other: Collider2d): boolean {
        if (other instanceof CircleCollider) {
            const c1 = new Circle(this.circle.position.x + this.transform.position.x, this.circle.position.y + this.transform.position.y, this.circle.r);
            const c2 = new Circle(other.circle.position.x + other.transform.position.x, other.circle.position.y + other.transform.position.y, other.circle.r);

            return circlesIntersect(c1, c2);
        }

        return false;
    }
}

class SimObject {
    readonly transform: Transform;
    // readonly shape2d: Shape2d;
    readonly collider2d: Collider2d;

    // constructor(transform: Transform, shape2d: Shape2d, collider2d: Collider2d) {
    constructor(transform: Transform, collider2d: Collider2d) {
        this.transform = transform;
        // this.shape2d = shape2d;
        this.collider2d = collider2d;
    }
}

class SimEngine {
    readonly objects: SimObject[] = [];
    readonly collisions: SimObject[] = [];

    constructor() {
        makeObservable(this, {
            objects: observable,
            collisions: observable,

            detectCollisions: action,
        });
    }

    detectCollisions() {
        this.collisions.length = 0;

        for (let i = 0; i < this.objects.length; i++) {
            const obj = this.objects[i];

            for (let j = 0; j < this.objects.length; j++) {
                if (i === j) continue;

                const obj2 = this.objects[j];

                if (obj.collider2d.collidesWith(obj2.collider2d)) {
                    this.collisions.push(obj);
                }
            }
        }
    }
}

function initSimEngine1(simEngine: SimEngine) {
    const getRandomRectObject = () => {
        const x = randomValue(0, WIDTH);
        const y = randomValue(0, HEIGHT);
        const w = randomValue(25, 200);
        const h = randomValue(25, 200);

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

    simEngine.objects.push(...rectObjects);

    simEngine.detectCollisions();

    // setInterval(() => {
    //     const obj = getRandomRectObject();
    //     simEngine.objects.push(obj);

    //     simEngine.detectCollisions();
    // }, 250);

}
function initSimEngine2(simEngine: SimEngine) {
    const getRandomRectObject = () => {
        const x = randomValue(0, WIDTH);
        const y = randomValue(0, HEIGHT);
        const w = randomValue(25, 200);
        const h = randomValue(25, 200);

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
        const x = randomValue(0, WIDTH);
        const y = randomValue(0, HEIGHT);
        const r = randomValue(10, 100);

        const circle = new Circle(0, 0, r);

        const transform = new Transform({
            position: new Vector2(x, y),
        });
        const collider = new CircleCollider(transform, circle);

        const simObj = new SimObject(transform, collider);

        return simObj;
    });

    simEngine.objects.push(...rectObjects, ...circleObjects);

    simEngine.detectCollisions();
}

export const MainView: React.FC<{store: Store.Store}> = observer(({store}) => {
    const [simEngine1] = React.useState(new SimEngine());
    const [simEngine2] = React.useState(new SimEngine());

    React.useEffect(() => {
        initSimEngine1(simEngine1);
        initSimEngine2(simEngine2);
    }, []);

    return (
        <Wrapper>
            <svg width={WIDTH} height={HEIGHT} version="1.1" xmlns="http://www.w3.org/2000/svg" style={{backgroundColor: '#eee'}}>
                {
                    simEngine1.objects.map((obj, i) => {
                        const isColliding = simEngine1.collisions.includes(obj);
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
                    simEngine2.objects.map((obj, i) => {
                        const isColliding = simEngine2.collisions.includes(obj);
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