import { Graph } from '@antv/x6';
import merge from 'lodash.merge';
import { parseQuery } from '../../utils';
import { modifyGraph, ActionType, IModifyGraphAction } from '../../api';

const { projectId } = parseQuery();
const memQueue: IModifyGraphAction[] = [];

const validate = (type: string, data: any) => {
  if (type === 'node') {
    return true;
  } else if (type === 'edge') {
    const { source, target } = data;
    return source.cell && target.cell;
  } else {
    return false;
  }
};

const enqueue = (cellType: string, actionType: ActionType, data: any) => {
  if (!validate(cellType, data)) {
    return;
  }

  const foundIndex = memQueue.findIndex((item) => (
    item.type === cellType &&
    item.actionType === actionType &&
    item.data.id === data.id
  ));
  if (foundIndex > -1) {
    const deleted = memQueue.splice(foundIndex, 1)[0];
    merge(deleted.data, data);
  }
  memQueue.push({ type: cellType, actionType, data });
};

let modifyActionTimer: number = -1;
const save = (flowChart: Graph, cellType: string, actionType: ActionType, data: any) => {
  enqueue(cellType, actionType, data);
  clearTimeout(modifyActionTimer);
  modifyActionTimer = window.setTimeout(() => {
    const pushedActions = memQueue.slice(0);
    if (pushedActions.length > 0) {
      flowChart.trigger('graph:change:modify');
      modifyGraph(projectId, memQueue)
        .then((res) => {
          memQueue.splice(0, pushedActions.length);
          flowChart.trigger('graph:modified', { success: true });
        })
        .catch((error) => {
          flowChart.trigger('graph:modified', { success: true, error: error });
        });
    }
  }, 100);
};

type ActionEventMap = { [key: string]: string[] };
const nodeActionEventMap: ActionEventMap = {
  [ActionType.create]: ['node:added'],
  [ActionType.remove]: ['node:removed'],
  [ActionType.update]: [
    'node:moved',
    'node:resized',
    'node:rotated',
    'node:change:ports',
    'node:change:attrs',
    'node:change:data',
    'node:change:zIndex',
  ],
};

const edgeActionEventMap: ActionEventMap = {
  [ActionType.create]: ['edge:connected'],
  [ActionType.remove]: ['edge:removed'],
  [ActionType.update]: ['edge:moved'],
};

export const registerServerStorage = (flowChart: Graph) => {
  Object.keys(nodeActionEventMap).forEach((actionType) => {
    const events = nodeActionEventMap[actionType];
    events.forEach((event) => {
      flowChart.on(event, (args: any) => {
        console.log('node event:', event, 'args:', args);
        save(flowChart, 'node', actionType as ActionType, args.node.toJSON());
      });
    });
  });

  Object.keys(edgeActionEventMap).forEach((actionType) => {
    const events = edgeActionEventMap[actionType];
    events.forEach((event) => {
      flowChart.on(event, (args: any) => {
        console.log('edge event:', event, 'args:', args);
        save(flowChart, 'edge', actionType as ActionType, args.edge.toJSON());
      });
    });
  });
};
