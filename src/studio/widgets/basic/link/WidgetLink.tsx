import React from 'react';

interface IWidgetLinkProps {
  readonly href?: string;
}

export const WidgetLink = (props: React.PropsWithChildren<IWidgetLinkProps>) => {
  return (
    <a href={props.href}>
      {props.href}
    </a>
  );
};

const defaultProps = {
  href: location.href
};

WidgetLink.craft = {
  displayName: 'Link',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
};
