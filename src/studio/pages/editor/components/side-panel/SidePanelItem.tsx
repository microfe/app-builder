import React from 'react';
import styled from 'styled-components';

const _SidePanelItem = styled.div`
  color: var(--side-active-bg);
  height: var(--side-width);
  width: var(--side-width);
  background-color: #f7f7f7;
  border: 1px solid transparent;
  border-bottom-color: #f0f0f0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: box-shadow .2s linear,-webkit-box-shadow .2s linear;
  &:hover, &.selected {
    border-bottom-color: transparent;
    box-shadow: 0 4px 32px rgb(0 0 0 / 20%);
    z-index: 10;
  }
  &.selected {
    color: white;
    background-color: var(--side-active-bg);
  }
  .icon {
    font-size: 18px;
    margin-bottom: 8px;
  }
  .label {
    font-size: 10px;
    text-transform: uppercase;
  }
`;

interface ISidePanelItemProps {
  readonly icon: JSX.Element;
  readonly label: string;
  readonly onClick: () => void;
  readonly isSelected: boolean;
}

export const SidePanelItem = (props: React.PropsWithChildren<ISidePanelItemProps>) => {
  const { } = props;

  return (
    <_SidePanelItem
      onClick={props.onClick}
      className={props.isSelected ? 'selected' : ''}
    >
      <div className="icon">
        {props.icon}
      </div>
      <span className="label">
        {props.label}
      </span>
    </_SidePanelItem>
  );
};