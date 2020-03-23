import React, { ReactElement } from 'react'

interface Props {
  handleClick(peopleMoving: number): void
}

export default function Buttons({ handleClick }: Props): ReactElement {
  return (
    <div id="buttons">
      <div><button onClick={() => handleClick(100)}>nothing happens</button></div>
      <div><button onClick={() => handleClick(90)}>10% shelter in place</button></div>
      <div><button onClick={() => handleClick(50)}>50% shelter in place</button></div>
      <div><button onClick={() => handleClick(10)}>90% shelter in place</button></div>
      <div><button onClick={() => handleClick(0)}>complete lockdown</button></div>
    </div>
  )
}
