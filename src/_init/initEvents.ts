import { onKeyDown } from '@/_shared';

export const initEvents = () => {
  document.addEventListener('keydown', (e) => {
    onKeyDown.emit({
      key: e.key,
      altKey: e.altKey,
      ctrlKey: e.ctrlKey
    });

    // OVERWRITE CMD+S / CTRL+S IN JAVASCRIPT
    if ((e.ctrlKey || e.metaKey) && e.key == 's') {
      e.preventDefault();
    }
  });
};