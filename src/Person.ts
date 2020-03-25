import { Status, Dimensions, IPerson, Stats } from './types'
import { getRandomPosition } from './utils';
import { select } from 'd3'

const RADIUS = 10

class Person implements IPerson {
  static count = 0
  static window: Dimensions = { height: 0, width: 0 }
  static members: Status[] = []
  static history: Stats[] = []
  x: number
  y: number
  r: number
  vx: number
  vy: number
  speed: number
  key: number
  status: Status
  infected: number | null
  incubation_time: number | null
  recovery_time: number | null
  constructor(width: number, height: number) {
    this.key = Person.count
    this.x = getRandomPosition(width, RADIUS)
    this.y = getRandomPosition(height, RADIUS)
    this.r = RADIUS
    this.vx = (Math.random() * 2) - 1
    this.vy = (Math.random() * 2) - 1
    this.speed = 1
    this.status = 'HEALTHY'
    this.infected = null // timestamp for infection or null
    this.incubation_time = null;
    this.recovery_time = null;
    Person.count++
    Person.window.height = height
    Person.window.width = width
    Person.members[Person.count] = 'HEALTHY'
  }

  move() {
    this.x += this.vx * this.speed
    this.y += this.vy * this.speed
    this.checkBoundary()
  }

  draw() {
    const el = select(`#p-${this.key}`)
    el.attr('cx', this.x).attr('cy', this.y).attr('fill', this.getColor())
  }

  infection() {
    this.status = 'INCUBATING'
    this.infected = new Date().getTime()
    Person.members[this.key] = 'INCUBATING'
    this.incubation_time = this.infected + (4 + Math.random() * 6) * 1000;
    this.recovery_time = this.incubation_time + (4 + Math.random() * 6) * 1000;
  }

  checkStatus() {
    if (this.infected) {
        const now = new Date().getTime();
        if (this.incubation_time && this.incubation_time <= now) {
            this.incubation_time = null;
            this.status = 'SICK';
            this.speed = 0.5;
            Person.members[this.key] = this.status;
        } else if (this.recovery_time && this.recovery_time <= now) {
            this.status = Math.random() < 0.02 ?  'DECEASED' : 'RECOVERED';
            this.recovery_time = null;
            if (this.status === 'DECEASED') {
                this.speed = 0;
            } else {
                this.speed = 1;
            }
            Person.members[this.key] = this.status;
        }
    }
  }

  checkBoundary() {
    if (this.x < 0 + this.r) {
      this.vx = -this.vx
      return
    }
    if (this.x > Person.window.width - this.r) {
      this.vx = -this.vx
      return
    }
    if (this.y < 0 + this.r) {
      this.vy = -this.vy
      return
    }
    if (this.y > Person.window.height - this.r) {
      this.vy = -this.vy
      return
    }
  }

  getColor() {
    switch (this.status) {
      case 'HEALTHY':
        return '#6495ED'
      case 'INCUBATING':
        return '#AC743C'
      case 'SICK':
        return '#DC143C'
      case 'RECOVERED':
        return '#66CDAA'
      case 'DECEASED':
        return '#222222'
      default:
        return 'black'
    }
  }

  static getStats(): Stats {
    let i = 0;
    let healthy = 0
    let sick = 0
    let recovered = 0
    let incubating = 0
    let deceased = 0
    while (i < this.count) {
      if (Person.members[i] === 'HEALTHY') {
        healthy++
      }
      if (Person.members[i] === 'INCUBATING') {
        incubating++
      }
      if (Person.members[i] === 'SICK') {
        sick++
      }
      if (Person.members[i] === 'RECOVERED') {
        recovered++
      }
      if (Person.members[i] === 'DECEASED') {
        deceased++
      }
      i++
    }
    return {
      healthy,
      incubating,
      sick,
      recovered,
      deceased
    }
  }
}

export default Person;
