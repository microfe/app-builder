import { Button, Popover, Select } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { MoreOutlined } from '@ant-design/icons';

import { BrowserFrameBody, Save } from './browser-frame';
import { UndoRedo } from './browser-frame/UndoRedo';

const _BrowserFrame = styled.div`
  border: 1px solid #e9e9ea;
  height: 100%;
  overflow: hidden;
  background: white;

  .browser-frame-top {
    background: #e9e9ea;
    height: 42px;
    display: flex;
    align-items: center;
    padding: 6px 12px;
    box-sizing: border-box;
  }
  .browser-frame-bottom-crop {
    border-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .browser-frame-button {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 6px;
    flex-shrink: 0;
  }
  .browser-frame-button-red {
    background: rgb(242, 95, 88);
  }
  .browser-frame-button-yellow {
    background: rgb(251, 190, 60);
  }
  .browser-frame-button-green {
    background: rgb(88, 203, 66);
  }
  .browser-frame-address {
    text-align: left;
    background: #fff;
    height: 26px;
    border-radius: 13px;
    line-height: 26px;
    font-size: 14px;
    color: #555;
    flex-grow: 1;
    margin-left: 8px;
    margin-right: 15px;
    padding: 0 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .browser-frame-select {
    width: 100%;
  }
  .browser-frame-body {
    width: 100%;
    height: calc(100% - 41px);
    border: none;
  }
`;

interface IBrowserFrameProps {
  url?: string;
  children: React.ReactNode;
}

export const BrowserFrame = (props: React.PropsWithChildren<IBrowserFrameProps>) => {
  return (
    <_BrowserFrame id="browserFrame">
      <div className="browser-frame-top">
        <div className="browser-frame-button browser-frame-button-red" />
        <div className="browser-frame-button browser-frame-button-yellow" />
        <div className="browser-frame-button browser-frame-button-green" />
        <div className="browser-frame-address">
          <Select
            className="browser-frame-select"
            size="small"
            bordered={false}
            value={props.url}
            showArrow={false}
            showSearch={true}
          >

          </Select>
        </div>
        <UndoRedo />
        <Save />
        <Popover
          placement="bottomRight"
          content="Popover "
        >
          <Button
            type="text"
            icon={<MoreOutlined />}
          />
        </Popover>
      </div>
      <BrowserFrameBody
        className="browser-frame-body"
      >
        <>
          {props.children}
        </>
      </BrowserFrameBody>
    </_BrowserFrame>
  );
};