export interface ILocalConfig {
  ip: string;
  port: string;
}

export type ActionType = 'create' | 'update' | 'remove';

export interface IModifyGraphAction {
  type: string;
  actionType: ActionType;
  data: any;
}

export const localConfig: ILocalConfig = {
  ip: '127.0.0.1',
  port: '3500'
}

export const updateLocalConfig = (config: ILocalConfig) => {
  localConfig.ip = config.ip || localConfig.ip;
  localConfig.port = config.port || localConfig.port;
}

export const localConnect = () => {
  return fetch(`http://${localConfig.ip}:${localConfig.port}/api/connect`, {
    method: 'GET',
    headers: {'content-type': 'application/json'}
  });
}

export const localSave = (data: any) => {
  fetch(`http://${localConfig.ip}:${localConfig.port}/api/save`, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(data)
  });
}

export const queryGraph = (projectId: string) => {
  return fetch('/api/queryGraph', {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify({
      projectId
    })
  }).then(res => res.json()).then(res => {
    const {success} = res;
    if(success) {
      return res;
    } else {
      return Promise.reject(res);
    }
  })
}

export const modifyGraph = (projectId: string, actions: IModifyGraphAction[]) => {
  return fetch('/api/modifyGraph', {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify({
      projectId,
      actions
    })
  });
}
