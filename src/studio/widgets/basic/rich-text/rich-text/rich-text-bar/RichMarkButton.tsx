import classNames from 'classnames';
import React from 'react';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';
import styled from 'styled-components';

const _RichMarkButton = styled.button`
  width: var(--rtb-button-height);
  height: var(--rtb-button-height);
  border: none;
  background-color: white;
  &.mark {
    opacity: 0.5;
    &.active {
      opacity: 1;
    }
  }
`;

export const RichMarkButton = ({ format, icon }) => {
  const editor = useSlate();
  console.log(editor);

  return (
    <_RichMarkButton
      className={classNames('mark', { 'active': isMarkActive(editor, format) })}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </_RichMarkButton>
  );
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};