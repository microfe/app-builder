import React from 'react';

import { ApplicationPolicy, ApplicationPolityResult } from '../Types';
import { ApplicationContext } from './ApplicationContext';

interface IApplicationAccessControlProps {
  readonly children: (accessResult: ApplicationPolityResult) => JSX.Element | null;
  readonly policies: ApplicationPolicy[];
}

export const ApplicationAccessControl = (props: IApplicationAccessControlProps) => {
  const {
    policies,
    children
  } = props;

  const applicationContext = React.useContext(ApplicationContext);

  let polityResult: ApplicationPolityResult = true;

  for (const policy of policies) {
    polityResult = policy(applicationContext);
    if (polityResult !== true) {
      break;
    }
  }

  return children(polityResult);
};