import { Col, Modal, Row, Typography } from 'antd';
import { i18n } from 'libs/framework';
import React from 'react';
import styled from 'styled-components';

import { grayColors } from '@/_shared/colors';

import { ProjectGetStarted } from './project-get-started';
import { ProjectList } from './project-list';

const _ProjectSelect = styled.div`
  z-index: 9999;
  .backdrop {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: ${grayColors.gray1};
    opacity: 0.3;
  }
`;

interface IProjectSelectProps {
  readonly isOpen: boolean;
}

export const ProjectSelect = (props: React.PropsWithChildren<IProjectSelectProps>) => {
  return (
    <_ProjectSelect>
      <Modal
        title={<img src="/static/logo.png" style={{ height: '45px' }} alt="webbench logo" />}
        visible={props.isOpen}
        closable={false}
        footer={null}
        maskClosable={false}
        width={600}
        className="modal-no-header-border"
      >
        <Row gutter={12}>
          <Col xs={12}>
            <ProjectList />
          </Col>
          <Col xs={12}>
            <Typography.Paragraph>{i18n('Get started')}</Typography.Paragraph>
            <ProjectGetStarted />
          </Col>
        </Row>
      </Modal>
    </_ProjectSelect>
  );
};