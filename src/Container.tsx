import React, { useEffect, useRef, useState, ReactElement } from 'react'
import Chart from './Chart'
import { select } from 'd3'
import { processCollisions } from './utils';
import Person from './Person'
import { Selection } from 'd3'
import { Dimensions, Stats } from './types'

const INTERVAL = 10;
const COUNT = 300

interface Props {

}

export default function Container({ }: Props): ReactElement {
  const d3svg = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 })
  const [healthStats, setHealthStats] = useState<Stats>({ healthy: COUNT, sick: 0, recovered: 0 })
  const [persons, setPersons] = useState<Person[] | []>([])

  useEffect(() => {
    if (d3svg && d3svg.current) {
      const { height, width } = d3svg.current.getBoundingClientRect()
      setDimensions({ height, width })
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
        setPersons(persons)
        const stats = Person.getStats()
        setHealthStats(stats)
      }, INTERVAL)
    }
  }, []);

  return (
    <div className="container">
      <svg
        className="main"
        width={dimensions.width}
        height={dimensions.height}
        role="img"
        ref={d3svg}
      ></svg>
      <Chart stats={healthStats} persons={persons} />
    </div >
  )
}
