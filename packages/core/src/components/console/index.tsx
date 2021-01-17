import React, {
  useState,
  useEffect
} from 'react';

import styles from './index.module.less';

interface ILog {
  type: string;
  data: any[];
}

const isPlainObject = (value: any): boolean => {
  return typeof value === 'object' && value !== null;
}

const hijackMap: {[key: string]: any} = {
  log: {
    color: '#ffffff',
    originMethod: console.log
  },
  info: {
    color: '#76cd75',
    originMethod: console.info
  },
  warn: {
    color: '#faad14',
    originMethod: console.warn
  },
  debug: {
    color: '#1890ff',
    originMethod: console.debug
  },
  error: {
    color: '#ff4d4f',
    originMethod: console.error
  }
}

const MyConsole: React.FC = () => {
  const [logList, setLogList] = useState<ILog[]>([]);

  useEffect(() => {
    hijackConsole();
    return () => {
      resetConsole();
    };
  }, [logList]);

  const addLog = (log: ILog) => {
    setLogList([...logList, log]);
  }

  const clearLog = () => {
    setLogList([]);
  }

  const hijackConsole = () => {
    Object.keys(hijackMap).forEach(method => {
      // @ts-ignore
      window.console[method] = (...args: any[]) => {
        addLog({ type: method, data: args });
        hijackMap[method].originMethod(...args);
      };
    });
  }

  const resetConsole = () => {
    Object.keys(hijackMap).forEach(method => {
      // @ts-ignore
      window.console[method] = hijackMap[method].originMethod;
    });
  };

  // 根据不同console类型展示不同的样式
  const renderLogList = (logList: ILog[]) => {
    return logList.map((log: ILog, index: number) => {
      const {color} = hijackMap[log.type];
      const showText = log.data.map(o => {
        return isPlainObject(o) ? JSON.stringify(log.data, null, 2) : o;
      }).join(' ');
      // TODO: use react-json-view to render object
      return (
        <p key={index} style={{color}}>
          {showText}
        </p>
      );
    });
  }

  return (
    <div className={styles.container}>
      {renderLogList(logList)}
    </div>
  );
}

export default MyConsole
