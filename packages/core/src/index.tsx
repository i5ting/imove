import * as React from 'react';
import { Layout } from 'antd';
import { Graph, DomEvent } from '@antv/x6';
import styled from '@emotion/styled';
import Toolbar from './components/toolbar';
import { createGraph } from './utils/create-graph';
import 'antd/lib/layout/style';

export interface CoreState {
  inited: boolean;
}

const { Header, Sider, Content } = Layout;

const IMoveLayout = styled(Layout)`
  height: 100%;
`;

const IMoveHeader = styled(Header)`
  background: #fff;
  border-bottom: 1px solid #ddd;
`;

const IMoveSider = styled(Sider)`
  background: #fff;
`;

class Core extends React.Component<{}, CoreState> {
  private graph: Graph | null = null;

  private container = React.createRef<HTMLDivElement>();

  constructor(props: {}) {
    super(props);
    this.state = {
      inited: false,
    };
  }

  componentDidMount(): void {
    const container = this.container.current;
    if (container) {
      DomEvent.disableContextMenu(container);
      this.graph = createGraph(container);
      this.graph.center();
      this.setState({
        inited: true,
      });
    }
  }

  render(): JSX.Element {
    const { inited } = this.state;
    return (
      <IMoveLayout>
        <IMoveHeader>
          <h2>iMove</h2>
        </IMoveHeader>
        <IMoveLayout>
          <IMoveSider>{inited && <Toolbar />}</IMoveSider>
          <Content>
            <div ref={this.container} />
          </Content>
          <IMoveSider>Sider</IMoveSider>
        </IMoveLayout>
      </IMoveLayout>
    );
  }
}

export default Core;
