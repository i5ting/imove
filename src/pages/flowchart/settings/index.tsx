import React from "react";
import { Graph, Cell } from "@antv/x6";
import StateSetting from "./state";
import ExecuteSetting from "./execute";

export class Setting extends React.Component<Setting.Props, Setting.State> {
  constructor(props: Setting.Props) {
    super(props);
    this.state = this.getNextState(props);

    props.graph.on("selection:changed", () => {
      this.setState(this.getNextState());
    });
  }

  getNextState(props: Setting.Props = this.props) {
    return {
      selectedCells: props.graph.getSelectedCells()
    };
  }

  onStatusTitleChange = (e: any) => {
    const value = e.target.value;
    if (value && value.trim()) {
      const cell = this.state.selectedCells[0];
      const data = cell.data;
      this.props.graph.setCellData(cell, {
        ...data,
        title: value.trim()
      });
    }
  };

  onExcuteTitleChange = (title: string) => {
    const cell = this.state.selectedCells[0];
    const data = cell.data;
    this.props.graph.setCellData(cell, {
      ...data,
      title
    });
  };

  onSerTypeChange = (serviceType: string) => {
    const cell = this.state.selectedCells[0];
    const data = cell.data;
    this.props.graph.setCellData(cell, {
      ...data,
      serviceType
    });
  };

  onActionChange = (action: string) => {
    const cell = this.state.selectedCells[0];
    const data = cell.data;
    this.props.graph.setCellData(cell, {
      ...data,
      action
    });
  };

  onApiChange = (e: any) => {
    const value = e.target.value;
    if (value && value.trim()) {
      const cell = this.state.selectedCells[0];
      const data = cell.data;
      this.props.graph.setCellData(cell, {
        ...data,
        api: value.trim()
      });
    }
  };

  onKeyChange = (e: any) => {
    const value = e.target.value;
    if (value && value.trim()) {
      const cell = this.state.selectedCells[0];
      const data = cell.data;
      this.props.graph.setCellData(cell, {
        ...data,
        contextKey: value.trim()
      });
    }
  };

  onValueChange = (e: any) => {
    const value = e.target.value;
    if (value && value.trim()) {
      const cell = this.state.selectedCells[0];
      const data = cell.data;
      this.props.graph.setCellData(cell, {
        ...data,
        contextValue: value.trim()
      });
    }
  };

  render() {
    if (this.state.selectedCells.length === 1) {
      const cell = this.state.selectedCells[0];
      const data = cell.data;
      return (
        <div className="flowchart-format">
          <div className="flowchart-sidebar-title">流程设置</div>
          <div className="flowchart-sidebar-content">
            {data && data.type === "status" && (
              <StateSetting
                data={data}
                onTitleChange={this.onStatusTitleChange}
                onApiChange={this.onApiChange}
                onSerTypeChange={this.onSerTypeChange}
              />
            )}
            {data && data.type === "execute" && (
              <ExecuteSetting
                data={data}
                onTitleChange={this.onExcuteTitleChange}
                onActionChange={this.onActionChange}
                onKeyChange={this.onKeyChange}
                onValueChange={this.onValueChange}
              />
            )}
          </div>
        </div>
      );
    }
    return null;
  }
}

export namespace Setting {
  export interface Props {
    graph: Graph;
  }

  export interface State {
    selectedCells: Cell[];
  }
}
