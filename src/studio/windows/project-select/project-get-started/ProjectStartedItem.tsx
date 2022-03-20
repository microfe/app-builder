import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { grayColors } from '@/_shared/colors';
import { BookOutlined } from '@ant-design/icons';

const _ProjectStartedItem = styled.div`
  padding: 12px;
  cursor: pointer;
  display: flex;
  background-color: ${grayColors.gray1};
  border: 1px solid transparent;
  margin-bottom: 6px;

  &:hover {
    border: 1px solid ${grayColors.gray5};
  }
  .icon {
    padding-right: 12px;
    font-size: 18px;
  }
`;

interface IProjectStartedItemProps {
  readonly icon: JSX.Element;
  readonly title: string;
  readonly description: string;
  readonly onClick?: () => void;
}

export const ProjectStartedItem = (props: React.PropsWithChildren<IProjectStartedItemProps>) => {

  return (
    <_ProjectStartedItem onClick={props.onClick}>
      <div className="icon">{props.icon}</div>
      <div>
        <Typography.Text strong>{props.title}</Typography.Text>
        <div>
          <Typography.Text type="secondary">
            <small>{props.description}</small>
          </Typography.Text>
        </div>
      </div>
    </_ProjectStartedItem>
  );
};