import { Alert, Button, Col, Row, Typography } from 'antd';
import { i18n } from 'libs/framework';
import React, { useContext, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';

import { ConfirmModal } from '@/_shared/components';
import { BuilderContext } from '@/studio/configs';
import { fileService } from '@/studio/services/fileService';
import { DeleteOutlined } from '@ant-design/icons';

import { MediaContext } from './';
import { MediaFileItem } from './MediaFileItem';

const _MediaFileList = styled.div`
  .media-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    word-wrap: break-word;
    border-radius: 2px;
    margin-bottom: 24px;
  }
`;

interface IMediaFileListProps {
}

export const MediaFileList = (props: React.PropsWithChildren<IMediaFileListProps>) => {
  const { project } = useContext(BuilderContext);
  const mediaContext = useContext(MediaContext);

  const filesQuery = useQuery('MEDIA_FILE_LIST', () => fileService.getMany({ projectId: project!.id!, }));
  const deleteFiles = useMutation(fileService.deleteMany);

  useEffect(
    () => {
      if (!filesQuery.data) {
        return;
      }

      mediaContext.setContext!({
        ...mediaContext,
        allFiles: [...filesQuery.data]
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filesQuery.data]
  );

  if (!mediaContext.allFiles?.length) {
    return (
      <_MediaFileList>
        <Typography.Paragraph type="secondary">
          {i18n('No files have been uploaded')}
        </Typography.Paragraph>
      </_MediaFileList>
    );
  }

  return (
    <_MediaFileList>
      <div className="media-actions">
        <ConfirmModal
          title={i18n('Delete these files?')}
          onOk={async () => {
            await deleteFiles.mutateAsync(mediaContext.selectedFiles!);

            const isRemoveEditingFile = mediaContext.selectedFiles?.includes(mediaContext.editingFile!);

            mediaContext.setContext!({
              ...mediaContext,
              allFiles: mediaContext.allFiles?.filter(o => !mediaContext.selectedFiles?.includes(o)),
              selectedFiles: [],
              editingFile: !isRemoveEditingFile ? mediaContext.editingFile : undefined
            });
          }}
        >
          <Button
            icon={<DeleteOutlined />}
            disabled={!mediaContext.selectedFiles?.length}
            danger={true}
          >
            Delete {mediaContext.selectedFiles?.length}
          </Button>
        </ConfirmModal>
      </div>
      <Row gutter={[6, 6]}>
        {
          mediaContext.uploadingFiles?.map((o, i) => (
            <Col key={i} xs={6}>
              <MediaFileItem fileData={null} previewFile={o} />
            </Col>
          ))
        }
        {mediaContext.allFiles?.map(o => {
          return (
            <Col key={o.id!} xs={6}>
              <MediaFileItem fileData={o} />
            </Col>
          );
        })}
      </Row>
    </_MediaFileList>
  );
};
