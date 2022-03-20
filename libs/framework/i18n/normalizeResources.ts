import { I18nResource } from './createTranslator';

export const normalizeResources = (resources: I18nResource) => {
  let _resources: I18nResource = {};

  Object.keys(resources).forEach((key) => {
    _resources = {
      ..._resources,
      [key]: Object.entries(resources[key]).reduce(
        (resource, resourceEntry) => {
          const resourceKey = resourceEntry[0].toLowerCase();
          resource[resourceKey] = resourceEntry[1];
          return resource;
        },
        {}
      )
    }
  });

  return _resources;
};