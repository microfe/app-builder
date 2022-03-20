import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { useNode } from '@craftjs/core';

import { CssSettingItem, ICssProperty } from './CssSettingItem';

const _CssSettings = styled.div`

`;

interface ICssSettingsProps {

}

export const CssSettings = (props: React.PropsWithChildren<ICssSettingsProps>) => {
  const {
    actions: { setProp },
    elementStyle,
  } = useNode((node) => ({
    elementStyle: node.data.props['style'],
  }));

  const [properties, setProperties] = React.useState<ICssProperty[]>([{ name: undefined, value: undefined }]);
  const [settingStyles, setSettingStyle] = React.useState<React.CSSProperties | null>(null);

  React.useEffect(
    () => {
      if (settingStyles === null) {
        setSettingStyle(elementStyle);
        return;
      }

      if (JSON.stringify(settingStyles) === JSON.stringify(elementStyle)) {
        return;
      }

      setProp((props) => { props['style'] = settingStyles; }, 500);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setProp, settingStyles]
  );

  React.useEffect(
    () => {
      if (settingStyles === null) {
        return;
      }

      if (JSON.stringify(settingStyles) !== JSON.stringify(elementStyle)) {
        setSettingStyle(elementStyle);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [elementStyle]
  );

  React.useEffect(
    () => {
      if (!settingStyles) {
        return;
      }

      const transformPropertyName = function (name: string) {
        // turn things like 'alignItems' into 'align-items'
        const result = name.replace(/([A-Z])/g, '-$1').toLowerCase();
        return result;
      };

      const nextProperties: ICssProperty[] = [];
      const styleKeys = Object.keys(settingStyles);
      for (const styleKey of styleKeys) {
        nextProperties.push({ name: transformPropertyName(styleKey), value: settingStyles[styleKey] });
      }

      setProperties([...nextProperties, { name: undefined, value: undefined }]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [settingStyles]
  );

  React.useEffect(
    () => {
      if (!settingStyles) {
        return;
      }

      const cleanPropertyName = function (name) {

        // turn things like 'align-items' into 'alignItems'
        name = name.replace(/(-.)/g, function (v) { return v[1].toUpperCase(); });

        return name;
      };

      const netxSettingStyles = properties.filter(o => !!o.name)
        .reduce(
          (cssContent, property) => {
            return { ...cssContent, [cleanPropertyName(property.name)]: property.value };
          },
          {} as React.CSSProperties
        );

      if (JSON.stringify(settingStyles) === JSON.stringify(netxSettingStyles)) {
        return;
      }

      setSettingStyle(netxSettingStyles);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [properties, setProp]
  );

  return (
    <_CssSettings>
      <Typography.Text type="secondary">Styles</Typography.Text>
      {properties.map((property, i) => {
        return (
          <CssSettingItem
            key={i}
            index={i}
            property={property}
            onChange={(nextProperty) => {
              if (!nextProperty.name) {
                if (properties.length === 1) {
                  setProperties([{ name: undefined, value: undefined }]);
                  return;
                }

                const nextProperties = [...properties];
                nextProperties[i] = { name: undefined, value: undefined };

                const emptyProperties = nextProperties.filter(o => !o.name).length;

                if (emptyProperties > 1) {
                  nextProperties.splice(i, 1);
                }

                setProperties(nextProperties);
                return;
              }

              const nextProperties = [...properties];
              nextProperties[i] = nextProperty;
              const hadEmptyProperty = nextProperties.find(o => !o.name);

              if (!hadEmptyProperty) {
                nextProperties.push({ name: undefined, value: undefined });
              }

              setProperties(nextProperties);
            }}
          />
        );
      })}
    </_CssSettings>
  );
};