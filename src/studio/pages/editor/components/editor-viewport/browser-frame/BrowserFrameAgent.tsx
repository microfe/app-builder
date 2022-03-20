import React, { useEffect } from 'react';
import { useFrame } from 'react-frame-component';

import { onFrameKeyDown } from '@/studio/events';

interface IBrowserFrameAgentProps {

}

export const BrowserFrameAgent = (props: React.PropsWithChildren<IBrowserFrameAgentProps>) => {
  const { document } = useFrame();

  useEffect(
    () => {
      if (!document) {
        return;
      }

      const onkeyDown = (e: KeyboardEvent) => {
        onFrameKeyDown.emit({
          key: e.key,
          altKey: e.altKey,
          ctrlKey: e.ctrlKey
        });

        // OVERWRITE CMD+S / CTRL+S IN JAVASCRIPT
        if ((e.ctrlKey || e.metaKey) && e.key == 's') {
          e.preventDefault();
        }
      };

      document.addEventListener('keydown', onkeyDown, false);
      return () => document.removeEventListener('keydown', onkeyDown, false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return null;
};