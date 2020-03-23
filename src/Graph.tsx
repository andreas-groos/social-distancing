import React, { useEffect, useState, ReactElement } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { Stats } from './types'


interface GraphPoint {
  x: string
  y: number
}

interface GraphData {
  id: string
  color: string
  data: GraphPoint[]
}
interface Props {
  history: Stats[]

}

export default function Graph({ history }: Props): ReactElement {
  const [data, setData] = useState<GraphData[]>([{ id: 'healthy', color: 'hsla(219, 79%, 66%, 1)', data: [] }, { id: 'sick', color: 'hsla(348, 83%, 47%, 1)', data: [] }, { id: 'recovered', color: 'hsla(160, 51%, 60%, 1)', data: [] }])

  useEffect(() => {
    const temp = [...data]
    history.forEach((h, idx) => {
      if (idx % 30 === 0) {
        temp[0].data.push({ x: idx.toString(), y: h.healthy })
        temp[1].data.push({ x: idx.toString(), y: h.sick })
        temp[2].data.push({ x: idx.toString(), y: h.recovered })
      }
    })
    setData(temp)
    console.log('temp', temp)
  }, [])

  return (
    <div id="graph">
      <ResponsiveLine data={data} curve="monotoneX" enableArea areaOpacity={0.2} pointSize={0} enableGridX={false} enableGridY={false} colors={{ datum: 'color' }} />
    </div>
  )
}
