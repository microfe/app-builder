import React from 'react';
import styled from 'styled-components';

const _StudioLayoutFooter = styled.div`
`;

interface IStudioLayoutFooterProps {

}

export const StudioLayoutFooter = (props: React.PropsWithChildren<IStudioLayoutFooterProps>) => {
  const { } = props;

  return (
    <_StudioLayoutFooter id="StudioLayoutFooter">
        {props.children}
    </_StudioLayoutFooter>
  );
};