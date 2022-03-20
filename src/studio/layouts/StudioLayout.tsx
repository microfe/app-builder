import React from 'react';
import styled from 'styled-components';

import {
  StudioLayoutBody,
  StudioLayoutFooter,
  StudioLayoutHeader
} from './studio-layout';

const _StudioLayout = styled.div`
    background:
        linear-gradient(-90deg, rgba(0,0,0,.05) 1px, transparent 1px),
        linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px),
        linear-gradient(-90deg, rgba(0, 0, 0, .04) 1px, transparent 1px),
        linear-gradient(rgba(0,0,0,.04) 1px, transparent 1px),
        linear-gradient(transparent 3px, #e8ecf2 3px, #e8ecf2 78px, transparent 78px),
        linear-gradient(-90deg, #aaa 1px, transparent 1px),
        linear-gradient(-90deg, transparent 3px, #e8ecf2 3px, #e8ecf2 78px, transparent 78px),
        linear-gradient(#aaa 1px, transparent 1px),
        #e8ecf2;
    background-size:
        8px 8px,
        8px 8px,
        80px 80px,
        80px 80px,
        80px 80px,
        80px 80px,
        80px 80px,
        80px 80px;

  height: 100vh;
`;

interface IStudioLayoutProps {

}

export const StudioLayout = (props: React.PropsWithChildren<IStudioLayoutProps>) => {

  return (
    <_StudioLayout id="StudioLayout">
      <StudioLayoutHeader />
      <StudioLayoutBody>
        {props.children}
      </StudioLayoutBody>
      <StudioLayoutFooter />
    </_StudioLayout>
  );
};