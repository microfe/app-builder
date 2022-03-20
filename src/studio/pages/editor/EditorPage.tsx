import { ApplicationPage } from 'libs/framework';
import React from 'react';
import styled from 'styled-components';

import { EditorViewport, LayerTree, SidePanel } from './components';

const _EditorPage = styled.main`
  display: flex;
  flex-direction: row;
  height: 100%;

  .viewport-area {
    flex-grow: 1;
    padding: 24px 24px 0 24px;
    display: flex;
  }
  .layer-area {
    padding: 24px 24px 0 0;
    width: 300px;
    overflow: auto;

    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

interface IEditorPageState {

}

export class EditorPage extends ApplicationPage<unknown, IEditorPageState> {
  public render() {
    return (
      <_EditorPage id="EditorPage">
        <SidePanel />
        <div className="viewport-area">
          <EditorViewport />
        </div>
        <div className="layer-area">
          <LayerTree />
        </div>
      </_EditorPage>
    );
  }
}