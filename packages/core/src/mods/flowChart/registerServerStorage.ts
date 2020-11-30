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
}

const enqueue = (type: string, actionType: ActionType, data: any) => {

  if (!validate(type, data)) {
    return;
  }

  const foundIndex = memQueue.findIndex(item => item.type === type && item.actionType === actionType);
  if (foundIndex > -1) {
    const deleted = memQueue.splice(foundIndex, 1)[0];
    data = merge(deleted, data);
  }
  memQueue.push({ type, actionType, data });
};

let modifyActionTimer = -1;
const save = (flowChart: Graph, type: string, actionType: ActionType, data: any) => {
  enqueue(type, actionType, data);
  clearTimeout(modifyActionTimer);
  modifyActionTimer = setTimeout(() => {
    const pushedActions = memQueue.slice(0);
    if(pushedActions.length > 0) {
      flowChart.trigger('graph:change:modify');
      modifyGraph(projectId, memQueue).then(res => {
        memQueue.splice(0, pushedActions.length);
        flowChart.trigger('graph:modified', {success: true});
      }).catch(err => {
        flowChart.trigger('graph:modified', {success: true, error: err});
      });
    }
  }, 100);
};

type ActionEventMap = {[key: string]: string[]};
const NODE_ACTION_EVENT_MAP: ActionEventMap = {
  create: ['node:added'],
  remove: ['node:removed'],
  update: [
    'node:moved',
    'node:resized',
    'node:rotated',
    'node:change:ports',
    'node:change:attrs',
    'node:change:data',
    'node:change:zIndex'
  ]
};

const EDGE_ACTION_EVENT_MAP: ActionEventMap = {
  create: ['edge:connected'],
  remove: ['edge:removed'],
  update: [
    'edge:moved',
  ]
};

export const registerServerStorage = (flowChart: Graph) => {

  Object.keys(NODE_ACTION_EVENT_MAP).forEach((actionType) => {
    const events = NODE_ACTION_EVENT_MAP[actionType];
    events.forEach(event => {
      flowChart.on(event, (args: any) => {
        console.log('node event:', event, 'args:', args);
        save(flowChart, 'node', actionType as ActionType, args.node.toJSON());
      });
    });
  });

  Object.keys(EDGE_ACTION_EVENT_MAP).forEach((actionType) => {
    const events = EDGE_ACTION_EVENT_MAP[actionType];
    events.forEach(event => {
      flowChart.on(event, (args: any) => {
        console.log('edge event:', event, 'args:', args);
        save(flowChart, 'edge', actionType as ActionType, args.edge.toJSON());
      });
    });
  });
};
