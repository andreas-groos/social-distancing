import React, { useEffect, useRef, useState, ReactElement } from 'react'
import { select } from 'd3'
import { useWindowSize, checkCollision, processCollisions } from './utils';
import Person from './Person'
import { Selection } from 'd3'

const INTERVAL = 10;
const COUNT = 300

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
      for (let i = 0; i < COUNT; i++) {
        persons.push(new Person(width, height))
      }
      persons[0].infection()
      // setPersons(p)
      persons.forEach(p => {
        svg.append('circle').attr('cx', p.x).attr('cy', p.y).attr('r', p.r).attr('fill', p.getColor()).attr('id', `p-${p.key}`)
      })
      setInterval(() => {
        persons.forEach(p => {
          p.move()
          const a = select(`#p-${p.key}`)
          a.attr('cx', p.x).attr('cy', p.y).attr('fill', p.getColor())
        })

        for (let i = 0; i < COUNT; i++) {
          for (let j = 0; j < COUNT; j++) {
            processCollisions(persons[i], persons[j])
          }
        }
      }, INTERVAL)
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
