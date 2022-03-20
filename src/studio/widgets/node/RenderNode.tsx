import React, { useCallback, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { grayColors } from '@/_shared/colors';
import {
  DeleteOutlined,
  DragOutlined,
  VerticalAlignTopOutlined
} from '@ant-design/icons';
import { useEditor, useNode } from '@craftjs/core';
import { ROOT_NODE } from '@craftjs/utils';

const IndicatorDiv = styled.div`
  height: 30px;
  margin-top: -29px;
  font-size: 12px;
  line-height: 12px;
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  background: ${grayColors.gray5};
  color: white;
  padding: 0 6px;
  &.actived {
    background: var(--node-selected-background);
    color: var(--node-selected-color);
  }
  .node-type {
    margin-right: 12px;
  }
`;

const Btn = styled.span`
  padding: 0 0px;
  opacity: 0.9;
  display: flex;
  align-items: center;
  margin-right: 6px;
  cursor: pointer;
  > div {
    position: relative;
    top: -50%;
    left: -50%;
  }
`;

export const RenderNode = ({ render }) => {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((state) => ({
    isActive: state.nodes[id]?.events.selected,
  }));
  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props,
  }));

  const currentRef = useRef<HTMLDivElement>();

  useEffect(
    () => {
      if (!dom) {
        return;
      }

      if (isActive) {
        dom.classList.add('node-selected');
      }
      else {
        dom.classList.remove('node-selected');
      }

      if (isHover) {
        dom.classList.add('node-hovered');
      }
      else {
        dom.classList.remove('node-hovered');
      }
    },
    [dom, isActive, isHover]
  );

  const getPos = useCallback(
    (dom: HTMLElement) => {

      const { top, left, bottom } = dom
        ? dom.getBoundingClientRect()
        : { top: 0, left: 0, bottom: 0 };

      return {
        top: `${top > 0 ? top : bottom}px`,
        left: `${left}px`,
      };
    },
    []
  );

  const scroll = useCallback(
    () => {
      const { current: currentDOM } = currentRef;

      if (!currentDOM) {
        return;
      }
      const { top, left } = getPos(dom!);
      currentDOM.style.top = top;
      currentDOM.style.left = left;
    },
    [dom, getPos]
  );

  useEffect(
    () => {
      document.querySelector('#EditorViewport')?.addEventListener('scroll', scroll);

      return () => {
        document.querySelector('#EditorViewport')?.removeEventListener('scroll', scroll);
      };
    },
    [scroll]
  );

  const showIndicator = (isHover || isActive);

  return (
    <>
      {render}
    </>
  );
};
