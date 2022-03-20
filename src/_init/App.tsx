import { Application } from 'libs/framework';
import { IApplicationRootProps } from 'libs/framework';
import * as React from 'react';

export interface IAppProps extends IApplicationRootProps {
}

export const App = (props: IAppProps) => {
  return (
    <>
      <Application modules={props.modules} />
    </>
  );
};