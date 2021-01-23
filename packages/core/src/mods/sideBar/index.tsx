import React, { useState, useEffect, useMemo } from 'react';

import 'antd/es/collapse/style';
import styles from './index.module.less';

import { Collapse } from 'antd';
import { Addon, Graph, Node } from '@antv/x6';
import cellMap from '../../common/previewCell';

const { Dnd } = Addon;
const { Panel } = Collapse;
const GENERAL_GROUP = {
  key: 'general',
  name: '通用元件',
  cellTypes: ['imove-start', 'imove-branch', 'imove-behavior'],
};

interface IGroupItem {
  key: string;
  name: string;
  cellTypes: string[];
}

interface ISideBarProps {
  flowChart: Graph;
}

const SideBar: React.FC<ISideBarProps> = (props) => {
  const { flowChart } = props;
  const [groups, setGroups] = useState<IGroupItem[]>([]);
  const dnd = useMemo(() => new Dnd({ target: flowChart, scaled: true }), [
    flowChart,
  ]);

  // life
  useEffect(() => {
    // TODO: fetch to get custom group data
    setGroups([GENERAL_GROUP]);
  }, []);

  return (
    <div className={styles.container}>
      <Collapse
        className={styles.collapse}
        defaultActiveKey={['general', 'custom']}
      >
        {groups.map((group) => (
          <Panel key={group.key} header={group.name}>
            <PanelContent dnd={dnd} cellTypes={group.cellTypes} />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

interface IPanelContentProps {
  dnd: Addon.Dnd;
  cellTypes: string[];
}

const PanelContent: React.FC<IPanelContentProps> = (props) => {
  const { dnd, cellTypes } = props;
  const onMouseDown = (evt: any, cellType: string) => {
    dnd.start(Node.create({ shape: cellType }), evt);
  };
  return (
    <div className={styles.panelContent}>
      {cellTypes.map((cellType, index) => {
        const Component = cellMap[cellType];
        return (
          <div key={index} className={styles.cellWrapper}>
            <Component onMouseDown={(evt: any) => onMouseDown(evt, cellType)} />
          </div>
        );
      })}
    </div>
  );
};

export default SideBar;
