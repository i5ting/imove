import React, { useState, useEffect } from 'react'
import DataList from './dataList'
import styles from './index.module.less'

interface DataViewProps {
  data: any
  startOpen?: boolean
}

interface State {
  open: boolean
}

const DataView: React.FC<DataViewProps> = (props) => {
  const [state, setState] = useState<State>({ open: !!props.startOpen })
  let children = null
  let preview

  const toggleOpen = () => {
    return () => {
      setState({
        open: !state.open
      })
    }
  }

  useEffect(() => {
    const { data } = props
    const { open } = state
    if (!data) {
      return
    }
    const isArray = Array.isArray(data)
    children = open ? <DataList data={data} /> : null
    if (isArray) {
      preview = '[...]'
    } else {
      preview = '{...}'
    }
  }, [props])

  return (
    <ul className={styles.codeContainer}>
      <li className={styles.codeWrap}>
        <div className={styles.codeBox}>
          <div onClick={toggleOpen()} className={styles.opener}>
            {state.open ? (
              <span className={styles.openerOpen} />
            ) : (
                <span className={styles.openerClose} />
              )}
          </div>
          <div className={styles.codeVal}>{preview}</div>
        </div>
        {children}
      </li>
    </ul>
  )
}

export default DataView
