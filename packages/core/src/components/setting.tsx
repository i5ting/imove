/** @jsx jsx */
import { useState } from 'react';
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { Graph, Cell } from '@antv/x6';
import { Collapse, Form, Input } from 'antd';
import 'antd/lib/form/style';
import 'antd/lib/input/style';

const { Panel } = Collapse;
const { Item } = Form;

const Header = styled.h3`
  margin-bottom: 0;
  padding-left: 20px;
  height: 36px;
  line-height: 36px;
  font-size: 12px;
  color: #555;
  border-bottom: 1px solid #ddd;
`;

const SettingCollapse = styled(Collapse)`
  font-size: 14px;
  border: none;

  > .ant-collapse-item > .ant-collapse-header {
    height: 36px;
    line-height: 12px;
    font-size: 12px;
    color: #666;
  }
`;

interface SettingProps {
  graph: Graph;
}

const Setting = ({ graph }: SettingProps): JSX.Element => {
  const [cell, setCell] = useState<Cell<any> | null>(null);

  graph.on('selection:changed', () => {
    const cells = graph.getSelectedCells();
    setCell(cells.length > 0 ? cells[0] : null);
  });

  let cellType = '';

  if (cell) {
    if (cell.isNode()) {
      cellType = cell.data.type.toUpperCase();
    } else {
      cellType = 'EDGE';
    }
  } else {
    cellType = 'FLOW';
  }

  return (
    <div
      css={css`
        height: 100%;
        overflow: auto;
        border-left: 1px solid #ddd;
      `}
    >
      <Header>{cellType}</Header>
      {cell && cell.isNode() && ['decision', 'action'].includes(cell.data.type) && (
        <SettingCollapse defaultActiveKey={['general']}>
          <Panel header="General" key="general">
            <Form initialValues={{ label: cell.data.label }}>
              <Item label="名称" name="label">
                <Input
                  onChange={(e): void => {
                    console.log(`first: ${cell.data.label}`);
                    cell.data.label = e.target.value.trim();
                    console.log(`then: ${cell.data.label}`);
                    graph.setCellData(cell, cell.data);
                  }}
                />
              </Item>
            </Form>
          </Panel>
        </SettingCollapse>
      )}
    </div>
  );
};

export default Setting;
