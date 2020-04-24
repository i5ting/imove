/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { Collapse } from 'antd';
import 'antd/lib/collapse/style';

const { Panel } = Collapse;

const ToolCollapse = styled(Collapse)`
  border: none;
`;

const ToolPanel = styled(Panel)`
  margin-right: -1px;

  .ant-collapse-content-box {
    margin-bottom: -1px;
    padding: 0;
    overflow: hidden;
  }
`;

const Cell = styled.div`
  box-sizing: border-box;
  display: inline-block;
  width: 50%;
  height: 100px;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;

const Toolbar = (): JSX.Element => {
  return (
    <div
      css={css`
        height: 100%;
        overflow: auto;
        border-right: 1px solid #ddd;
      `}
    >
      <ToolCollapse defaultActiveKey={['1']}>
        <ToolPanel header="General" key="1">
          <Cell>2</Cell>
          <Cell>2</Cell>
          <Cell>2</Cell>
        </ToolPanel>
      </ToolCollapse>
    </div>
  );
};

export default Toolbar;
