import React, { useState, useEffect } from 'react'
import DataItem from './dataItem'
import styles from './index.module.less'

interface DataListProps {
  data: any
  startOpen?: boolean
  noSort?: boolean
}

const alphanumericSort = (a: string, b: string): number => {
  if ('' + +a === a) {
    if ('' + +b !== b) {
      return -1
    }
    return +a < +b ? -1 : 1
  }
  return a < b ? -1 : 1
}

const DataList: React.FC<DataListProps> = (props) => {
  const [element, setElement] = useState<any[]>([])
  const renderItem = (name: string, key: string) => {
    const data = props.data
    return (
      <DataItem
        key={key}
        name={name}
        startOpen={props.startOpen}
        value={data[name]}
      />
    )
  }

  useEffect(() => {
    const { data } = props
    if (!data) return

    const isArray = Array.isArray(data)
    const ele: any[] = []
    if (isArray) {
      data.forEach((item: any, i: number) => {
        ele.push(renderItem(String(i), String(i)))
      })
    } else {
      const names = Object.keys(data)
      if (!props.noSort) {
        names.sort(alphanumericSort)
      }
      names.forEach((name, i) => {
        ele.push(renderItem(name, name))
      })
    }
    setElement(ele)
  })

  return (
    !element.length ?
      <div>{Array.isArray(props.data) ? 'Empty array' : 'Empty object'}</div> :
      <ul className={styles.codeContainer}>{element}</ul>
  )
}

export default DataList
