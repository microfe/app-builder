import { Button, Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import { i18n } from 'libs/framework';
import React from 'react';
import { useMutation } from 'react-query';

import { onProjectInfoUpdate } from '@/studio/events';
import { IProject, projectService } from '@/studio/services';

interface IProjectFormProps {
  readonly initialValues?: IProject;
}

export const ProjectForm = (props: React.PropsWithChildren<IProjectFormProps>) => {
  const formRef = React.createRef<FormInstance>();

  const updateProject = useMutation(projectService.update);

  const onFinish = async (values: IProject) => {
    const project = await updateProject.mutateAsync({
      ...props.initialValues,
      ...values
    });
    onProjectInfoUpdate.emit(project);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      ref={formRef}
      name="basic"
      layout="vertical"
      initialValues={props.initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label={<b>Name</b>}
        name="name"
        rules={[{ required: true, message: 'Required' }]}
        requiredMark="optional"
      >
        <Input placeholder={i18n('Input project name')} />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={updateProject.isLoading}
        >
          {i18n('Save')}
        </Button>
      </Form.Item>
    </Form>
  );
};