const compData = [
  {
    "text": '输入框',
    "name": 'input',
    "schema": {
      "title": "输入框",
      "type": "string"
    }
  },
  {
    "text": '编辑框',
    "name": 'textarea',
    "schema": {
      "title": "编辑框",
      "type": "string",
      "format": "textarea"
    }
  },
  {
    "text": '开关控制',
    "name": 'allBoolean',
    "schema": {
      "title": "开关控制",
      "type": "boolean",
      "ui:widget": "switch"
    }
  },
  {
    "text": '下拉单选',
    "name": 'select',
    "schema": {
      "title": "下拉单选",
      "type": "string",
      "enum": [
        "a",
        "b",
        "c"
      ],
      "enumNames": [
        "早",
        "中",
        "晚"
      ]
    }
  },
  {
    "text": '点击单选',
    "name": 'select',
    "schema": {
      "title": "点击单选",
      "type": "string",
      "enum": [
        "a",
        "b",
        "c"
      ],
      "enumNames": [
        "早",
        "中",
        "晚"
      ],
      "ui:widget": "radio"
    }
  },
  {
    "text": '下拉多选',
    "name": 'multiSelect',
    "schema": {
      "title": "下拉多选",
      "description": "可以选择多项",
      "type": "array",
      "items": {
        "type": "string"
      },
      "enum": [
        "A",
        "B",
        "C",
        "D"
      ],
      "enumNames": [
        "1",
        "2",
        "3",
        "4"
      ],
      "ui:widget": "multiSelect"
    }
  },
  {
    "text": '点击多选',
    "name": 'checkbox',
    "schema": {
      "title": "多选",
      "description": "可以勾选多个",
      "type": "array",
      "items": {
        "type": "string"
      },
      "enum": [
        "A",
        "B",
        "C",
        "D"
      ],
      "enumNames": [
        "1",
        "2",
        "3",
        "4"
      ]
    }
  },
  {
    "text": '时间选择',
    "name": 'timeSelect',
    "schema": {
      "title": "时间选择",
      "type": "string",
      "format": "time"
    }
  },
  {
    "text": '日期范围',
    "name": 'dateRangeSelect',
    "schema": {
      "title": "日期范围",
      "type": "range",
      "format": "date"
    }
  },
  {
    "text": '日期选择',
    "name": 'dateSelect',
    "schema": {
      "title": "日期选择",
      "type": "string",
      "format": "date"
    }
  }
]

export {
  compData
}
