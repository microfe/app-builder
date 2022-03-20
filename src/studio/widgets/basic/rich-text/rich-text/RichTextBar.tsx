import React from 'react';
import styled from 'styled-components';

import { OptionBar } from '@/studio/widgets/node/OptionBar';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined
} from '@ant-design/icons';

import { RichBarDivider, RichMarkButton, RichSelect } from './rich-text-bar';

const _RichTextBar = styled.div`
font-size: 14px;
  .rich-row {
    display: flex;
    gap: 3px;
  }
`;

interface IRichTextBarProps {

}

export const RichTextBar = (props: React.PropsWithChildren<IRichTextBarProps>) => {
  const { } = props;

  return (
    <OptionBar>
      <_RichTextBar>
        <div className="rich-row">
          <RichSelect>
            <option>H1</option>
            <option>H2</option>
            <option>H3</option>
          </RichSelect>
          <RichBarDivider />
          <RichSelect>
            <option>H1</option>
            <option>H2</option>
            <option>H3</option>
          </RichSelect>
          <RichBarDivider />
          <div>
            <RichMarkButton format="bold" icon={<BoldOutlined />} />
            <RichMarkButton format="italic" icon={<ItalicOutlined />} />
            <RichMarkButton format="underline" icon={<UnderlineOutlined />} />
          </div>
        </div>
        <RichBarDivider type="horizontal" />
        <div className="rich-row">

        </div>
      </_RichTextBar>
    </OptionBar>
  );
};

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};
