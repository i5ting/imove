import * as React from 'react';
import styled from '@emotion/styled';
import { Graph, UndoManager } from '@antv/x6';
import { Tooltip } from 'antd';
import { bindKey } from '../utils/tool';
import getCommands from '../data/commands';
import 'antd/lib/tooltip/style';

export interface ToolbarProps {
  graph: Graph;
  onSave: (data: { nodes: any; edges: any }) => void;
}

const Group = styled.div`
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  padding: 5px;
  line-height: 25px;

  :first-of-type {
    :before {
      display: none;
    }
  }

  :before {
    content: '';
    display: block;
    position: absolute;
    width: 1px;
    height: 12px;
    background: #d2d2d2;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
`;

const Item = styled.span`
  display: inline-block;
  margin: 0 2px;
  padding: 0 5px;
  border-radius: 3px;
  cursor: pointer;

  :hover {
    background: #ddd;
  }
`;

const Toolbar = ({ graph, onSave }: ToolbarProps): JSX.Element => {
  const undoManager = UndoManager.create(graph);
  const commands = getCommands(graph, undoManager);

  bindKey(commands, graph);

  return (
    <div>
      {commands.map((items) => (
        <Group key={items.map((i) => i.name).join('-')}>
          {items.map((item) => (
            <Tooltip title={item.tooltip} key={item.name}>
              <Item
                onClick={(): void => {
                  if (item.name === 'save') {
                    const graphData = graph.toJSON();
                    onSave(graphData);
                    return;
                  }
                  item.handler();
                }}
              >
                {item.icon}
              </Item>
            </Tooltip>
          ))}
        </Group>
      ))}
    </div>
  );
};

export default Toolbar;
