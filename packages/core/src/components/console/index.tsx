import React, { useEffect } from 'react'
import Log from './log'
import logStore, { ConsoleType } from './store'

const MyConsole: React.FC = () => {
  const console: any = {}

  useEffect(() => {
    executeConsole()
  }, [])

  const processLog = (item: ConsoleType) => {
    const { logType } = item
    let { infos = [] } = item
    if (!infos.length) return
    infos = [].slice.call(infos || [])
    logStore.addLog({ logType, infos })
    printOriginLog(item)
  }

  const clearLog = () => {
    logStore.clearLog()
  }

  const printOriginLog = (item: ConsoleType) => {
    const { logType, infos } = item
    if (typeof console[logType] === 'function') {
      console[logType].apply(window.console, infos)
    }
  }

  const executeConsole = () => {
    if (!window.console) {
      return
    }

    // 模拟浏览器中的console方法
    const methodList = ['log', 'info', 'warn', 'debug', 'error']
    methodList.map(method => {
      // @ts-ignore
      console[method] = window.console[method]
    })

    methodList.map(method => {
      // @ts-ignore
      window.console[method] = (...args: any[]) => {
        processLog({
          logType: method,
          infos: args
        })
      }
    })

    window.console.clear = (...args: any[]) => {
      clearLog()
      console.clear.apply(window.console, args)
    }
  }

  return (
    <div style={{ height: '100%' }}>
      <Log logList={logStore.computeLogList} />
    </div>
  )
}

export default MyConsole
