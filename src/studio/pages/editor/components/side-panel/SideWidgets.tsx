import { Col, Collapse, Row } from 'antd';
import { Element } from 'libs/@craftjs/core';
import { i18n } from 'libs/framework';
import React from 'react';

import {
  Container,
  Img,
  RichText,
  WidgetColumn,
  WidgetLink
} from '@/studio/widgets';
import { WidgetButton } from '@/studio/widgets/basic/button';
import {
  BorderOutlined,
  ColumnWidthOutlined,
  FontSizeOutlined,
  LinkedinFilled,
  PictureOutlined,
  RocketOutlined
} from '@ant-design/icons';

import { SidePanelTemplate } from './_styled';
import { SideWidgetItem } from './side-widgets';

interface ISideWidgetsProps {
  readonly hiden: () => void;
}

export const SideWidgets = (props: React.PropsWithChildren<ISideWidgetsProps>) => {
  return (
    <SidePanelTemplate title={i18n('Drag to add')} onClose={props.hiden}>
      <div>
        <Collapse bordered={false} defaultActiveKey={['1']} accordion={true}>
          <Collapse.Panel header="Basic Widgets" key="1">
            <Row gutter={12}>
              <Col xs={12}>
                <SideWidgetItem
                  name="Text"
                  description="Write your message"
                  icon={<FontSizeOutlined />}
                  onDrag={props.hiden}
                  renderElement={() => <RichText />}
                />
              </Col>
              <Col xs={12}>
                <SideWidgetItem
                  name="Image"
                  description="Display a single photo"
                  icon={<PictureOutlined />}
                  onDrag={props.hiden}
                  renderElement={() => <Img />}
                />
              </Col>
              <Col xs={12}>
                <SideWidgetItem
                  name="Link"
                  description="Goto some where"
                  icon={<LinkedinFilled />}
                  onDrag={props.hiden}
                  renderElement={() => <WidgetLink />}
                />
              </Col>
              <Col xs={12}>
                <SideWidgetItem
                  name="Button"
                  description="To trigger an operation"
                  icon={<RocketOutlined />}
                  onDrag={props.hiden}
                  renderElement={() => <WidgetButton>Button</WidgetButton>}
                />
              </Col>
              <Col xs={12}>
                <SideWidgetItem
                  name="Container"
                  description="Used for holding something"
                  icon={<BorderOutlined />}
                  renderElement={() => <Element is={Container} canvas />}
                  onDrag={props.hiden}
                />
              </Col>
              <Col xs={12}>
                <SideWidgetItem
                  name="Column"
                  description="Divide the space in the box"
                  icon={<ColumnWidthOutlined />}
                  renderElement={() => <WidgetColumn />}
                  onDrag={props.hiden}
                />
              </Col>
            </Row>
          </Collapse.Panel>
          <Collapse.Panel header="Advanced Display" key="2">
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.
          </Collapse.Panel>
          <Collapse.Panel header="Form and Inputs" key="3">
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.
          </Collapse.Panel>
        </Collapse>
      </div >
    </SidePanelTemplate>
  );
};