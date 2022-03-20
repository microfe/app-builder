import { Alert, Button, Typography } from 'antd';
import { i18n } from 'libs/framework';
import React from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';

import { ConfirmModal } from '@/_shared/components';
import { onProjectDelete } from '@/studio/events';
import { IProject, projectService } from '@/studio/services';

const _ProjectDangerZone = styled.div`
  .danger-zone-content {
    display: flex;
  }
  .danger-zone-message {
    flex-grow: 1;
  }
`;

interface IProjectDangerZoneProps {
  readonly project: IProject;
}

export const ProjectDangerZone = (props: React.PropsWithChildren<IProjectDangerZoneProps>) => {

  const deleteProject = useMutation(projectService.delete);

  return (
    <_ProjectDangerZone>
      <Alert
        type="warning"
        message={
          <div className="danger-zone-content" style={{ display: 'flex' }}>
            <div className="danger-zone-message">
              <Typography.Title type="danger" level={5}>
                {i18n('Delete this project')}
              </Typography.Title>
              <Typography.Text>
                {i18n('Once you delete a project, there is no going back. Please be certain.')}
              </Typography.Text>
            </div>
            <div>
              <ConfirmModal
                title={i18n('Are you absolutely sure?')}
                content={i18n('This action cannot be undone.')}
                onOk={async () => {
                  await deleteProject.mutateAsync(props.project);
                  onProjectDelete.emit();
                }}
                okText={i18n('I don\'t need it anymore!')}
              >
                <Button
                  danger={true}
                >
                  {i18n('Delete')}
                </Button>
              </ConfirmModal>
            </div>
          </div>}
      />
    </_ProjectDangerZone>
  );
};