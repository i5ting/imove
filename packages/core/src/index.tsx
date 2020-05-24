import * as React from 'react';
import { Layout } from 'antd';
import { Graph, Shape, DomEvent } from '@antv/x6';
import { ReactShape } from '@antv/x6-react-shape';
import styled from '@emotion/styled';
import Sidebar from './components/sidebar';
import Toolbar from './components/toolbar';
import Setting from './components/setting';
import createGraph from './utils/create-graph';
import { DataItem } from './data/cells';
import 'antd/lib/layout/style';

Shape.register('react', ReactShape, true);

const { Header, Sider, Content } = Layout;

const IMoveLayout = styled(Layout)`
  height: 100%;
`;

const IMoveHeader = styled(Header)`
  height: 50px;
  background: #fff;
  border-bottom: 1px solid #ddd;
`;

const IMoveTitle = styled.h2`
  line-height: 50px;
`;

const IMoveSider = styled(Sider)`
  background: #fff;
`;

const IMoveContent = styled(Content)`
  position: relative;
  padding-top: 35px;
`;

const ToolWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 35px;
  line-height: 35px;
  background: #fff;
`;

interface CoreProps {
  cells: DataItem[];
  onSave: (data: { nodes: any; edges: any }) => void;
}

interface CoreState {
  inited: boolean;
}

class Core extends React.Component<CoreProps, CoreState> {
  private graph: Graph | null = null;

  private container = React.createRef<HTMLDivElement>();

  constructor(props: CoreProps) {
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
    const { cells, onSave } = this.props;
    return (
      <IMoveLayout>
        <IMoveHeader>
          <IMoveTitle>iMove</IMoveTitle>
        </IMoveHeader>
        <IMoveLayout>
          <IMoveSider>
            {this.graph && inited && <Sidebar graph={this.graph} cells={cells} />}2
          </IMoveSider>
          <IMoveContent>
            <ToolWrapper>
              {this.graph && inited && <Toolbar graph={this.graph} onSave={onSave} />}
            </ToolWrapper>
            <div ref={this.container} tabIndex={-1} />
          </IMoveContent>
          <IMoveSider width="300">
            {this.graph && inited && <Setting graph={this.graph} />}
          </IMoveSider>
        </IMoveLayout>
      </IMoveLayout>
    );
  }
}

export default Core;
