import {
  Button,
  Descriptions,
  Form,
  FormInstance,
  Input,
  Typography
} from 'antd';
import { defaultDateTimeFormat, formatDate, i18n } from 'libs/framework';
import React, { useContext } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';

import { fileService, IFileData } from '@/studio/services/fileService';

import { MediaContext } from './';

const _MediaForm = styled.div`
  padding: 24px;
  background-color: #f0f0f0;
  height: 100%;
`;

interface IMediaFormProps {
}

export const MediaForm = (props: React.PropsWithChildren<IMediaFormProps>) => {
  const mediaContext = useContext(MediaContext);

  const formRef = React.createRef<FormInstance>();

  const updateFileData = useMutation(fileService.update);

  const onFinish = async (values: IFileData) => {
    const updatedFileData = await updateFileData.mutateAsync({
      ...mediaContext.editingFile,
      ...values
    });

    mediaContext.setContext!({
      ...mediaContext,
      allFiles: mediaContext.allFiles?.map(o => o.id == updatedFileData.id ? updatedFileData : o)
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <_MediaForm>
      <Typography.Title level={5}>
        {i18n('File data')}
      </Typography.Title>
      {
        !mediaContext.editingFile && (
          <Typography.Text type="secondary" italic={true}>
            {i18n('Click edit a file to update the file data')}
          </Typography.Text>
        )
      }
      {
        mediaContext.editingFile && (
          <Descriptions column={1}>
            <Descriptions.Item label="Url">
              <a href={mediaContext.editingFile?.url} target="_blank" rel="noreferrer">{mediaContext.editingFile?.url}</a>
            </Descriptions.Item>
            <Descriptions.Item label="Created">
              {formatDate(mediaContext.editingFile.created, defaultDateTimeFormat)}
            </Descriptions.Item>
          </Descriptions>
        )
      }
      {
        mediaContext.editingFile && (
          <Form
            key={mediaContext.editingFile?.id}
            ref={formRef}
            name="basic"
            layout="vertical"
            initialValues={mediaContext.editingFile}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Alt:"
              name={nameof<IFileData>(o => o.alt)}
            >
              <Input
                placeholder={i18n('Alt')}
                readOnly={!mediaContext.editingFile}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={updateFileData.isLoading}
                disabled={!mediaContext.editingFile}
              >
                {i18n('Save')}
              </Button>
            </Form.Item>
          </Form>
        )
      }
    </_MediaForm>
  );
};