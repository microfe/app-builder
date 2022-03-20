import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { DoubleLeftOutlined } from '@ant-design/icons';

export const _SidePanelTemplate = styled.div`
  position: relative;
  label {
    color: var(--contrast-7);
  }
  .title {
    padding: 12px 16px;
    text-transform: uppercase;
    color: var(--side-active-color);
    opacity: 0.8;
    font-size: 12px;
  }
  .ant-collapse {
    background-color: transparent!important;
    .ant-collapse-header {
      color: var(--side-active-color);
      text-transform: uppercase;
     
    }
    .ant-collapse-content {
      color: var(--side-active-color);
    }
    .ant-collapse-item {
      border-bottom: 1px solid var(--side-highlight);
       &:hover {
        background: linear-gradient(180deg,var(--side-highlight),transparent 10%,transparent 90%,var(--side-highlight));
      }
    }
    .ant-collapse-item-active {
      background: linear-gradient(180deg,var(--side-highlight),transparent 10%,transparent 90%,var(--side-highlight));
    }
  }
  .close-btn {
    position: absolute;
    right: 0;
    top: 0;
    width: 60px;
    color: var(--side-active-color);
  }
`;

export interface ISidePanelTemplateProps {
  readonly title: string;
  readonly onClose: () => void;
}

export const SidePanelTemplate = (props: React.PropsWithChildren<ISidePanelTemplateProps>) => {
  return (
    <_SidePanelTemplate>
      <div className="title">
        {props.title}
      </div>
      <Button onClick={props.onClose} className="close-btn" icon={<DoubleLeftOutlined />} size="large" type="text" />
      {props.children}
    </_SidePanelTemplate>
  );
};