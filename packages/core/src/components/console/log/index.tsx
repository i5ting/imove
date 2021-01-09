import React from 'react'
import DataView from '../logView'
import { ConsoleType } from '../store'

interface Props {
  logList: ConsoleType[]
}

const Log: React.FC<Props> = (props) => {
  const renderLogList = (logList: ConsoleType[]) => {
    return logList.map((log: ConsoleType, index: number) => {
      const dataView = log.infos.map((info: any, i: number) => {
        return typeof info !== 'object' || info === null ?
          <div key={i}>{`${info}`}</div> :
          <DataView data={info} key={i} />
      })
      let ele = null

      // 根据不同console类型展示不同的样式
      switch (log.logType) {
        case 'warn':
          ele = <div
            key={index}
            style={{
              background: '#fffacd',
              color: 'orange',
              border: '1px solid #ffb930'
            }}
          >
            {dataView}
          </div>
          break
        case 'log':
          ele = <div key={index}>
            {dataView}
          </div>
          break
        case 'error':
          ele = <div
            key={index}
            style={{
              background: '#ffe4e1',
              border: '1px solid #f4a0ab'
            }}
          >
            <div style={{ color: '#dc143c' }}>{dataView}</div>
          </div>
          break
      }
      return ele
    })
  }

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>{renderLogList(props.logList)}</div>
  )
}

export default Log
