/** @jsx jsx */
import { useRef, useEffect, ReactNode } from 'react';
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { Graph } from '@antv/x6';
import { Collapse } from 'antd';
import { generals, DataItem } from '../data/cells';
import patchDnd from '../utils/patch-dnd';
import Cells from './cells';
import 'antd/lib/collapse/style';

const { Panel } = Collapse;

const ToolCollapse = styled(Collapse)`
  border: none;

  > .ant-collapse-item > .ant-collapse-header {
    height: 36px;
    line-height: 12px;
    font-size: 12px;
    color: #666;
  }
`;

const ToolPanel = styled(Panel)`
  margin-right: -1px;

  .ant-collapse-content-box {
    margin-bottom: -1px;
    padding: 0;
    overflow: hidden;
  }
`;

interface SidebarProps {
  graph: Graph;
}

const CellWrapper = ({ data, children }: { data: DataItem; children: ReactNode }): JSX.Element => {
  return (
    <div
      css={css`
        box-sizing: border-box;
        display: inline-block;
        padding: 10px 5px;
        width: 50%;
        height: 80px;
        text-align: center;
        vertical-align: top;
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;

        :hover {
          box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        }
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 40px;
        `}
      >
        {children}
      </div>
      <span
        css={css`
          font-size: 11px;
          line-height: 19px;
        `}
      >
        {data.label}
      </span>
    </div>
  );
};

const Sidebar = ({ graph }: SidebarProps): JSX.Element => {
  const generalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generalContainer = generalRef.current;
    patchDnd(generalContainer, graph, generals);
  });

  return (
    <div
      css={css`
        height: 100%;
        overflow: auto;
        border-right: 1px solid #ddd;
      `}
    >
      <ToolCollapse defaultActiveKey={['general']}>
        <ToolPanel header="General" key="general">
          <div ref={generalRef}>
            {generals.map((cell) => {
              const Cell = Cells[cell.type];
              return (
                <CellWrapper key={cell.type} data={cell}>
                  <Cell />
                </CellWrapper>
              );
            })}
          </div>
        </ToolPanel>
      </ToolCollapse>
    </div>
  );
};

export default Sidebar;
