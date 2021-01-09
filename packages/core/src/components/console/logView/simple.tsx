import React, { useState, useEffect } from 'react'

interface Props {
  data: any
}

const Simple: React.FC<Props> = (props) => {
  const [data, setData] = useState(props.data)

  const valueToText = (value: any) => {
    if (value === undefined) {
      return 'undefined'
    } else if (typeof value === 'number') {
      return value.toString()
    }
    return JSON.stringify(value)
  }

  useEffect(() => {
    if (typeof data === 'string' && data.length > 200) {
      setData(data.slice(0, 200) + '…')
    }
  }, [props])

  return <div style={{ color: '#333' }}>{valueToText(data)}</div>
}

export default Simple
