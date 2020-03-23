import React, { useEffect, useRef, useState, ReactElement } from 'react'
import StatsComponent from './Stats'
import Graph from './Graph'
import Buttons from './Buttons'
import { select } from 'd3'
import { processCollisions } from './utils';
import Person from './Person'
import { Dimensions, Stats } from './types'

const INTERVAL = 10;

interface Props {

}

export default function Container({ }: Props): ReactElement {
  const d3svg = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 })
  const [healthStats, setHealthStats] = useState<Stats>({ healthy: 0, sick: 0, recovered: 0 })
  const [persons, setPersons] = useState<Person[] | []>([])
  const [id, setId] = useState<any>()
  const [count, setCount] = useState(0)
  const [itsOver, setItsOver] = useState(false)

  useEffect(() => {
    if (d3svg && d3svg.current) {
      const { height, width } = d3svg.current.getBoundingClientRect()
      const COUNT = height * width / 3000
      setHealthStats({ healthy: COUNT, sick: 0, recovered: 0 })
      setDimensions({ height, width })
      let svg = select(d3svg.current);
      const persons = [] as Person[]
      for (let i = 0; i < (COUNT); i++) {
        persons.push(new Person(width, height))
      }
      persons[0].infection()
      persons.forEach(p => {
        svg.append('circle').attr('cx', p.x).attr('cy', p.y).attr('r', p.r).attr('fill', p.getColor()).attr('id', `p-${p.key}`)
      })
      setPersons(persons)
    }
  }, []);

  useEffect(() => {
    if (id) {
      clearInterval(id)
    }
    if (itsOver) {
      return
    }
    if (d3svg && d3svg.current) {
      const { height, width } = d3svg.current.getBoundingClientRect()
      const COUNT = Math.floor(height * width / 3000)
      setCount(COUNT)
      let inter = setInterval(() => {
        persons.forEach((p) => {
          p.move()
          p.draw()
          p.checkStatus()
        })
        for (let k = 0; k <= count; k++) {
          for (let j = 0; j <= count; j++) {
            processCollisions(persons[k], persons[j])
          }
        }
        const stats = Person.getStats()
        if (stats.sick === 0) {
          setItsOver(true)
        }
        setHealthStats(stats)
        Person.history.push(stats)
      }, INTERVAL)
      setId(inter)
    }
  }, [persons, itsOver])

  const handleClick = (value: number): void => {
    let i = 0;
    const cloned = [...persons]
    while (i <= count) {
      if (Math.random() * 100 >= value) {
        cloned[i].speed = 0
      } else {
        cloned[i].speed = 1
      }
      i++
    }
    setPersons(cloned)
  }

  if (itsOver) {
    return <Graph history={Person.history} />

  }

  return (
    <div className="container">
      <svg
        className="main"
        width={dimensions.width}
        height={dimensions.height}
        role="img"
        ref={d3svg}
      ></svg>
      <StatsComponent stats={healthStats} />
      <Buttons handleClick={handleClick} />
    </div >
  )
}
