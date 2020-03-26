export interface Dimensions {
  height: number
  width: number
}

export type Status = 'HEALTHY' | 'INCUBATING' | 'SICK' | 'RECOVERED' | 'DECEASED'

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
  incubation_time: number | null
  recovery_time: number | null
  infection(): void
  move(percentage: number): void
  checkStatus(): void
  draw(): void
}

export interface Stats {
  healthy: number
  incubating: number
  sick: number
  recovered: number
  deceased: number
}
