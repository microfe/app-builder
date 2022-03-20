import { message, Upload } from 'antd';
import React, { useContext } from 'react';
import styled from 'styled-components';

import { BuilderContext } from '@/studio/configs';
import { storageService } from '@/studio/services';
import { fileService } from '@/studio/services/fileService';
import { InboxOutlined } from '@ant-design/icons';

import { MediaContext } from './';

const _MediaUpload = styled.div`
`;

interface IMediaUploadProps {

}

export const MediaUpload = (props: React.PropsWithChildren<IMediaUploadProps>) => {
  const { project } = useContext(BuilderContext);
  const mediaContext = useContext(MediaContext);

  return (
    <_MediaUpload>
      <Upload.Dragger
        showUploadList={false}
        beforeUpload={async (file, files) => {
          mediaContext.setContext!({
            ...mediaContext,
            uploadingFiles: files
          });

          const uploadedFiles = await Promise.all(files.map(file => {
            const fileExt = file.name.split('.').pop();
            const fileName = file.uid + '.' + fileExt;
            return fileService.createByUpload(
              {
                alt: file.name,
                projectId: project?.id,
                fileName: fileName,
                fileExt: fileExt,
                type: file.type
              },
              file
            );
          }));

          mediaContext.setContext!({
            ...mediaContext,
            uploadingFiles: undefined,
            allFiles: [...uploadedFiles, ...mediaContext.allFiles!]
          });

          return false;
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload.
        </p>
      </Upload.Dragger>
    </_MediaUpload>
  );
};