import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { IApplicationModule } from '../Types';
import { ApplicationModule } from './ApplicationModule';
import { ApplicationState } from './ApplicationState';

interface IApplicationProps {
  readonly modules: IApplicationModule[];
  readonly defaultLayout?: React.ComponentType<unknown>;
}

export const Application = (props: IApplicationProps) => {
  const { modules } = props;

  for (const appModule of modules) {
    ApplicationState.registerModule(appModule);
  }

  return (
    <BrowserRouter>
      <Routes>
        {modules.map((appModule) => {
          return (
            <Route
              key={appModule.path}
              path={appModule.path}
              element={(
                <appModule.mount>
                  {() => <ApplicationModule module={appModule} />}
                </appModule.mount>
              )}
            >
            </Route>
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};
