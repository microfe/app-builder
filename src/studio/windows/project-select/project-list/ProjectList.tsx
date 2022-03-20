import { Input, Typography } from 'antd';
import { i18n } from 'libs/framework';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { onProjectDelete } from '@/studio/events';
import { projectService } from '@/studio/services';
import { LoadingOutlined } from '@ant-design/icons';

import { ProjectItem } from './ProjectItem';

const _ProjectList = styled.div`

  .project-search {
    margin-bottom: 12px;
  }
  .project-list {
    height: 270px;
    overflow-y: scroll;
  }
`;

interface IProjectListProps {

}

export const ProjectList = (props: React.PropsWithChildren<IProjectListProps>) => {
  const { } = props;

  const projects = useQuery('PROJECTS', projectService.getMany);

  useEffect(
    () => {
      const projectDeleted = () => {
        projects.refetch();
      };

      onProjectDelete.listen(projectDeleted);

      return () => onProjectDelete.unlisten(projectDeleted);
    },
    [projects]
  );

  return (
    <_ProjectList id="projectList">
      <Typography.Paragraph>Projects</Typography.Paragraph>
      <div className="project-search">
        <Input.Search placeholder="Search recent" />
      </div>
      {!projects.data?.length && <Typography.Paragraph type="secondary">{i18n('No project exist, let\'s create one!')}</Typography.Paragraph>}
      <div className="project-list">
        {projects.isLoading && <LoadingOutlined spin={true} />}
        {projects.data?.map((o) => <ProjectItem key={o.id} project={o} />)}
      </div>
    </_ProjectList>
  );
};