import { useEditor } from 'libs/@craftjs/core';
import React from 'react';
import styled from 'styled-components';

export const _SideWidgetItem = styled.div`
  border-radius: 8px;
  cursor: pointer;
  height: 100px;
  margin-bottom: 16px;
  overflow: hidden;
  padding: 16px;
  position: relative;
  -webkit-transition: -webkit-box-shadow .2s linear;
  transition: -webkit-box-shadow .2s linear;
  transition: box-shadow .2s linear;
  transition: box-shadow .2s linear,-webkit-box-shadow .2s linear;
  background: linear-gradient(135deg, var(--primary-5) 0%, var(--primary-6) 100%);
  &:hover {
    box-shadow: 0 5px 34px rgb(0 0 0 / 23%);
    z-index: 10;
  }
  .name {
    color: #fff;
    line-height: 20px;
    margin-bottom: 6px;
  }
  .description {
    color: #fff;
    font-size: small;
    opacity: 0.85;
    line-height: 1.2;
  }
  .icon {
    color: #fff;
    font-size: 85px;
    right: 1px;
    opacity: .1;
    position: absolute;
    bottom: -30px;
  }
`;

interface ISideWidgetItemProps {
  readonly name: string;
  readonly description: string;
  readonly icon: JSX.Element;
  readonly renderElement: () => JSX.Element;
  readonly onDrag: () => void;
}

export const SideWidgetItem = (props: React.PropsWithChildren<ISideWidgetItemProps>) => {
  const { connectors } = useEditor();

  return (
    <_SideWidgetItem
      ref={ref => props.renderElement && connectors.create(ref!, props.renderElement())}
      onDrag={props.onDrag}
    >
      <div className="name">{props.name}</div>
      <div className="description">{props.description}</div>
      <div className="icon">
        {props.icon}
      </div>
    </_SideWidgetItem>
  );
};