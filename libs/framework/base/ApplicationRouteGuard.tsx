import React, { Suspense } from 'react';
import { Navigate } from 'react-router';
import { RouteChildrenProps } from 'react-router-dom';

import { deniedUrl } from '../config';
import { ApplicationPageType, IApplicationRouteInfo } from '../Types';
import { ApplicationAccessControl } from './ApplicationAccessControl';

interface IApplicationRouteGuardProps {
  readonly routeInfo: IApplicationRouteInfo;
  readonly page: ApplicationPageType;
  readonly routeProps: RouteChildrenProps;
}

export const ApplicationRouteGuard = (props: IApplicationRouteGuardProps) => {
  const {
    routeInfo,
    page: PageType,
    routeProps
  } = props;

  return (
    <ApplicationAccessControl policies={routeInfo.policies}>
      {(accessResult) => {

        if (typeof accessResult === 'string') {
          return <Navigate to={accessResult} />;
        }

        if (!accessResult) {
          return <Navigate to={deniedUrl} />;
        }

        if (typeof PageType == 'function') {
          return <PageType {...routeProps} />;
        }

        return (
          <Suspense fallback="">
            <PageType.Page {...routeProps} />
          </Suspense>
        );
      }}
    </ApplicationAccessControl>
  );
};