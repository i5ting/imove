import { parse } from 'query-string';

export const safeParse = (json: string): Record<string, any> => {
  try {
    return JSON.parse(json);
  } catch (error) {
    return {};
  }
};

export const safeGet = (obj: any, keyChain: string, defaultVal?: any): any => {
  if (typeof obj !== 'object' || obj === null) {
    return defaultVal;
  }

  let val = obj;
  const keys = keyChain.split('.');
  for (const key of keys) {
    if (val[key] === undefined) {
      return defaultVal;
    } else {
      val = val[key];
    }
  }

  return val;
};

const parseConfig = {
  skipNull: true,
  skipEmptyString: true,
  parseNumbers: false,
  parseBooleans: false,
};

export const parseQuery = (): { [key: string]: any } => {
  return parse(location.search, parseConfig);
};

export const base64Url2Blob = (base64: string) => {
  const bytes = window.atob(base64.split(',')[1]);
  const buffer = new ArrayBuffer(bytes.length);
  const arr = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i++) {
    arr[i] = bytes.charCodeAt(i);
  }
  return new Blob([arr], { type: 'image/png' });
};

export const downloadFile = (fileName: string, blob: Blob) => {
  const elem = document.createElement('a');
  elem.href = URL.createObjectURL(blob);
  elem.download = fileName;
  document.body.appendChild(elem);
  elem.click();
  URL.revokeObjectURL(elem.href);
  document.body.removeChild(elem);
};
