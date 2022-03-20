import { Col, Input, Row, Select } from 'antd';
import React from 'react';
import styled from 'styled-components';

import CssProperties from './CssProperties.json';

const allCssPropertyKeys = Object.keys(CssProperties.properties);

const _CssSettingItem = styled.div`
  .ant-select {
    width: 100%;
  }
`;

export interface ICssProperty {
  readonly name?: string;
  readonly value?: string;
}

interface ICssSettingItemProps {
  readonly index: number;
  readonly property: ICssProperty;
  readonly onChange: (property: ICssProperty) => void;
}

export const CssSettingItem = (props: React.PropsWithChildren<ICssSettingItemProps>) => {
  const [nameResult, setNameResult] = React.useState<string[]>([]);

  const handleSearch = (value: string) => {
    if (!value) {
      return;
    }

    const res = allCssPropertyKeys
      .filter((key) => key.includes(value))
      .sort((a, b) => a.length - b.length)
      .slice(0, 10);

    setNameResult(res);
  };

  const searchBoxName = `css-search-box-${props.index}`;

  return (
    <_CssSettingItem>
      <Row gutter={6}>
        <Col xs={12}>
          <Select
            bordered={false}
            value={props.property.name ?? undefined}
            dropdownClassName={searchBoxName}
            placeholder="Property"
            onSearch={handleSearch}
            showSearch={true}
            defaultActiveFirstOption={true}
            allowClear={true}
            onInputKeyDown={(e) => {
              if (e.key == 'Tab') {
                const activedOption = document.querySelector(`.${searchBoxName} .ant-select-item-option-active`) as HTMLDivElement;
                if (!activedOption) {
                  return;
                }

                props.onChange({
                  name: activedOption.innerText,
                  value: props.property.value
                });
              }
            }}
            onChange={(value) => props.onChange({
              name: value,
              value: props.property.value
            })}
          >
            {nameResult.map((name) => {
              return (<Select.Option key={name} value={name}>{name}</Select.Option>);
            })}
          </Select>
        </Col>
        <Col xs={12}>
          <Input
            value={props.property.value}
            allowClear={true}
            bordered={false}
            placeholder="Value"
            onChange={(value) => props.onChange({
              name: props.property.name,
              value: value.currentTarget.value
            })}
          />
        </Col>
      </Row>
    </_CssSettingItem>
  );
};