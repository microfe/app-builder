import './index.less';
import './index.scss';

import { render } from 'libs/framework';
import React from 'react';
import { QueryClientProvider } from 'react-query';

import {
  App,
  IAppProps,
  initEvents,
  initFirebase,
  initMoment,
  initRootProps
} from './_init';
import { queryClient, translation } from './_shared';

function AppConfigs(props: IAppProps) {

  return (
    <QueryClientProvider client={queryClient}>
      <App {...props} />
    </QueryClientProvider>
  );
}

export default async () => {
  await initFirebase();
  initMoment();
  initEvents();

  render({
    container: document.getElementById('root')!,
    initRootProps: initRootProps,
    Root: AppConfigs,
    modules: [
      (await import('./studio')).default,
    ],
    i18n: {
      defaultLangue: 'en',
      resources: translation
    }
  });
};
