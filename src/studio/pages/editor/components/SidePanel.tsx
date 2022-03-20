import classNames from 'classnames';
import { i18n } from 'libs/framework';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import { breakpoints } from '@/_shared/breakpoints';
import {
  AppstoreAddOutlined,
  BgColorsOutlined,
  SettingOutlined
} from '@ant-design/icons';

import {
  SidePanelItem,
  SideSettings,
  SideStyle,
  SideWidgets
} from './side-panel';

const _SidePanel = styled.div`
  width: var(--side-width);
  height: 100%;
  position: relative;
  .triggers {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    background-color: #FFF;
    z-index: 99;
    position: relative;
  }

  .panels {
    position: absolute;
    top: 0;
    height: 100%;
    z-index: 9;

    @media ${breakpoints.mobile} {
      left: 0;
      z-index: 100;
    }
    @media ${breakpoints.mobileL} {
      left: var(--side-width);
      z-index: 9;
    }
  }

  .panel {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    background-color: var(--side-active-bg);
    transition: right .4s ease-in-out;

    @media ${breakpoints.mobile} {
      width: 100vw;
    }

    @media ${breakpoints.mobileL} {
      width: var(--side-panel-width);
    }

    &.visibled {
      right: calc(0px - var(--side-panel-width));
      z-index: 1;
      @media ${breakpoints.mobile} {
        right: -100vw;
      }

      @media ${breakpoints.mobileL} {
        right: calc(0px - var(--side-panel-width));
      }
    }
  }
`;

interface ISidePanelProps {

}

export const SidePanel = (props: React.PropsWithChildren<ISidePanelProps>) => {

  const [selectedTab, setselectedTab] = React.useState<string | null>(null);

  const onItemClick = useCallback(
    (tabKey) => {
      if (tabKey == selectedTab) {
        return void setselectedTab(null);
      }
      setselectedTab(tabKey);
    },
    [selectedTab]
  );

  return (
    <_SidePanel>
      <div className="triggers">
        <SidePanelItem
          icon={<AppstoreAddOutlined />}
          label={i18n('Widgets')}
          onClick={() => onItemClick('widgets')}
          isSelected={selectedTab == 'widgets'}
        />
        <SidePanelItem
          icon={<BgColorsOutlined />}
          label={i18n('Style')}
          onClick={() => onItemClick('style')}
          isSelected={selectedTab == 'style'}
        />
        <SidePanelItem
          icon={<SettingOutlined />}
          label={i18n('Settings')}
          onClick={() => onItemClick('settings')}
          isSelected={selectedTab == 'settings'}
        />
      </div>
      <div className="panels">
        <div className={classNames('panel', { visibled: selectedTab == 'widgets' })}>
          <SideWidgets hiden={() => setselectedTab(null)} />
        </div>
        <div className={classNames('panel', { visibled: selectedTab == 'style' })}>
          <SideStyle hiden={() => setselectedTab(null)} />
        </div>
        <div className={classNames('panel', { visibled: selectedTab == 'settings' })}>
          <SideSettings hiden={() => setselectedTab(null)} />
        </div>
      </div>
    </_SidePanel>
  );
};