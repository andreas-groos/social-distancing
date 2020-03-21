export interface WindowSize {
  height: number
  width: number
}

export type Status = 'HEALTHY' | 'SICK' | 'RECOVERED'

export interface IPerson {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  speed: number
  key: number
  status: Status
}