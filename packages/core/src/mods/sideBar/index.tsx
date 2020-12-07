import React, { useState, useEffect, useRef } from 'react';

import 'antd/es/collapse/style';
import styles from './index.module.less';

import { Collapse } from 'antd';
import { Addon, Events, Graph, Node } from '@antv/x6';
import previewCellSchemaMap from '../../common/previewCell';

const { Dnd } = Addon;
const { Panel } = Collapse;
const CELL_SIZE = 80;
const CELL_SCALE = 0.7;
const GENERAL_GROUP = {
  key: 'general',
  name: '通用元件',
  cells: ['imove-start-preview', 'imove-branch-preview', 'imove-behavior-preview'],
};
const SHAPE_REFLECT_MAP: { [key: string]: string } = {
  'imove-start-preview': 'imove-start',
  'imove-branch-preview': 'imove-branch',
  'imove-behavior-preview': 'imove-behavior',
};

interface IGroupItem {
  key: string;
  name: string;
  cells: string[];
}

interface ISideBarProps {
  flowChart: Graph;
}

const SideBar: React.FC<ISideBarProps> = (props) => {
  const { flowChart } = props;
  const [dnd, setDnd] = useState<Addon.Dnd>();
  const [groups, setGroups] = useState<IGroupItem[]>([]);

  // life
  useEffect(() => {
    // TODO: fetch to get custom group data
    setGroups([GENERAL_GROUP]);
    setDnd(new Dnd({ target: flowChart, scaled: true }));
  }, []);

  return (
    <div className={styles.container}>
      {dnd && (
        <Collapse className={styles.collapse} defaultActiveKey={['general', 'custom']}>
          {groups.map((group) => (
            <Panel key={group.key} header={group.name}>
              <PanelContent dnd={dnd} cells={group.cells} />
            </Panel>
          ))}
        </Collapse>
      )}
    </div>
  );
};

interface IPanelContentProps {
  dnd: Addon.Dnd;
  cells: string[];
}

const PanelContent: React.FC<IPanelContentProps> = (props) => {
  const { dnd, cells } = props;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      const graph = new Graph({
        container: ref.current,
        width: ref.current.offsetWidth,
        height: Math.ceil(cells.length / 3) * CELL_SIZE * CELL_SCALE,
        interacting: false,
        preventDefaultBlankAction: false,
      });
      cells.forEach((cell: any, index: number) => {
        const rowIdx = Math.floor(index / 3);
        const colIdx = index % 3;
        const { top } = previewCellSchemaMap[cell] || {};
        graph.addNode({
          shape: cell,
          x: colIdx * (CELL_SIZE + 16 / CELL_SCALE),
          y: rowIdx * (CELL_SIZE + 16 / CELL_SCALE) + top,
        });
      });
      graph.scale(CELL_SCALE, CELL_SCALE);
      graph.on('cell:mousedown', (args: Events.EventArgs['cell:mousedown']) => {
        const { node, e } = args;
        let newNode = node;
        if (SHAPE_REFLECT_MAP[node.shape]) {
          newNode = Node.create({ shape: SHAPE_REFLECT_MAP[node.shape] });
        }
        dnd.start(newNode, e);
      });
    }
  }, []);
  return <div className={styles.chart} ref={ref} />;
};

export default SideBar;
