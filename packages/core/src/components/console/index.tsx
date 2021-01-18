import React, {
  useState,
  useEffect
} from 'react';

import styles from './index.module.less';

import {
  InfoCircleOutlined,
  WarningOutlined,
  BugOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import { Tabs } from 'antd';

interface ILog {
  type: string;
  data: any[];
}

const isPlainObject = (value: any): boolean => {
  return typeof value === 'object' && value !== null;
}

const hijackMap: { [key: string]: any } = {
  log: {
    bgColor: '#272823',
    textColor: '#ffffff',
    borderColor: 'rgba(128, 128, 128, 0.35)',
    icon: <div className={styles.logIcon} />,
    originMethod: console.log
  },
  info: {
    bgColor: '#272823',
    textColor: '#ffffff',
    borderColor: 'rgba(128, 128, 128, 0.35)',
    icon: <InfoCircleOutlined className={styles.logIcon} />,
    originMethod: console.info
  },
  warn: {
    bgColor: 'rgb(51, 42, 0)',
    textColor: 'rgb(245, 211, 150)',
    borderColor: 'rgb(102, 85, 0)',
    icon: <WarningOutlined className={styles.logIcon} />,
    originMethod: console.warn
  },
  debug: {
    bgColor: '#272823',
    textColor: 'rgb(77, 136, 255)',
    borderColor: 'rgba(128, 128, 128, 0.35)',
    icon: <BugOutlined className={styles.logIcon} />,
    originMethod: console.debug
  },
  error: {
    bgColor: 'rgb(40, 0, 0)',
    textColor: 'rgb(254, 127, 127)',
    borderColor: 'rgb(91, 0, 0)',
    icon: <CloseCircleOutlined className={styles.logIcon} />,
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

  const hijackConsole = () => {
    Object.keys(hijackMap).forEach(method => {
      // @ts-ignore
      window.console[method] = (...args: any[]) => {
        hijackMap[method].originMethod(...args);
        setLogList([...logList, { type: method, data: args }]);
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
  const renderLogPanel = (logList: ILog[]) => {
    return (
      <div className={styles.logPanel}>
        {logList.map((log: ILog, index: number) => {
          const { icon, textColor, bgColor, borderColor } = hijackMap[log.type];
          const logLineStyle = {
            color: textColor,
            backgroundColor: bgColor,
            borderTopColor: borderColor,
            borderBottomColor: borderColor
          };
          const showText = log.data.map(o => {
            return isPlainObject(o) ? JSON.stringify(log.data, null, 2) : o;
          }).join(' ');
          // TODO: use react-json-view to render object
          return (
            <div key={index} className={styles.logLine} style={logLineStyle}>
              {icon}
              <div className={styles.logText}>
                {showText}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Tabs type={'card'}>
        <Tabs.TabPane tab={'控制台'} key={'log'}>
          {renderLogPanel(logList)}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default MyConsole;
