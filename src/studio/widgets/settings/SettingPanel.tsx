import { Typography } from 'antd';
import { i18n } from 'libs/framework';
import React from 'react';
import styled from 'styled-components';

import { useEditor } from '@craftjs/core';

const _SettingPanel = styled.div`
`;

interface ISettingPanelProps {

}

export const SettingPanel = (props: React.PropsWithChildren<ISettingPanelProps>) => {
  const { active, related } = useEditor((state, query) => {
    // TODO: handle multiple selected elements
    const currentlySelectedNodeId = query.getEvent('selected').first();
    return {
      active: currentlySelectedNodeId,
      related:
        currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related,
    };
  });

  return (
    <_SettingPanel>
      {active && related.toolbar && React.createElement(related.toolbar)}
      {!active && <Typography.Text type="secondary" italic>{i18n('Click on a component to start editing.')}</Typography.Text>}
    </_SettingPanel>
  );
};