import React from 'react';
import ContentEditable from 'react-contenteditable';

import { CssSettings } from '@/studio/widgets/settings';
import { useNode } from '@craftjs/core';

import { Resizer } from '../layout/Resizer';

interface ISimpleTextProps {
  readonly text?: string;
  readonly style?: React.CSSProperties;
}

const defaultProps: ISimpleTextProps = {
  style: {
    height: 'auto',
    width: 'auto'
  }
};

export const SimpleText = (props: ISimpleTextProps) => {
  const { connectors: { connect, drag }, actions: { setProp }, id } = useNode();

  const [canEdit, setCanEdit] = React.useState(false);

  return (
    <Resizer
      style={props.style}
      ref={ref => connect(drag(ref))}
    >
      <ContentEditable
        id={id}
        disabled={!canEdit}
        className="editable"
        tagName="span"
        html={props.text!}
        onDoubleClick={() => setCanEdit(true)}
        onChange={e => setProp(props => { props.text = e.target.value; }, 500)}
        onBlur={() => setCanEdit(false)}
        onKeyDown={(e) => {
          if (e.code == 'Escape') {
            setCanEdit(false);
          }
          if (e.code == 'Enter') {
            setCanEdit(true);
          }
        }}
      />
    </Resizer>
  );
};

SimpleText.craft = {
  displayName: 'Simple Text',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: CssSettings,
  }
};