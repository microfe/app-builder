import React from 'react';

import { IPage, IProject } from './services';

export interface IStudioContextValue {
  readonly project?: IProject;
  readonly pages?: IPage[];
  readonly activedPage?: IPage;
}

export const studioPath = '/studio';

export const StudioContext = React.createContext<IStudioContextValue>(null!);