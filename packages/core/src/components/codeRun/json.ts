const inputJson = `export default {
  // 上游数据
  pipe: {
    success: false,
    message: '未登录'
  },
  // 公用数据
  context: {
    data: {
      isLogin: false
    }
  },
  // 传入载荷
  payload: {
    name:'xxx'
  },
  // 节点配置项
  config: {
    hasLog: true
  }
}`;

const outputJson = {
  pipe: {
    success: false,
    message: '未登录'
  },
  context: {
    data: {
      isLogin: false,
      name: 'xxx'
    }
  }
}

export {
  inputJson,
  outputJson
}
