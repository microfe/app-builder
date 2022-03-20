import { Button, Tooltip } from 'antd';
import React from 'react';

import { RedoOutlined, UndoOutlined } from '@ant-design/icons';
import { useEditor } from '@craftjs/core';

interface IUndoRedoProps {

}

export const UndoRedo = (props: React.PropsWithChildren<IUndoRedoProps>) => {
  const { actions, canRedo, canUndo } = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo()
  }));

  return (
    <>
      <Tooltip title="Undo (Ctrl+Z)">
        <Button
          type="text"
          icon={<UndoOutlined />}
          onClick={() => { actions.history.undo(); }}
          disabled={!canUndo}
        />
      </Tooltip>
      <Tooltip title="Redo (Ctrl+Y)">
        <Button
          type="text"
          icon={<RedoOutlined />}
          onClick={() => { actions.history.redo(); }}
          disabled={!canRedo}
        />
      </Tooltip>
    </>
  );
};