import React, { useState, useEffect } from 'react'
// import DataList from './dataList'
import Simple from './simple'
import styles from './index.module.less'

const previewComplex = (data: any) => {
  if (Array.isArray(data)) {
    return <span>Array[{data.length}]</span>
  }
  switch (typeof data) {
    case 'function':
      return <span>{data.name || 'fn'}()</span>
    case 'object':
    case 'undefined':
    case null:
      return '{…}'
  }
  return null
}

interface Props {
  startOpen?: boolean
  noSort?: boolean
  name: string
  value: any
}

interface State {
  open: boolean
  loading?: boolean
}

const DataItem: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>({ open: !!props.startOpen, loading: false })
  let opener = null
  let children = null
  let { name } = props
  let preview

  useEffect(() => {
    if (state.open && props.value) {
      setState({ loading: true, open: true })
    }
  }, [])

  useEffect(() => {
    const data = props.value
    const otype = typeof data
    let complex = true

    if (
      otype === 'number' ||
      otype === 'string' ||
      data == null ||
      otype === 'boolean'
    ) {
      preview = <Simple data={data} />
      complex = false
    } else {
      preview = previewComplex(data)
    }

    const open = state.open

    if (complex && Object.keys(props.value).length) {
      opener = (
        <div onClick={toggleOpen()} className={styles.opener}>
          {open ?
            <span className={styles.openerOpen} /> :
            <span className={styles.openerClose} />
          }
        </div>
      )
    }

    // if (complex && open) {
    //   children = <DataList data={data} />
    // }

    if (name.length > 50) {
      name = name.slice(0, 50) + '…'
    }
  }, [props])

  const toggleOpen = () => {
    return () => {
      const data = props.value
      const isArray = Array.isArray(data)

      if (state.loading) return
      if (!isArray && !Object.keys(props.value).length) return
      if (isArray && data.length === 0) return

      setState({
        open: !state.open
      })
    }
  }

  return (
    <li className={styles.codeWrap}>
      <div className={styles.codeBox}>
        {opener}
        <div onClick={toggleOpen()} className={styles.codeKey}>
          {name ? `${name}:` : ''}
        </div>
        <div className={styles.codeVal}>{preview}</div>
      </div>
      {children}
    </li>
  )
}

export default DataItem
