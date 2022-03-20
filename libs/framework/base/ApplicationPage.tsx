import React from 'react';
import { RouteChildrenProps } from 'react-router-dom';

import { IApplicationRouteInfo } from '../Types';

export class ApplicationPage<P = Record<string, unknown>, S = Record<string, unknown>> extends React.Component<RouteChildrenProps<P, unknown>, S> {
  public static routeInfo?: IApplicationRouteInfo;

  constructor(props) {
    super(props);
    window.scrollTo({
      behavior: 'auto',
      top: 0
    });
  }
}
