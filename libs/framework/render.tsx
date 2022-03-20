import React from 'react';
import ReactDOM from 'react-dom';

import { ApplicationContext } from './base';
import { setupI18n } from './hooks/setupI18n';
import { CreateTranslatiorProps } from './i18n';
import { IApplicationModule, IApplicationRootProps } from './Types';

interface IApplicationRenderProps {
  readonly container: HTMLElement;
  readonly Root: React.ComponentType<IApplicationRootProps>;
  readonly i18n: CreateTranslatiorProps,
  readonly initRootProps: () => Promise<IApplicationRootProps>;
  readonly modules: IApplicationModule[];
}

export const render = async (props: IApplicationRenderProps) => {
  const { initRootProps, modules, container, i18n, Root } = props;

  setupI18n(i18n);

  const rootProps = await initRootProps();

  ReactDOM.render(
    (
      <ApplicationContext.Provider value={rootProps.initialContext}>
        <Root {...rootProps} modules={modules} />
      </ApplicationContext.Provider>
    ),
    container
  );
};