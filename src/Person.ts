import { Status, WindowSize, IPerson } from './types'
import { getRandomPosition } from './utils';

const RADIUS = 10

class Person implements IPerson {
  static count = 0
  static window: WindowSize = { height: 0, width: 0 }
  x: number
  y: number
  r: number
  vx: number
  vy: number
  speed: number
  key: number
  status: Status
  constructor(width: number, height: number) {
    this.x = getRandomPosition(width, RADIUS)
    this.y = getRandomPosition(height, RADIUS)
    this.r = RADIUS
    this.vx = (Math.random() * 2) - 1
    this.vy = (Math.random() * 2) - 1
    this.speed = 1
    this.key = Person.count
    this.status = 'HEALTHY'
    Person.count++
    Person.window.height = height
    Person.window.width = width
  }

  move() {
    this.x += this.vx * this.speed
    this.y += this.vy * this.speed
    this.checkBoundary()
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
        return 'blue'
      case 'SICK':
        return 'red'
      case 'RECOVERED':
        return 'green'
      default:
        return 'black'
    }
  }
}

export default Person;