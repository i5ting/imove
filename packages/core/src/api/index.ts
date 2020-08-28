export interface ILocalConfig {
  ip: string;
  port: string;
}

export const localConfig: ILocalConfig = {
  ip: '127.0.0.1',
  port: '3500'
};

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
