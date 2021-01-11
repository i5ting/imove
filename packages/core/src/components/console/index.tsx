import React, { useState, useEffect } from 'react'
interface ConsoleType {
  logType: string
  infos: any[]
}

const MyConsole: React.FC = () => {
  const [logList, setLogList] = useState<ConsoleType[]>([])

  useEffect(() => {
    executeConsole()
  }, [])

  const addLog = (log: ConsoleType) => {
    setLogList([...logList, log])
  }

  const clearLog = () => {
    setLogList([])
  }

  const executeConsole = () => {
    if (!window.console) {
      return
    }

    const methodList = ['log', 'info', 'warn', 'debug', 'error']

    // 拦截浏览器中的console方法并重写
    methodList.forEach(method => {
      // @ts-ignore
      window.console[method] = (...args: any[]) => {
        addLog({
          logType: method,
          infos: args
        })
      }
    })

    window.console.clear = () => {
      clearLog()
    }
  }

  // 根据不同console类型展示不同的样式
  const renderLogList = (logList: ConsoleType[]) => {
    return logList.map((log: ConsoleType, index: number) => {
      const renderItem = (color: string) => <p key={index} style={{ color: color }}>{log.infos}</p>
      let wrap = null
      switch (log.logType) {
        case 'warn':
          wrap = renderItem('#faad14')
          break
        case 'log':
          wrap = renderItem('#ffffff')
          break
        case 'error':
          wrap = renderItem('#ff4d4f')
          break
        case 'info':
          wrap = renderItem('#76cd75')
          break
        case 'debug':
          wrap = renderItem('#1890ff')
          break
      }
      return wrap
    })
  }

  return (
    <div style={{ height: '100%', background: '#000', padding: 10 }}>
      <div style={{ height: '100%', overflow: 'auto' }}>{renderLogList(logList)}</div>
    </div>
  )
}

export default MyConsole
