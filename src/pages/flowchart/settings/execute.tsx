import * as React from "react";
import { Select, Input } from "antd";

const { Option } = Select;

class ExecuteSetting extends React.Component<
  ExecuteSetting.Props,
  ExecuteSetting.State
> {
  render() {
    return (
      <div className="execute-setting">
        <label>
          <div>事件名称</div>
          <Select
            defaultValue={this.props.data.title}
            style={{ width: 120 }}
            onChange={this.props.onTitleChange}
          >
            <Option value="empty">empty</Option>
            <Option value="resolve">resolve</Option>
            <Option value="reject">reject</Option>
          </Select>
        </label>
        <label>
          <div>action</div>
          <Select
            defaultValue={this.props.data.action}
            style={{ width: 120 }}
            onChange={this.props.onActionChange}
          >
            <Option value="empty">context赋值</Option>
          </Select>
        </label>
        <label>
          <div><b>context key</b></div>
          <Input
            defaultValue={this.props.data.contextKey}
            type="text"
            allowClear={true}
            onBlur={this.props.onKeyChange}
          />
        </label>
        <label>
          <div><b>value path</b></div>
          <Input
            defaultValue={this.props.data.contextValue}
            type="text"
            allowClear={true}
            onBlur={this.props.onValueChange}
          />
        </label>
      </div>
    );
  }
}

export default ExecuteSetting;

export namespace ExecuteSetting {
  export interface Props {
    data: any;
    onTitleChange: (e: any) => void;
    onActionChange: (action: string) => void;
    onKeyChange: (e: any) => void;
    onValueChange: (e: any) => void;
  }

  export interface State {}
}
