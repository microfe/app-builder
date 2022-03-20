import { Typography } from 'antd';
import { formatDate } from 'libs/framework';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import { grayColors } from '@/_shared/colors';
import { onProjectLoad } from '@/studio/events';
import { IProject } from '@/studio/services';
import { BookOutlined } from '@ant-design/icons';

const _ProjectItem = styled.div`
  padding: 12px;
  cursor: pointer;
  display: flex;
  &:hover {
    background-color: ${grayColors.gray1};
  }
  .icon {
    padding-right: 12px;
    font-size: 18px;
  }
`;

interface IProjectItemProps {
  readonly project: IProject;
}

export const ProjectItem = (props: React.PropsWithChildren<IProjectItemProps>) => {

  const onClick = useCallback(
    () => {
      onProjectLoad.emit(props.project);
    },
    [props.project]
  );

  return (
    <_ProjectItem onClick={onClick}>
      <div className="icon"><BookOutlined /></div>
      <div>
        <Typography.Text strong>{props.project.name}</Typography.Text>
        <div>
          <Typography.Text type="secondary">
            <small>{formatDate(props.project.lastOpened, 'DD/MM/YYYY HH:mm')}</small>
          </Typography.Text>
        </div>
      </div>
    </_ProjectItem>
  );
};