import * as React from "react";
import { Input, Select } from "antd";

const { Option } = Select;

class StateSetting extends React.Component<
  StateSetting.Props,
  StateSetting.State
> {
  render() {
    return (
      <div>
        <label>
          <div>状态名称</div>
          <Input
            defaultValue={this.props.data.title}
            type="text"
            allowClear={true}
            onBlur={this.props.onTitleChange}
          />
        </label>
        <label>
          <div>服务类型</div>
          <Select
            defaultValue={this.props.data.serviceType}
            style={{ width: 120 }}
            onChange={this.props.onSerTypeChange}
          >
            <Option value="none">none</Option>
            <Option value="invoke">invoke</Option>
          </Select>
        </label>
        <label>
          <div>api</div>
          <Input
            defaultValue={this.props.data.api}
            type="text"
            allowClear={true}
            onBlur={this.props.onApiChange}
          />
        </label>
      </div>
    );
  }
}

export default StateSetting;

export namespace StateSetting {
  export interface Props {
    data: any;
    onTitleChange: (e: any) => void;
    onApiChange: (e: any) => void;
    onSerTypeChange: (serviceType: string) => void;
  }

  export interface State {}
}
