import { Collapse } from 'antd';
import { i18n } from 'libs/framework';
import React from 'react';

import { SidePanelTemplate } from './_styled';
import { ProjectDangerZone, ProjectForm } from './side-settings';

interface ISideSettingsProps {
  readonly hiden: () => void;
}

export const SideSettings = (props: React.PropsWithChildren<ISideSettingsProps>) => {
  const { } = props;

  return (
    <SidePanelTemplate title={i18n('Settings')} onClose={props.hiden}>
      <Collapse bordered={false} defaultActiveKey={['1']} accordion={true}>
        <Collapse.Panel header="Project" key="1">
          <ProjectForm />
        </Collapse.Panel>
        <Collapse.Panel header="Danger zone" key="2">
          <ProjectDangerZone project={{}} />
        </Collapse.Panel>
      </Collapse>
    </SidePanelTemplate>
  );
};