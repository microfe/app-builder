import { Modal } from 'antd';
import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';

interface IConfirmModalProps {
  readonly title: string;
  readonly content?: string;
  readonly onOk: () => void;
  readonly onCancel?: () => void;
  readonly children: JSX.Element;
  readonly okText?: string;
}

export const ConfirmModal = (props: React.PropsWithChildren<IConfirmModalProps>) => {
  const onClick = useCallback(
    () => {
      Modal.confirm({
        title: props.title,
        content: props.content,
        onOk: props.onOk,
        onCancel: props.onCancel,
        okText: props.okText,
        okButtonProps: {
          danger: true
        }
      });
    },
    [props.content, props.onCancel, props.onOk, props.title]
  );

  return React.cloneElement(props.children, { ...props.children.props, onClick: onClick });
};