import { Input } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { Layers } from '@craftjs/layers';

import { DefaultLayer } from './layer-tree';

const _LayerTree = styled.div`
  h2 {
    padding-bottom: 0;
    margin-bottom: 0;
  }
  .search {
    padding: 6px 0;
    margin-bottom: 12px;
  }
  .search-box {
    border-radius: 20px;
  }
`;

interface ILayerTreeProps {

}

export const LayerTree = (props: React.PropsWithChildren<ILayerTreeProps>) => {
  const { } = props;

  return (
    <_LayerTree>
      <div className="search">
        <Input className="search-box" placeholder="search layer..." />
      </div>
      <Layers renderLayer={DefaultLayer} expandRootOnLoad />
    </_LayerTree>
  );
};