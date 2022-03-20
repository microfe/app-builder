import { Button } from 'antd';
import React from 'react';

import { Resizer } from '../layout/Resizer';

interface IWidgetButtonProps {
  readonly style?: React.CSSProperties;
}

export const WidgetButton = (props: React.PropsWithChildren<IWidgetButtonProps>) => {

  return (
    <Resizer style={{ ...props.style, display: 'inline-block' }}>
      <Button style={props.style}>{props.children}</Button>
    </Resizer>
  );
};

const defaultProps: IWidgetButtonProps = {
  style: {
    height: 'auto',
    width: 'auto'
  }
};

WidgetButton.craft = {
  displayName: 'Button',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
};