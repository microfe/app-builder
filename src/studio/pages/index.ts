/* eslint-disable @typescript-eslint/no-var-requires */

import React from 'react';

export const pages = [
  // Your pages here!
  {
      routeInfo: require('./editor/EditorPage.shared').editorInfo,
      Page: React.lazy(() => import(/* webpackChunkName: "editor" */ './editor')
        .then(o => ({default: o.EditorPage })))
  }, /** EditorPage */
];