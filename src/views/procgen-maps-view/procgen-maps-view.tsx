import * as React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { action, makeObservable, observable } from 'mobx';
import { observer } from "mobx-react-lite";
import styled from '@emotion/styled';

import * as random from '../../lib/random';
import * as Store from '../../store/store';

const Wrapper = styled.div`

`;

const WIDTH = 500;
const HEIGHT = 500;

export const ProcgenMapsView: React.FC<{ store: Store.Store }> = observer(({ store }) => {
    React.useEffect(() => {

    }, []);

    return (
        <Wrapper>
            <svg width={WIDTH} height={HEIGHT} style={{ border: '1px solid silver' }}>
                {/* {
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
                } */}
            </svg>
        </Wrapper>
    );
});