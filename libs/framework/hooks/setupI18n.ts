import moment from 'moment';

import { CreateTranslatiorProps, createTranslator, setI18n } from '../i18n';

export const setupI18n = (i18nResource: CreateTranslatiorProps) => {
  const _i18n = createTranslator(i18nResource);

  setI18n(_i18n);
  moment.locale(i18nResource.defaultLangue);
};