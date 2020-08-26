export const safeParse = (json: string): Object => {
  try {
    return JSON.parse(json);
  } catch(err) {
    return {};
  }
};

export const safeGet = (obj: any, keyChain: string, defaultVal: any): any => {

  if(typeof obj !== 'object' || obj === null) {
    return defaultVal;
  }

  let retVal = obj;
  const keys = keyChain.split('.');
  for(const key of keys) {
    if(retVal[key] === undefined) {
      return defaultVal;
    } else {
      retVal = retVal[key];
    }
  }

  return retVal;
};
