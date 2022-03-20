import { useNode } from 'libs/@craftjs/core';
import React from 'react';

interface IWidgetColumnProps {
  readonly style?: React.CSSProperties;
}

export const WidgetColumn = (props: React.PropsWithChildren<IWidgetColumnProps>) => {
  const { connectors: { connect, drag }, } = useNode();

  return (
    <div
      ref={ref => connect(drag(ref))}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

const defaultProps = {
  style: {
    width: '200px',
    height: '400px',
    backgroundColor: 'gray'
  }
};

WidgetColumn.craft = {
  displayName: 'Column',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
};