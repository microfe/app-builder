import { useMount } from 'ahooks';
import React, { useRef } from 'react';
import styled from 'styled-components';

const baseHeight = 32;

const _OptionBar = styled.div`
    --rtb-button-height: ${baseHeight}px;

    position: absolute;
    min-width: var(--rtb-button-height);
    min-height: var(--rtb-button-height);

    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 10px 0 rgb(0 6 36 / 20%);
`;

interface IOptionBarProps {

}

export const OptionBar = (props: React.PropsWithChildren<IOptionBarProps>) => {
  const { } = props;

  const elementRef = useRef(null);

  const [topOrBottom, setTopOrBottom] = React.useState('top');

  useMount(() => {
    const isVisibleTop = isElementVisible(elementRef.current);
    if (!isVisibleTop) {
      setTopOrBottom('bottom');
    }
  });

  return (
    <_OptionBar ref={elementRef} style={{
      top: topOrBottom === 'top' ? '0px' : 'unset',
      bottom: topOrBottom === 'bottom' ? '0px' : 'unset',
      transform: topOrBottom === 'top' ? 'translateY(-100%)' : 'translateY(100%)'
    }}>
      {props.children}
    </_OptionBar>
  );
};

function isElementVisible(el) {
  const rect = el.getBoundingClientRect(),
    vWidth = el.ownerDocument.documentElement.clientWidth,
    vHeight = el.ownerDocument.documentElement.clientHeight,
    efp = function (x, y) { return el.ownerDocument.elementFromPoint(x, y) };

  // Return false if it's not in the viewport
  if (rect.right < 0 || rect.bottom < 0
    || rect.left > vWidth || rect.top > vHeight)
    return false;

  // Return true if any of its four corners are visible
  return (
    el.contains(efp(rect.left, rect.top))
    || el.contains(efp(rect.right, rect.top))
    || el.contains(efp(rect.right, rect.bottom))
    || el.contains(efp(rect.left, rect.bottom))
  );
}