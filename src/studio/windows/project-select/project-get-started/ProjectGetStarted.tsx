import { i18n } from 'libs/framework';
import React from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';

import { onProjectLoad } from '@/studio/events';
import { projectService } from '@/studio/services';
import {
  AlignLeftOutlined,
  FolderAddOutlined,
  GithubOutlined,
  LoadingOutlined
} from '@ant-design/icons';

import { ProjectStartedItem } from './ProjectStartedItem';

const _ProjectGetStarted = styled.div`
`;

interface IProjectGetStartedProps {

}

export const ProjectGetStarted = (props: React.PropsWithChildren<IProjectGetStartedProps>) => {
  const createNewProject = useMutation(projectService.create, { onSuccess: onProjectLoad.emit });

  return (
    <_ProjectGetStarted className="project-get-stated">
      <ProjectStartedItem
        icon={createNewProject.isLoading ? <LoadingOutlined spin={true} /> : <FolderAddOutlined />}
        title={i18n('Create a new project')}
        description={i18n('Start over again')}
        onClick={() => { createNewProject.mutate({ name: 'Untitle Project', lastOpened: (new Date).toISOString() }); }}
      />

      <ProjectStartedItem icon={<AlignLeftOutlined />} title={i18n('Need help?')} description={i18n('Visit document page')} />
      <ProjectStartedItem icon={<GithubOutlined />} title={i18n('Github')} description={i18n('Give it a start!')} />
    </_ProjectGetStarted>
  );
};