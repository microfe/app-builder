import { Button, Spin, Typography } from 'antd';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { AspectRatio } from 'react-aspect-ratio';
import styled from 'styled-components';

import { grayColors } from '@/_shared/colors';
import { IFileData } from '@/studio/services/fileService';
import { EditOutlined } from '@ant-design/icons';

import { MediaContext } from './';

const _MediaFileItem = styled.div`
  background-color: #fafafa;
  border: 1px solid ${grayColors.gray1};
  position: relative;
  padding-bottom: 100%;
  width: 100%;
  overflow: hidden;

  &.selected {
    border-color: var(--primary-6);
    transform: scale(0.9);
  }
  &.editting {
    .edit-btn {
      display: block!important;
    }
  }
  &:hover {
    .edit-btn {
      display: block!important;
    }
    .file-alt {
      opacity: 1!important;
    }
  }
  
  .file-wrapper {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
    text-align: center;
  }

  .file-alt {
    position: absolute;
    bottom: 0;
    left:  0;
    padding: 6px;
    background-color: #f0f0f0;
    width: 100%;
    font-size: small;
    opacity: 0;
  }

  .edit-btn {
    display: none;
    position: absolute;
    top: 6px;
    right: 6px;
  }
`;

interface IMediaFileItemProps {
  readonly fileData: IFileData | null;
  readonly previewFile?: File;
}

export const MediaFileItem = (props: React.PropsWithChildren<IMediaFileItemProps>) => {
  const mediaContext = useContext(MediaContext);

  if (props.fileData == null) {
    return (
      <_MediaFileItem>
        <div className="file-wrapper">
          <Spin spinning={true} />
        </div>
      </_MediaFileItem>
    );
  }

  const isSelected = !!mediaContext.selectedFiles?.find(o => o.id == props.fileData!.id);
  const isEditting = mediaContext.editingFile?.id === props.fileData.id;
  return (
    <_MediaFileItem
      className={classNames({ 'selected': isSelected, 'editting': isEditting })}
      onClick={() => {
        if (isSelected) {
          mediaContext.setContext!({
            ...mediaContext,
            selectedFiles: mediaContext.selectedFiles?.filter(o => o.id !== props.fileData!.id)
          });

          return;
        }

        mediaContext.setContext!({
          ...mediaContext,
          selectedFiles:
            mediaContext.selectMode === 'single'
              ? [props.fileData!]
              : [...(mediaContext.selectedFiles ?? []), props.fileData!]
        });
      }}
    >
      <div className="file-wrapper">
        {
          props.fileData.type?.startsWith('image')
            ? (
              <AspectRatio ratio={`${props.fileData.width}/${props.fileData.height}`}>
                <img src={props.fileData.url} />
              </AspectRatio>
            )
            :
            <Typography.Text>.{props.fileData.fileExt}</Typography.Text>
        }
      </div>
      <div className="file-alt">
        <Typography.Text>{props.fileData.alt}</Typography.Text>
      </div>
      <Button
        type={isEditting ? 'primary' : 'default'}
        className="edit-btn"
        icon={<EditOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          if (isEditting) {
            mediaContext.setContext!({
              ...mediaContext,
              editingFile: undefined
            });

            return;
          }

          mediaContext.setContext!({
            ...mediaContext,
            editingFile: props.fileData!
          });
        }}
      />
    </_MediaFileItem>
  );
};