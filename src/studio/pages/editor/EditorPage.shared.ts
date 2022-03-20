import { allowAnonymous, i18n, IApplicationRouteInfo } from 'libs/framework';

export const editorPagePath = '/';

export const editorInfo: IApplicationRouteInfo = {
  title: i18n('Editor'),
  path: editorPagePath,
  policies: [allowAnonymous],
  exact: true
};

export const getEditorUrl = () => {
  return editorPagePath;
};