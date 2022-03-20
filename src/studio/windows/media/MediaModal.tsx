import { useMount } from 'ahooks';
import { Button, Col, Modal, Row } from 'antd';
import { i18n } from 'libs/framework';
import React, { useState } from 'react';
import styled from 'styled-components';

import { IOpenMediaPayload, onOpenMediaWindow } from '@/studio/events';

import {
  IMediaContext,
  MediaContext,
  MediaFileList,
  MediaForm,
  MediaUpload
} from './media-modal';

export const _MediaModal = styled.div`
  .media-upload-area {
    margin-bottom: 24px;
  }
`;

interface IMediaManagerProps {

}

export const MediaModal = (props: React.PropsWithChildren<IMediaManagerProps>) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [onSelect, setOnSelect] = React.useState<IOpenMediaPayload['onSelect'] | null>();

  const [contextValue, setContextValue] = React.useState<IMediaContext>({
    selectedFiles: [],
  });

  const handleCancel = () => {
    setIsModalVisible(false);
    setOnSelect(null);
    setContextValue({
      ...contextValue,
      editingFile: undefined,
      selectMode: 'multiple',
      selectedFiles: [],
    });
  };

  React.useEffect(
    () => {
      const showModal = (payload?: IOpenMediaPayload) => {
        if (payload?.onSelect) {
          setOnSelect(() => payload.onSelect);
        }

        if (payload?.selectModel) {
          contextValue.setContext!({
            ...contextValue,
            selectMode: payload.selectModel
          });
        }

        setIsModalVisible(true);
      };

      onOpenMediaWindow.listen(showModal);
      return () => onOpenMediaWindow.unlisten(showModal);
    },
    [contextValue]
  );

  useMount(() => {
    setContextValue({
      ...contextValue,
      setContext: setContextValue
    });
  });

  return (
    <Modal
      title="Media"
      visible={isModalVisible}
      onCancel={handleCancel}
      width={1024}
      footer={
        onSelect ?
          (
            <Button
              onClick={() => {
                onSelect!(contextValue.selectedFiles ?? []);
                handleCancel();
              }}
              type="primary"
              disabled={!contextValue.selectedFiles?.length}
            >
              {i18n('Select')}
            </Button>
          )
          : null
      }
    >
      <MediaContext.Provider value={contextValue}>
        <_MediaModal>
          <Row gutter={24}>
            <Col xs={16}>
              <div>
                <div className="media-upload-area">
                  <MediaUpload />
                </div>
                <div>
                  <MediaFileList />
                </div>
              </div>
            </Col>
            <Col xs={8}>
              <MediaForm />
            </Col>
          </Row>
        </_MediaModal>
      </MediaContext.Provider>
    </Modal>
  );
};