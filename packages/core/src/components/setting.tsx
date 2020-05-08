/** @jsx jsx */
import { Component } from 'react';
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { Graph, Cell } from '@antv/x6';
import { Collapse, Form, Input } from 'antd';
import SchemaForm from './schema-form';
import 'antd/lib/form/style';
import 'antd/lib/input/style';

const { Panel } = Collapse;
const { Item } = Form;

const labelCol = { span: 7 };

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

interface SettingState {
  cell: Cell<any> | null;
}

class Setting extends Component<SettingProps, SettingState> {
  constructor(props: SettingProps) {
    super(props);

    this.state = {
      cell: null,
    };

    const { graph } = this.props;
    graph.on('selection:changed', () => {
      const cells = graph.getSelectedCells();
      if (cells.length === 0) {
        this.setState({ cell: null });
        return;
      }

      const cell = cells[0];

      if (cell.isEdge()) {
        cell.data = {};
      }

      this.setState({ cell });
    });
  }

  render(): JSX.Element {
    const { graph } = this.props;
    const { cell } = this.state;
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
        {cell && !['start', 'end'].includes(cell.data.type) && (
          <SettingCollapse
            defaultActiveKey={['general', 'event', 'input', 'output']}
            key={cell && cell.id ? cell.id : ''}
          >
            <Panel header="General" key="general">
              <Form labelCol={labelCol} initialValues={{ label: cell.data.label }}>
                <Item label="名称" name="label">
                  <Input
                    onChange={(e): void => {
                      cell.data.label = e.target.value.trim();
                      graph.setCellData(cell, cell.data);
                    }}
                  />
                </Item>
              </Form>
            </Panel>
            {/* <Panel header="Event" key="event">
              <Form
                labelCol={labelCol}
                initialValues={{ event: cell.data && cell.data.data && cell.data.data.event }}
              >
                <Item label="触发事件" name="event">
                  <Input
                    onChange={(e): void => {
                      if (!cell.data.data) {
                        cell.data.data = {};
                      }
                      cell.data.data.event = e.target.value.trim();
                      graph.setCellData(cell, cell.data);
                    }}
                  />
                </Item>
              </Form>
            </Panel> */}
            {cell.data && cell.data.schema && Object.keys(cell.data.schema.properties).length && (
              <Panel header="Input" key="input">
                <SchemaForm schema={cell.data.schema} data={cell.data.data} />
              </Panel>
            )}
            <Panel header="Output" key="output">
              <Form
                labelCol={labelCol}
                initialValues={{ event: cell.data && cell.data.data && cell.data.data.contextKey }}
              >
                <Item label="存储字段" name="output.contextKey">
                  <Input
                    onChange={(e): void => {
                      if (!cell.data.data) {
                        cell.data.data = {};
                      }
                      if (!cell.data.data.output) {
                        cell.data.data.output = {};
                      }
                      cell.data.data.output.contextKey = e.target.value.trim();
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
  }
}

export default Setting;
