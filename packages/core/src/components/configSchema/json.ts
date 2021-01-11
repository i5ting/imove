const defaultConfig = `{
  "schema": {
    "type": "object",
    "properties": {
      "AllString": {
        "title": "string类",
        "type": "object",
        "properties": {
          "input": {
            "title": "输入框",
            "type": "string",
            "ui:options": {
              "placeholder": "商品名称"
            }
          }
        }
      },
      "allNumber": {
        "title": "number类",
        "type": "object",
        "properties": {
          "number": {
            "title": "数字输入框",
            "description": "1 - 1000",
            "type": "number",
            "min": 1,
            "max": 1000
          }
        }
      },
      "allBoolean": {
        "title": "boolean类",
        "type": "object",
        "properties": {
          "radio": {
            "title": "是否通过",
            "type": "boolean"
          }
        }
      }
    }
  }
}`;

const compData = [
  {
    "text": '简单输入框',
    "name": 'input',
    "schema": {
      "title": "简单输入框",
      "type": "string",
      "ui:options": {
        "placeholder": "名称"
      }
    }
  },
  {
    "text": '简单文本编辑框',
    "name": 'textarea',
    "schema": {
      "title": "简单文本编辑框",
      "type": "string",
      "format": "textarea"
    }
  },
  {
    "text": '带清空x按钮',
    "name": 'inputX',
    "schema": {
      "title": "字符串",
      "description": "带清空x按钮",
      "type": "string",
      "default": "input placeholder",
      "ui:options": {
        "allowClear": true
      },
      "ui:width": "50%"
    }
  },
  {
    "text": '前置/后置标签',
    "name": 'stringPreSub',
    "schema": {
      "title": "前置/后置标签",
      "type": "string",
      "ui:options": {
        "addonBefore": "长度",
        "addonAfter": "px"
      },
      "ui:width": "50%"
    }
  },
  {
    "text": '颜色选择',
    "name": 'color',
    "schema": {
      "title": "颜色选择",
      "type": "string",
      "format": "color"
    }
  },
  {
    "text": '日期选择',
    "name": 'date',
    "schema": {
      "title": "日期选择",
      "type": "string",
      "format": "date"
    }
  },
  {
    "text": '上传文件',
    "name": 'upload',
    "schema": {
      "title": "上传文件",
      "type": "string",
      "format": "upload",
      "ui:options": {
        "action": "https://www.mocky.io/v2/5cc8019d300000980a055e76"
      }
    }
  },
  {
    "text": 'number类',
    "name": 'allNumber',
    "schema": {
      "title": "number类",
      "type": "object",
      "properties": {
        "number1": {
          "title": "数字输入框",
          "description": "1 - 1000",
          "type": "number",
          "min": 1,
          "max": 1000
        },
        "number2": {
          "title": "带滑动条",
          "type": "number",
          "ui:widget": "slider"
        }
      }
    }
  },
  {
    "text": 'boolean类',
    "name": 'allBoolean',
    "schema": {
      "title": "boolean类",
      "type": "object",
      "properties": {
        "radio": {
          "title": "是否通过",
          "type": "boolean"
        },
        "switch": {
          "title": "开关控制",
          "type": "boolean",
          "ui:widget": "switch"
        }
      }
    }
  },
  {
    "text": 'range类',
    "name": 'allRange',
    "schema": {
      "title": "range类",
      "type": "object",
      "properties": {
        "dateRange": {
          "title": "日期范围",
          "type": "range",
          "format": "dateTime",
          "ui:options": {
            "placeholder": [
              "开始时间",
              "结束时间"
            ]
          }
        }
      }
    }
  },
  {
    "text": '选择类',
    "name": 'allEnum',
    "schema": {
      "title": "选择类",
      "type": "object",
      "properties": {
        "select": {
          "title": "单选",
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
        },
        "radio": {
          "title": "单选",
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
        },
        "multiSelect": {
          "title": "多选",
          "description": "下拉多选",
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
            "杭州",
            "武汉",
            "湖州",
            "贵阳"
          ],
          "ui:widget": "multiSelect"
        },
        "boxes": {
          "title": "多选",
          "description": "checkbox",
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
            "杭州",
            "武汉",
            "湖州",
            "贵阳"
          ]
        }
      }
    }
  },
  {
    "text": '可折叠对象',
    "name": 'obj1',
    "schema": {
      "title": "可折叠对象",
      "description": "这是个对象类型",
      "type": "object",
      "ui:options": {
        "collapsed": true
      },
      "properties": {
        "input1": {
          "title": "输入框1",
          "type": "string"
        },
        "input2": {
          "title": "输入框2",
          "type": "string"
        }
      }
    }
  },
  {
    "text": '对象数组',
    "name": 'listName2',
    "schema": {
      "title": "对象数组",
      "description": "对象数组嵌套功能",
      "type": "array",
      "minItems": 1,
      "maxItems": 3,
      "ui:displayType": "row",
      "items": {
        "type": "object",
        "properties": {
          "input1": {
            "title": "简单输入框",
            "type": "string"
          },
          "selet1": {
            "title": "单选",
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
        }
      }
    }
  },
  {
    "text": 'url输入框',
    "name": 'url',
    "schema": {
      "title": "url输入框",
      "type": "string",
      "format": "url"
    }
  },
  {
    "text": '图片展示',
    "name": 'image',
    "schema": {
      "title": "图片展示",
      "type": "string",
      "format": "image"
    }
  },
  {
    "text": 'email输入框',
    "name": 'email',
    "schema": {
      "title": "email输入框",
      "type": "string",
      "format": "email"
    }
  },
  {
    "text": 'list套list',
    "name": 'listAndList',
    "schema": {
      "title": "list套list",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "input1": {
            "title": "简单输入框",
            "type": "string"
          },
          "list4": {
            "title": "数组",
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "input1": {
                  "title": "输入框1",
                  "type": "string"
                },
                "input2": {
                  "title": "输入框2",
                  "type": "string"
                }
              }
            },
            "ui:options": {
              "drawer": true
            }
          }
        }
      }
    }
  },
  {
    "text": '整体隐藏',
    "name": 'hide',
    "schema": {
      "title": "整体隐藏",
      "type": "object",
      "properties": {
        "showMore": {
          "title": "显示更多",
          "type": "boolean"
        },
        "x1": {
          "title": "输入框1",
          "type": "string",
          "ui:hidden": "{{rootValue.showMore === false}}"
        },
        "x2": {
          "title": "输入框2",
          "type": "string",
          "ui:hidden": "{{rootValue.showMore === false}}"
        }
      }
    }
  },
  {
    "text": '选项联动',
    "name": 'link',
    "schema": {
      "title": "选项联动",
      "type": "object",
      "properties": {
        "bi": {
          "title": "汇款币种",
          "type": "string",
          "enum": [
            "rmb",
            "dollar"
          ],
          "enumNames": [
            "人民币",
            "美元"
          ]
        },
        "inputName": {
          "title": "金额",
          "description": "{{rootValue.bi === 'dollar' ? '一次汇款不超过150美元':'一次汇款不超过1000元'}}",
          "type": "string",
          "ui:options": {
            "addonBefore": "{{rootValue.bi === 'rmb'? '￥':'$'}}",
            "addonAfter": "{{rootValue.bi === 'rmb'? '元':'美元'}}"
          }
        }
      }
    }
  },
  {
    "text": '动态增加',
    "name": 'listAdd',
    "schema": {
      "title": "列表/显示不同组件",
      "type": "object",
      "properties": {
        "ruleList": {
          "title": "球员筛选",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "attr": {
                "title": "标准",
                "type": "string",
                "enum": [
                  "goal",
                  "league"
                ],
                "enumNames": [
                  "入球数",
                  "所在联盟"
                ],
                "ui:width": "40%"
              },
              "relation": {
                "title": "-",
                "type": "string",
                "enum": [
                  ">",
                  "<",
                  "="
                ],
                "ui:hidden": "{{rootValue.attr === 'league'}}",
                "ui:width": "20%"
              },
              "goal": {
                "title": "入球数",
                "type": "string",
                "pattern": "^[0-9]+$",
                "message": {
                  "pattern": "输入正确得分"
                },
                "ui:hidden": "{{rootValue.attr !== 'goal'}}",
                "ui:width": "40%"
              },
              "league": {
                "title": "名称",
                "type": "string",
                "enum": [
                  "a",
                  "b",
                  "c"
                ],
                "enumNames": [
                  "西甲",
                  "英超",
                  "中超"
                ],
                "ui:hidden": "{{rootValue.attr !== 'league'}}",
                "ui:width": "40%"
              }
            }
          }
        }
      }
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
    "text": '日期选择（到日）',
    "name": 'dateSelect',
    "schema": {
      "title": "日期选择",
      "type": "string",
      "format": "date",
      "ui:options": {
        "format": "YY/MM/DD"
      }
    }
  },
  {
    "text": '日期选择（到秒）',
    "name": 'dateSelectToSecond',
    "schema": {
      "title": "日期选择",
      "description": "精确到秒",
      "type": "string",
      "format": "dateTime"
    }
  }
]

export {
  defaultConfig,
  compData
}
