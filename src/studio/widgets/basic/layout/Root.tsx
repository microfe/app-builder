import { Empty, Typography } from 'antd';
import { useNode } from 'libs/@craftjs/core';
import { i18n } from 'libs/framework';
import React from 'react';
import styled from 'styled-components';

import { CssSettings } from '../../settings';
import { Resizer } from './Resizer';

const _EmptyRoot = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IRootProps {
  readonly style?: React.CSSProperties;
}

const defaultProps: Partial<IRootProps> = {
  style: {
    width: '100%',
    height: '100vh',
  }
};

export const Root = (props: Partial<React.PropsWithChildren<IRootProps>>) => {
  const {
    children,
  } = props;

  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      style={props.style}
      ref={(ref) => {
        if (ref) {
          connect(ref);
        }
      }}
    >
      {
        children
      }
    </div>
  );
};

Root.craft = {
  displayName: 'Root',
  props: defaultProps,
  rules: {
    canDrag: () => false,
  },
  related: {
    toolbar: CssSettings,
  }
};
