import React from 'react';
import styled from 'styled-components';

const _StudioLayoutHeader = styled.div`
`;

interface IStudioLayoutHeaderProps {

}

export const StudioLayoutHeader = (props: React.PropsWithChildren<IStudioLayoutHeaderProps>) => {
  const { } = props;

  return (
    <_StudioLayoutHeader id="StudioLayoutHeader">
        {props.children}
    </_StudioLayoutHeader>
  );
};