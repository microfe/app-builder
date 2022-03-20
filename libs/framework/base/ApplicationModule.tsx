import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { IApplicationModule } from '../Types';
import { ApplicationRouteGuard } from './ApplicationRouteGuard';

export interface IApplicationModuleProps {
  readonly module: IApplicationModule;
}

export function ApplicationModule(props: React.PropsWithChildren<IApplicationModuleProps>) {
  const {
    module
  } = props;

  return (
    <Routes>
      {module.pages.map((page) => {
        const routeInfo = page.routeInfo!;

        return (
          <Route
            key={routeInfo.path}
            path={routeInfo.path}
            element={(
              <ApplicationRouteGuard
                routeInfo={routeInfo}
                page={page}
                routeProps={{}}
              />
            )}
          />
        );
      })}
      {module.defaultUrl && (
        <Route>
          {() => {
            return <Navigate to={module.defaultUrl} />;
          }}
        </Route>
      )}
    </Routes>
  );
}