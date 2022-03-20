import React from 'react';
import styled from 'styled-components';

const _StudioLayoutBody = styled.div`
height: 100%;
`;

interface IStudioLayoutBodyProps {

}

export const StudioLayoutBody = (props: React.PropsWithChildren<IStudioLayoutBodyProps>) => {
  const { } = props;

  return (
    <_StudioLayoutBody id="StudioLayoutBody">
      {props.children}
    </_StudioLayoutBody>
  );
};