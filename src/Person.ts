import { Status, Dimensions, IPerson, Stats } from './types'
import { getRandomPosition } from './utils';
import { select } from 'd3'

const RADIUS = 10
const HEALING_TIME = 5 * 1000;

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
  constructor(width: number, height: number) {
    this.x = getRandomPosition(width, RADIUS)
    this.y = getRandomPosition(height, RADIUS)
    this.r = RADIUS
    this.vx = (Math.random() * 2) - 1
    this.vy = (Math.random() * 2) - 1
    this.speed = 1
    this.key = Person.count
    this.status = 'HEALTHY'
    this.infected = null // timestamp for infection or null
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
    this.status = 'SICK'
    this.infected = new Date().getTime()
    Person.members[this.key] = 'SICK'
  }

  checkStatus() {
    if (this.infected) {
      const now = new Date().getTime()
      let timeDifference = now - this.infected
      if (timeDifference >= HEALING_TIME) {
        this.infected = null
        this.status = 'RECOVERED'
        Person.members[this.key] = 'RECOVERED'
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
      case 'SICK':
        return '#DC143C'
      case 'RECOVERED':
        return '#66CDAA'
      default:
        return 'black'
    }
  }

  static getStats(): Stats {
    let i = 0;
    let healthy = 0
    let sick = 0
    let recovered = 0
    while (i < this.count) {
      if (Person.members[i] === 'HEALTHY') {
        healthy++
      }
      if (Person.members[i] === 'SICK') {
        sick++
      }
      if (Person.members[i] === 'RECOVERED') {
        recovered++
      }
      i++
    }
    return {
      healthy,
      sick,
      recovered
    }
  }
}

export default Person;