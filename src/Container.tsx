import React, { useEffect, useRef, useState, ReactElement } from 'react'
import { select } from 'd3'
import { useWindowSize } from './utils';
import Person from './Person'

const INTERVAL = 50;
const COUNT = 30

interface Props {

}

export default function Container({ }: Props): ReactElement {
  const d3svg = useRef(null);
  const { width, height } = useWindowSize();
  const [persons, setPersons] = useState<Person | []>([])

  console.log(width, height)
  useEffect(() => {
    if (d3svg.current) {
      let svg = select(d3svg.current);
      const persons = [] as Person[]
      for (let i = 0; i <= COUNT; i++) {
        persons.push(new Person(width, height))
      }
      // setPersons(p)
      persons.forEach(p => {
        svg.append('circle').attr('cx', p.x).attr('cy', p.y).attr('r', p.r).attr('fill', p.getColor()).attr('id', `p-${p.key}`)
      })
      setInterval(() => {
        persons.forEach(p => {
          p.move()
          const a = select(`#p-${p.key}`)
          a.attr('cx', p.x).attr('cy', p.y)
        })
      }, 10)
    }
  }, []);

  if (width && height) {
    return (
      <div>
        <svg
          className="bar-chart-container"
          width={width - 10}
          height={height - 10}
          role="img"
          ref={d3svg}
        ></svg>
      </div>
    )
  }
  return <p>Loading</p>
}
