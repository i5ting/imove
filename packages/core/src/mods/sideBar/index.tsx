import React, { useState, useEffect, useMemo } from 'react';

import 'antd/es/collapse/style';
import styles from './index.module.less';

import { Collapse, Card } from 'antd';
import { Addon, Graph, Node } from '@antv/x6';
import cellMap from '../../common/previewCell';
import behavior from '../../common/previewCell/behavior';

let cellsMap = cellMap;

// update preview cell map
document.addEventListener(
  'services',
  function (evt) {
    const dataString = evt.detail;
    try {
      const data = JSON.parse(dataString);
      const extendCell: { [key: string]: any } = {};
      data.forEach((item: { [key: string]: any }) => {
        extendCell[`imove-behavior-${item.id}`] = behavior;
      });
      cellsMap = Object.assign({}, cellMap, extendCell);
    } catch (err) {
      console.log(err);
    }
  },
  false,
);

const classifiedByKey = (objectArray: [], key: string) => {
  const newObj = {};
  objectArray.forEach((obj) => {
    const array = newObj[obj[key]] || [];
    array.push(obj);
    newObj[obj[key]] = array;
  });
  return newObj;
};

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
  const dnd = useMemo(
    () => new Dnd({ target: flowChart, scaled: true }),
    [flowChart],
  );

  // life
  useEffect(() => {
    // TODO: fetch to get custom group data
    setGroups([GENERAL_GROUP]);
  }, []);

  useEffect(() => {
    // display preview cell in the sidebar
    document.addEventListener(
      'services',
      function (evt) {
        const dataString = evt.detail;
        try {
          const data = JSON.parse(dataString);
          const SERVICES_GROUP = {
            key: 'services',
            name: '后端能力点',
            cellTypes: data,
          };
          if (data.length > 0) {
            setGroups([GENERAL_GROUP, SERVICES_GROUP]);
          }
        } catch (err) {
          console.log(err);
        }
      },
      false,
    );
    return () => {
      document.removeEventListener('services', function (evt) {});
    };
  }, []);

  return (
    <div className={styles.container}>
      <Collapse
        className={styles.collapse}
        defaultActiveKey={['general', 'custom', 'services']}
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
  const isStringArr = typeof cellTypes[0] === 'string';
  const isObjectArr = typeof cellTypes[0] === 'object';
  const onMouseDown = (evt: any, cellType: string) => {
    dnd.start(Node.create({ shape: cellType }), evt);
  };
  const groupObj = isObjectArr ? classifiedByKey(cellTypes, 'domain') : {};

  return (
    <div className={styles.panelContent}>
      {/* 前端节点 */}
      {isStringArr &&
        cellTypes.map((cellType, index) => {
          const Component = cellsMap[cellType];
          return (
            <Component
              key={index}
              className={styles.cellWrapper}
              onMouseDown={(evt: any) => onMouseDown(evt, cellType)}
            />
          );
        })}
      {/* 后端节点 */}
      {isObjectArr &&
        Object.keys(groupObj).map((domain) => {
          const nodes = groupObj[domain];
          return (
            <Card title={domain}>
              {nodes.map((node: any) => {
                const { id, name } = node;
                const type = `imove-behavior-${id}`;
                const Component = cellsMap[type];
                return (
                  <Component
                    key={id}
                    className={styles.serviceWrapper}
                    onMouseDown={(evt: any) => onMouseDown(evt, type)}
                    title={name}
                  />
                );
              })}
            </Card>
          );
        })}
    </div>
  );
};

export default SideBar;
