import { useNode } from 'libs/@craftjs/core';
import React from 'react';

import { onOpenMediaWindow } from '@/studio/events';
import { CssSettings } from '@/studio/widgets/settings';

import { Resizer } from '../layout/Resizer';

interface IImgProps {
  readonly src?: string;
  readonly style?: React.CSSProperties;
}

export const Img = (props: IImgProps) => {
  const { actions: { setProp } } = useNode();

  return (
    <Resizer
      style={props.style}
    >
      <img
        style={{ height: 'auto', width: '100%' }}
        src={props.src}
        onDoubleClick={() => {
          onOpenMediaWindow.emit({
            selectModel: 'single',
            onSelect: (files) => {
              const selectedFile = files[0];
              if (!selectedFile) {
                return;
              }

              setProp((props) => { props.src = selectedFile.url; });
            }
          });
        }}
      />
    </Resizer>
  );
};

const defaultProps: Partial<IImgProps> = {
  src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik0yLjI4IDNMMSA0LjI3bDIgMlYxOWMwIDEuMS45IDIgMiAyaDEyLjczbDIgMkwyMSAyMS43MiAyLjI4IDNtMi41NSAwTDIxIDE5LjE3VjVhMiAyIDAgMCAwLTItMkg0LjgzTTguNSAxMy41bDIuNSAzIDEtMS4yNUwxNC43MyAxOEg1bDMuNS00LjV6Ij48L3BhdGg+CiAgICAgIDwvc3ZnPg==',
  style: {
    width: '100px',
    height: '100px'
  }
};

Img.craft = {
  displayName: 'Image',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: CssSettings,
  }
};