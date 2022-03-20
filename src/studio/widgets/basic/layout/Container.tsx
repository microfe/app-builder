import React, { useEffect } from 'react';

import { CssSettings } from '../../settings';
import { Resizer } from './Resizer';

interface IContainerProps {
  readonly style?: React.CSSProperties;
}

const defaultProps: Partial<IContainerProps> = {
  style: {
    height: '200px',
    width: '200px',
    backgroundColor: 'white'
  }
};

export const Container = (props: Partial<React.PropsWithChildren<IContainerProps>>) => {

  return (
    <Resizer style={props.style}>
      {props.children}
    </Resizer>
  );
};

Container.craft = {
  displayName: 'Container',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: CssSettings,
  }
};
