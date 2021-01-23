const compData = [
  {
    text: 'Input',
    name: 'input',
    schema: {
      title: 'Input',
      type: 'string',
      description: '输入框',
    },
  },
  {
    text: 'Textarea',
    name: 'textarea',
    schema: {
      title: 'Textarea',
      type: 'string',
      format: 'textarea',
      description: '文本编辑框',
    },
  },
  {
    text: 'Switch',
    name: 'allBoolean',
    schema: {
      title: 'Switch',
      type: 'boolean',
      'ui:widget': 'switch',
      description: '开关控制',
    },
  },
  {
    text: 'Select',
    name: 'select',
    schema: {
      title: 'Select',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['早', '中', '晚'],
      description: '下拉单选',
    },
  },
  {
    text: 'MultiSelect',
    name: 'multiSelect',
    schema: {
      title: 'MultiSelect',
      description: '下拉多选',
      type: 'array',
      items: {
        type: 'string',
      },
      enum: ['A', 'B', 'C', 'D'],
      enumNames: ['1', '2', '3', '4'],
      'ui:widget': 'multiSelect',
    },
  },
  {
    text: 'Checkbox',
    name: 'checkbox',
    schema: {
      title: 'Checkbox',
      description: '点击多选',
      type: 'array',
      items: {
        type: 'string',
      },
      enum: ['A', 'B', 'C', 'D'],
      enumNames: ['1', '2', '3', '4'],
    },
  },
  {
    text: 'TimePicker',
    name: 'timeSelect',
    schema: {
      title: 'TimePicker',
      type: 'string',
      format: 'time',
      description: '时间选择',
    },
  },
  {
    text: 'DatePicker',
    name: 'dateSelect',
    schema: {
      title: 'DatePicker',
      type: 'string',
      format: 'date',
      description: '日期选择',
    },
  },
  {
    text: 'DateRange',
    name: 'dateRangeSelect',
    schema: {
      title: 'DateRange',
      type: 'range',
      format: 'date',
      description: '日期范围选择',
    },
  },
];

export { compData };
