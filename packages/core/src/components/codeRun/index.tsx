import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';

import styles from './index.module.less';

import { Button } from 'antd';
import { Graph } from '@antv/x6';
import Console from '../console';
import InputPanel from './inputPanel';
import JsonView from 'react-json-view';
import { executeScript } from '../../utils';
import { PlayCircleFilled } from '@ant-design/icons';
import { compileForOnline } from '@imove/compile-code';
import { toSelectedCellsJSON } from '../../utils/flowChartUtils';

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
  const { title } = props;

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
  flowChart: Graph;
}

const CodeRun: React.FC<ICodeRunProps> = (props) => {

  const {flowChart} = props;
  const [input, setInput] = useState(defaultInput);
  const [output, setOutput] = useState({});

  useEffect(() => {
    // NOTE: listen the event that iMove online exec ends
    const handler = (data: any) => {
      setOutput(data.detail || {});
    };
    window.addEventListener('iMoveOnlineExecEnds', handler);
    return () => {
      window.removeEventListener('iMoveOnlineExecEnds', handler);
    };
  }, []);

  const onClickRun = useCallback(() => {
    const selectedCelssJson = toSelectedCellsJSON(flowChart);
    const compiledCode = compileForOnline(selectedCelssJson, input);
    executeScript(compiledCode);
  }, [flowChart, input]);

  const onChangeInput = useCallback((val: any) => {
    setInput(val);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.runWrapper}>
        <Button size={'large'} type={'link'} onClick={onClickRun}>
          <PlayCircleFilled /> 运行代码
        </Button>
      </div>
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
                  src={output}
                />
              </Card>
            </Pane>
          </SplitPane>
        </Pane>
        <Pane className={styles.pane} minSize={'43px'}>
          <Console />
        </Pane>
      </SplitPane>
    </div>
  );
}

export default CodeRun;
