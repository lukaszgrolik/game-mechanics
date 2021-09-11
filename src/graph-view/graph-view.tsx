import * as React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { action, makeObservable, observable } from 'mobx';
import { observer } from "mobx-react-lite";
import styled from '@emotion/styled';

import * as random from '../random';
import * as Store from '../store/store';
import { getLineSegmentSize, Vector2 } from '../utils';

const Wrapper = styled.div`

`;

const nodes: {[key: string]: {pos: Vector2; c: string}} = {
    A: { pos: new Vector2(100, 100), c: 'silver' },
    B: { pos: new Vector2(250, 100), c: 'silver' },
    C: { pos: new Vector2(250, 220), c: 'silver' },
    D: { pos: new Vector2(100, 220), c: 'silver' },

    E: { pos: new Vector2(110, 50), c: 'blue' },
    F: { pos: new Vector2(350, 250), c: 'blue' },
};

class Edge {
    from: string;
    to: string;
    weight: number;

    constructor(opts: {from: string; to: string; weight: number}) {
        this.from = opts.from;
        this.to = opts.to;
        this.weight = opts.weight;
    }

    get fromNode() {
        return nodes[this.from];
    }

    get toNode() {
        return nodes[this.to];
    }
}

const edges = [
    new Edge({ from: 'A', to: 'B', weight: getLineSegmentSize(nodes.A.pos, nodes.B.pos) }),
    new Edge({ from: 'A', to: 'D', weight: getLineSegmentSize(nodes.A.pos, nodes.D.pos) }),
    new Edge({ from: 'C', to: 'B', weight: getLineSegmentSize(nodes.C.pos, nodes.B.pos) }),
    new Edge({ from: 'C', to: 'D', weight: getLineSegmentSize(nodes.C.pos, nodes.D.pos) }),

    new Edge({ from: 'E', to: 'F', weight: getLineSegmentSize(nodes.E.pos, nodes.F.pos) }),
];

const WIDTH = 500;
const HEIGHT = 500;

export const GraphView: React.FC<{ store: Store.Store }> = observer(({ store }) => {
    React.useEffect(() => {
    }, []);

    return (
        <Wrapper>
            <svg width={WIDTH} height={HEIGHT} style={{border: '1px solid silver'}}>
                {
                    edges.map(edge => {
                        const fromPos = edge.fromNode.pos;
                        const toPos = edge.toNode.pos;

                        return (
                            <line key={edge.from + '-' + edge.to} x1={fromPos.x} y1={HEIGHT - fromPos.y} x2={toPos.x} y2={HEIGHT - toPos.y} stroke="silver" strokeWidth={1} />
                        );
                    })
                }

                {
                    Object.entries(nodes).map(([nodeName, nodeData]) => {
                        return (
                            <g key={nodeName} transform={`translate(${nodeData.pos.x}, ${HEIGHT - nodeData.pos.y})`}>
                                <circle r={3} fill={nodeData.c} />
                                <text>{nodeName}</text>
                            </g>
                        );
                    })
                }
            </svg>
        </Wrapper>
    );
});