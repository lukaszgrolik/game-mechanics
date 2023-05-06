import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import styled from '@emotion/styled';

import * as Store from './store/store';
import { MainView } from './views/main-view/main-view';
import { GaView } from './views/ga-view/ga-view';
import { GraphView } from './views/graph-view/graph-view';
import { ProcgenMapsView } from './views/procgen-maps-view/procgen-maps-view';
import { ColorBoardView } from './views/color-board-view/color-board-view';
import { ProcgenSvgView } from './views/procgen-svg-view/procgen-svg-view';
import { ArpgView } from './views/arpg-view/arpg-view';

declare var window: {__store: Store.Store};

const store = new Store.Store();
window.__store = store;

const MainLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  /* grid-template-columns: 1fr; */
  grid-template-areas:
      "header"
      "body";
  height: 100vh;
  overflow: hidden;
`;
const MainMenu = styled.ul`
  grid-area: header;
  background-color: #eee;
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;

  a {
    display: block;
    padding: .5em 1em;

    &:hover {
        background-color: rgba(0, 0, 0, .1);
    }
  }
`;
const Body = styled.div`
  grid-area: body;
  overflow: auto;
`;

const pages = [
  { path: '/ga', label: 'GA', Component: GaView },
  { path: '/graph', label: 'Graph', Component: GraphView },
  { path: '/collision', label: 'Collisions', Component: MainView },
  { path: '/procgen-maps', label: 'Procgen Maps', Component: ProcgenMapsView },
  { path: '/quest-system', label: 'Quests', Component: MainView },
  { path: '/canvas-game', label: 'Canvas game', Component: MainView },
  { path: '/color-board', label: 'Color board', Component: ColorBoardView },
  { path: '/procgen-svg', label: 'Procgen SVG', Component: ProcgenSvgView },
  { path: '/arpg', label: 'ARPG', Component: ArpgView },
];

const app = (
  <BrowserRouter>
    <MainLayout>
      <MainMenu>
        {
          pages.map(page => {
            return (
              <li key={page.path}>
                <NavLink style={props => props.isActive ? {fontWeight: 'bold'} : {} } to={page.path}>{page.label}</NavLink>
              </li>
            );
          })
        }
      </MainMenu>

      <Body>
        <Routes>
          {/* <Route path="/">
              <MainView store={store} />
          </Route> */}
          {
            pages.map(page => {
              return (
                <Route key={page.path} path={page.path} element={<page.Component store={store} />} />
              )
            })
          }
        </Routes>
      </Body>
    </MainLayout>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById('react-root') as HTMLElement);

root.render(app);