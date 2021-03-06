import React, { ReactElement } from 'react'
import { Stats } from './types'

interface Props {
  stats: Stats
}

export default function StatsComponent({ stats }: Props): ReactElement {
  return (
    <div id="stats">
      <p>Healthy: {stats.healthy}</p>
      <p>Incubating: {stats.incubating}</p>
      <p>Sick: {stats.sick}</p>
      <p>Recovered: {stats.recovered}</p>
      <p>Deceased: {stats.deceased}</p>

    </div>
  )
}
