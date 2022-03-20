import classNames from 'classnames';
import React from 'react';
import { Editor, Element as SlateElement, Transforms } from 'slate';
import { useSlate } from 'slate-react';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  });

  const newProperties: Partial<SlateElement> = {
    type: isActive
      ? 'paragraph'
      : isList ? 'list-item' : format,
  } as any;

  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const isBlockActive = (editor, format) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Editor.nodes(editor, {
    at: Editor.unhangRange(editor, selection),
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

export const RichBlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <button
      className={classNames('mark', { 'active': isBlockActive(editor, format) })}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </button>
  );
};