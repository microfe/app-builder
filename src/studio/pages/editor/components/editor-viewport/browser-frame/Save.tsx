import { Button, Tooltip } from 'antd';
import React, { useCallback, useContext } from 'react';
import { useMutation } from 'react-query';

import { StudioContext } from '@/studio/configs';
import { onPageSave, onRequestSavePage } from '@/studio/events';
import { pageService } from '@/studio/services';
import { CheckOutlined, SaveOutlined } from '@ant-design/icons';
import { useEditor } from '@craftjs/core';

interface ISaveProps {

}

export const Save = (props: React.PropsWithChildren<ISaveProps>) => {
  const { serialized } = useEditor((state, query) => ({ serialized: query.serialize() }));
  const { activedPage } = useContext(StudioContext);
  const savePageContent = useMutation(pageService.updateContent, { onSuccess: onPageSave.emit });

  const isDisable = activedPage?.content == serialized;

  const doSave = useCallback(
    () => {
      savePageContent.mutate({ ...activedPage, content: serialized });
    },
    [activedPage, savePageContent, serialized]
  );

  React.useEffect(
    () => {
      onRequestSavePage.listen(doSave);
      return () => onRequestSavePage.unlisten(doSave);
    },
    [doSave]
  );

  return (
    <Tooltip title="Save (Ctrl+S)">
      <Button
        type="text"
        icon={isDisable ? <CheckOutlined /> : <SaveOutlined />}
        onClick={doSave}
        disabled={isDisable}
        loading={savePageContent.isLoading}
      />
    </Tooltip>
  );
};