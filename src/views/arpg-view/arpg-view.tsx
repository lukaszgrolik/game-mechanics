import * as React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { action, makeObservable, observable } from 'mobx';
import { observer } from "mobx-react-lite";
import styled from '@emotion/styled';

import * as Store from '../../store/store';
import { DropSystem } from '../../lib/arpg-store/drop-system';

declare var window: {dropSystem: DropSystem};

const Wrapper = styled.div`

`;
export const ArpgView: React.FC<{ store: Store.Store }> = observer(({ store }) => {
    // const [dropSystem] = React.useState(new DropSystem());

    React.useEffect(() => {
        window.dropSystem = new DropSystem();
    }, []);

    return (
        <Wrapper>

        </Wrapper>
    );
});