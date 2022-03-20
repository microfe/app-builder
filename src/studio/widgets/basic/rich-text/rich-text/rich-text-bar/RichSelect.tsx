import React from 'react';
import styled from 'styled-components';

const _RichSelect = styled.select`
  height: var(--rtb-button-height);
  border: none;
  outline: none;
  min-width: 100px;
`;

interface IRichSelectProps {

}

export const RichSelect = (props: React.PropsWithChildren<IRichSelectProps>) => {
  const { } = props;

  return (
    <_RichSelect>
      {props.children}
    </_RichSelect>
  );
};