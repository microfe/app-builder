import './EditorViewport.scss';

import React, { useContext } from 'react';
import styled from 'styled-components';

import { IKeyboardEventPayload, onKeyDown } from '@/_shared';
import { grayColors } from '@/_shared/colors';
import { StudioContext } from '@/studio/configs';
import { onFrameKeyDown, onRequestSavePage } from '@/studio/events';
import { Root } from '@/studio/widgets';
import { Element, Frame, ROOT_NODE, useEditor } from '@craftjs/core';

import { BrowserFrame } from './editor-viewport';

const _EditorViewport = styled.div`
  height: inherit;
  position: relative;
  padding: var(--container-base-height);

  .viewport-page-name {
    margin-bottom: 24px;
    font-size: 19px;
    opacity: 0.6;
    cursor: pointer;
    width: fit-content;
    &:hover {
      opacity: 1;
    }
  }

  .viewport-content {
    margin: 0 auto;
    position: relative;
    min-height: 100px;
    min-width: 800px;
    height: 100%;
  }

  .node-hovered {
    position: relative;
    &::after {
        content: " ";
        border: 1px dashed ${grayColors.gray1};
        width: calc(100% + 2px);
        height: calc(100% + 2px);
        position: absolute;
        left: -1px;
        top: -1px;
        pointer-events: none;
        display: block;
    }
  }

  .node-selected {
    --boder-color: var(--node-selected-background);

    position: relative;
    &::after {
        content: " ";
        border: 1px dashed var(--boder-color);
        width: calc(100% + 2px);
        height: calc(100% + 2px);
        position: absolute;
        left: -1px;
        top: -1px;
        pointer-events: none;
        display: block;
        z-index: 999;
    }
  }

`;

interface IEditorViewportProps {

}
export const EditorViewport = (props: React.PropsWithChildren<IEditorViewportProps>) => {
  const { activedPage } = useContext(StudioContext);

  const { connectors, actions, selecteds } = useEditor((state, query) => ({
    selecteds: [...state.events.selected.keys()]
  }));

  React.useEffect(
    () => {
      const keyDown = (e: IKeyboardEventPayload) => {
        if (e.key === 'Delete') {
          for (const selected of selecteds) {
            if (selected == ROOT_NODE) {
              continue;
            }
            actions.delete(selected);
          }
        }
        else if (e.key === 'z' && e.ctrlKey) {
          actions.history.undo();
        }
        else if (e.key === 'y' && e.ctrlKey) {
          actions.history.redo();
        }
        else if (e.key === 's' && e.ctrlKey) {
          onRequestSavePage.emit();
        }
      };

      onKeyDown.listen(keyDown);
      onFrameKeyDown.listen(keyDown);

      return () => {
        onKeyDown.unlisten(keyDown);
        onFrameKeyDown.unlisten(keyDown);
      };
    },
    [actions, selecteds]
  );

  return (
    <_EditorViewport
      id="EditorViewport"
      className="editor-animate"
      onMouseLeave={() => {
        connectors.hover(document.body, null!);
      }}
      onClick={(e) => {
        if (e.target['id'] !== 'EditorViewport') {
          return;
        }

        actions.clearEvents();
      }}
      style={{ width: '100%' }}
    >
      <div
        className="viewport-content"
        ref={(ref) => connectors.select(connectors.hover(ref!, null!), null!)}
      >
        <BrowserFrame url={activedPage?.name}>
          <Frame data={activedPage?.content}>
            <Element is={Root} canvas />
          </Frame>
        </BrowserFrame>
      </div>
    </_EditorViewport>
  );
};