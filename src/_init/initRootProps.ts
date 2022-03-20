import { IAppProps } from './App';

export const initRootProps = async (): Promise<IAppProps> => {

  return {
    initialContext: {
      user: null
    },
    modules: []
  };
};