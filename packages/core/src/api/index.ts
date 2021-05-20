import axios from 'axios';
import { message } from 'antd';

const LOCAL_CONFIG_KEY = 'IMOVE:LOCAL_CONFIG_KEY';
export interface ILocalConfig {
  ip: string;
  port: string;
  npmRegistry: string;
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

/**
 * get local config data (saved in localStorage)
 * @returns local config
 */
export const getLocalConfig = (): ILocalConfig => {
  const savedConfigString = localStorage.getItem(LOCAL_CONFIG_KEY) || '';
  let savedConfig = {} as ILocalConfig;
  try {
    savedConfig = JSON.parse(savedConfigString);
  } catch (e) {}
  return {
    ip: savedConfig.ip || '127.0.0.1',
    port: savedConfig.port || '3500',
    npmRegistry: savedConfig.npmRegistry || 'https://registry.npm.taobao.org',
  };
};

/**
 * get local config data (saved in localStorage)
 */
export const updateLocalConfig = (config: ILocalConfig) => {
  const savedConfig = getLocalConfig();
  savedConfig.ip = config.ip || savedConfig.ip;
  savedConfig.port = config.port || savedConfig.port;
  savedConfig.npmRegistry = (
    config.npmRegistry || savedConfig.npmRegistry
  ).replace(/\/$/, '');
  localStorage.setItem(LOCAL_CONFIG_KEY, JSON.stringify(savedConfig));
};

export const localConnect = () => {
  const localConfig = getLocalConfig();
  return fetch(`http://${localConfig.ip}:${localConfig.port}/api/connect`, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  });
};

export const localSave = (data: any) => {
  const localConfig = getLocalConfig();
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

export const modifyGraph = (
  projectId: string,
  actions: IModifyGraphAction[],
) => {
  return request({
    url: '/api/modifyGraph',
    params: {
      projectId,
      actions,
    },
  });
};
