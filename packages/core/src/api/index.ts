import axios from 'axios';
import { message } from 'antd';

export interface ILocalConfig {
  ip: string;
  port: string;
}

export enum ActionType {
  create = 'create',
  update = 'update',
  remove = 'remove',
}

export interface IModifyGraphAction {
  type: string;
  actionType: ActionType;
  data: any;
}

interface RequestConfig {
  url: string;
  method?: 'get' | 'post';
  params?: { [key: string]: any };
  headers?: { [key: string]: string };
}

const request = (function () {
  const instance = axios.create();
  instance.interceptors.response.use((response: any) => {
    const { data } = response || {};
    const { success, msg } = data || {};
    if (success) {
      return data;
    } else {
      message.error(msg);
      return Promise.reject(data);
    }
  });
  return (config: RequestConfig) => {
    const { url, method = 'post', params, headers = {} } = config;
    return instance.request({
      url,
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        ...headers,
      },
      data: params,
      timeout: 3000,
    });
  };
})();

export const localConfig: ILocalConfig = {
  ip: '127.0.0.1',
  port: '3500',
};

export const updateLocalConfig = (config: ILocalConfig) => {
  localConfig.ip = config.ip || localConfig.ip;
  localConfig.port = config.port || localConfig.port;
};

export const localConnect = () => {
  return fetch(`http://${localConfig.ip}:${localConfig.port}/api/connect`, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  });
};

export const localSave = (data: any) => {
  fetch(`http://${localConfig.ip}:${localConfig.port}/api/save`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const queryGraph = (projectId: string) => {
  return request({
    url: '/api/queryGraph',
    params: {
      projectId,
    },
  });
};

export const modifyGraph = (projectId: string, actions: IModifyGraphAction[]) => {
  return request({
    url: '/api/modifyGraph',
    params: {
      projectId,
      actions,
    },
  });
};
