import { Collapse } from 'antd';
import { i18n } from 'libs/framework';
import React from 'react';

import { SidePanelTemplate } from './_styled';

interface ISideStyleProps {
  readonly hiden: () => void;
}

export const SideStyle = (props: React.PropsWithChildren<ISideStyleProps>) => {
  const { } = props;

  return (
    <SidePanelTemplate title={i18n('Make It Your Own')} onClose={props.hiden}>
      <Collapse bordered={false} defaultActiveKey={['1']} accordion={true}>
        <Collapse.Panel header="Typhography" key="1">
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.
        </Collapse.Panel>
        <Collapse.Panel header="Colors" key="2">
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.
        </Collapse.Panel>
      </Collapse>
    </SidePanelTemplate>
  );
};