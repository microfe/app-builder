import React, { useCallback, useMemo } from 'react';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

import { useEditor, useNode } from '@craftjs/core';

import { Resizer } from '../layout/Resizer';
import { RichTextBar, RichTextLeaf } from './rich-text';
import { RichTextElement } from './rich-text/RichTextElement';

interface IRichTextProps {
  readonly value?: any;
  readonly style?: React.CSSProperties;
}

export const RichText = (props: React.PropsWithChildren<IRichTextProps>) => {
  const { actions: { setProp }, id } = useNode();

  const { isActive } = useEditor((state) => ({
    isActive: state.nodes[id]?.events.selected,
  }));

  const renderElement = useCallback(props => <RichTextElement {...props} />, []);
  const renderLeaf = useCallback(props => <RichTextLeaf {...props} />, []);
  const editor = useMemo(() => withReact(createEditor() as any), []);

  return (
    <Resizer style={props.style}>
      <Slate
        editor={editor}
        value={props.value}
        onChange={newValue => setProp(props => { props.value = newValue; })}
      >
        {isActive && <RichTextBar />}
        <Editable
          style={props.style}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </Slate>
    </Resizer>
  );
};

RichText.craft = {
  displayName: 'RichText',
  props: {
    style: {
      height: '100px',
      width: '500px'
    },
    value: [{
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    }]
  },
  rules: {
    canDrag: () => true,
  }
};