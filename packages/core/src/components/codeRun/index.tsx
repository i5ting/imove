import React, {
  useState,
  useCallback,
} from 'react';

import styles from './index.module.less';

import Console from '../console';
import InputPanel from './inputPanel';
import JsonView from 'react-json-view';

// FIXME: https://github.com/tomkp/react-split-pane/issues/541
// @ts-ignore
import SplitPane from 'react-split-pane/lib/SplitPane';
// @ts-ignore
import Pane from 'react-split-pane/lib/Pane';

const defaultInput = {
  pipe: {},
  context: {},
  payload: {},
  config: {}
};

interface ICardProps {
  title: string;
}

const Card: React.FC<ICardProps> = (props) => {
  const {title} = props;

  return (
    <div className={styles.card}>
      <div className={styles.cardTitleText}>{title}</div>
      <div className={styles.cardBody}>
        {props.children}
      </div>
    </div>
  );
};

interface ICodeRunProps {
}

const CodeRun: React.FC<ICodeRunProps> = (props) => {
  
  const [input, setInput] = useState(defaultInput);
  const [output, setOutput] = useState({});

  const onChangeInput = useCallback((val: any) => {
    setInput(val);
  }, []);

  return (
    <div className={styles.container}>
      <SplitPane split={'horizontal'}>
        <Pane initialSize={'380px'} minSize={'43px'}>
          <SplitPane split={'vertical'}>
            <Pane className={styles.pane} minSize={'360px'} maxSize={'660px'}>
              <Card title={'输入'}>
                <InputPanel
                  data={input}
                  onChange={onChangeInput}
                />
              </Card>
            </Pane>
            <Pane className={styles.pane}>
              <Card title={'输出'}>
                <JsonView
                  name={null}
                  collapsed={false}
                  enableClipboard={false}
                  displayDataTypes={false}
                  displayObjectSize={false}
                  src={{}}
                />
              </Card>
            </Pane>
          </SplitPane>
        </Pane>
        <Pane className={styles.pane} minSize={'150px'}>
          <Card title={'控制台'}>
            <Console />
          </Card>
        </Pane>
      </SplitPane>
    </div>
  );
}

export default CodeRun;
