import React from 'react';
import styled from 'styled-components';

import {
  CaretDownOutlined,
  CaretUpOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LinkOutlined,
  UpOutlined
} from '@ant-design/icons';
import { useEditor } from '@craftjs/core';
import { useLayer } from '@craftjs/layers';

import { EditableLayerName } from './EditableLayerName';

const StyledDiv = styled.div<{ depth: number; selected: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 10px;
  border-radius: 5px;
  margin-bottom: 6px;
  height: 42px;
  background: ${(props) => (props.selected ? 'var(--primary-7)' : 'white')};
  color: ${(props) => (props.selected ? '#fff' : 'inherit')};
  margin-left: ${(props) => props.depth * 12}px;

  .inner {
    flex: 1;
    > div {
      padding: 0px;
      flex: 1;
      display: flex;
      align-items: center;
      div.layer-name {
        flex: 1;
      }
    }
  }
`;

const Expand = styled.span`
  display: block;
  opacity: 0.7;
  cursor: pointer;
  transform-origin: 60% center;
`;

const Hide = styled.span<{ selected: boolean; isHidden: boolean }>`
  margin-right: 10px;
  position: relative;
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  cursor: pointer;
  svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: ${(props) => (props.isHidden ? 0.2 : 1)};
  }
`;

const TopLevelIndicator = styled.div`
  margin-left: -22px;
  margin-right: 10px;
  svg {
    width: 12px;
    height: 12px;
  }
`;

export const DefaultLayerHeader: React.FC = () => {
  const {
    id,
    depth,
    expanded,
    children,
    connectors: { drag, layerHeader },
    actions: { toggleLayer },
  } = useLayer((layer) => {
    return {
      expanded: layer.expanded,
    };
  });

  const { hidden, actions, selected, topLevel } = useEditor((state, query) => {
    // TODO: handle multiple selected elements
    const selected = query.getEvent('selected').first() === id;

    return {
      hidden: state.nodes[id] && state.nodes[id].data.hidden,
      selected,
      topLevel: query.node(id).isTopLevelCanvas(),
    };
  });

  return (
    <StyledDiv
      id={id}
      className="layer"
      ref={drag as any}
      selected={selected}
      depth={depth}
    >
      <Hide
        selected={selected}
        isHidden={hidden}
        onClick={() => actions.setHidden(id, !hidden)}
      >
        {hidden ? <EyeInvisibleOutlined /> : <EyeOutlined />}
      </Hide>
      <div className="inner">
        <div ref={layerHeader as any}>
          {topLevel ? (
            <TopLevelIndicator className="craft-top-level-indicator">
              <LinkOutlined />
            </TopLevelIndicator>
          ) : null}
          <div className="layer-name s">
            <EditableLayerName />
          </div>
          <div>
            {children && children.length ? (
              <Expand onClick={() => toggleLayer()}>
                {expanded ? <CaretUpOutlined /> : <CaretDownOutlined />}
              </Expand>
            ) : null}
          </div>
        </div>
      </div>
    </StyledDiv>
  );
};