
import React from 'react';
import styled from 'styled-components';

import { useEditor } from '@craftjs/core';
import { useLayer } from '@craftjs/layers';

import { DefaultLayerHeader } from './DefaultLayerHeader';

const LayerNodeDiv = styled.div<{
  expanded: boolean;
  hasCanvases: boolean;
  hovered: boolean;
}>`
  display: block;
`;

export const DefaultLayer: React.FC = ({ children }) => {
  const {
    id,
    expanded,
    hovered,
    connectors: { layer },
  } = useLayer((layer) => ({
    hovered: layer.event.hovered,
    expanded: layer.expanded,
  }));
  const { hasChildCanvases } = useEditor((state, query) => {
    return {
      hasChildCanvases: query.node(id).isParentOfTopLevelNodes(),
    };
  });

  return (
    <LayerNodeDiv
      ref={layer as any}
      expanded={expanded}
      hasCanvases={hasChildCanvases}
      hovered={hovered}
    >
      <DefaultLayerHeader />
      {children
        ? (
          <div className="craft-layer-children">
            {children}
          </div>
        )
        : null
      }
    </LayerNodeDiv>
  );
};