import React from 'react';
import styled from 'styled-components';

const _RichBarDivider = styled.div<IRichBarDividerProps>`
  height: ${({ type }) => type === 'horizontal' ? '1px' : 'var(--rtb-button-height)'} ;
  width: ${({ type }) => type === 'horizontal' ? '100%' : '1px'} ;
  background-color: lightgray;
  outline: none;
`;

interface IRichBarDividerProps {
  readonly type?: 'vertical' | 'horizontal';
}

export const RichBarDivider = (props: React.PropsWithChildren<IRichBarDividerProps>) => {
  const { } = props;

  return (
    <_RichBarDivider type={props.type} />
  );
};