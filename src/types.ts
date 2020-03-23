export interface Dimensions {
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
  infected: number | null
  infection(): void
  move(percentage: number): void
  checkStatus(): void
}

export interface Stats {
  healthy: number
  sick: number
  recovered: number
}