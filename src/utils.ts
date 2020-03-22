import { useEffect, useState } from "react";
import { Dimensions, IPerson } from './types';


export function degrees2Radians(degrees: number): number {
  if (degrees > 360) {
    degrees = degrees - 360;
  }
  return degrees * (Math.PI / 180);
}

export function useWindowSize(): Dimensions {
  function getSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
  const [windowSize, setWindowSize] = useState(getSize);
  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export function getRandomPosition(max: number, radius: number): number {
  let r = Math.random() * max
  if (r <= radius) {
    r += radius * 4
  }
  if (r >= max - radius) {
    r -= radius * 4
  }
  return r
}


export function checkCollision(person1: IPerson, person2: IPerson): boolean {
  const dx = Math.abs(person2.x - person1.x)
  const dy = Math.abs(person2.y - person1.y)
  const d = Math.sqrt(dx * dx + dy * dy)
  return (d <= person1.r + person2.r) ? true : false

}

export function processCollisions(person1: IPerson, person2: IPerson) {
  if (person2.key <= person1.key) return;
  if (checkCollision(person1, person2)) {
    const interX =
      (person1.x * person2.r + person2.x * person1.r) / (person1.r + person2.r);
    const interY =
      (person1.y * person2.r + person2.y * person1.r) / (person1.r + person2.r);
    // % 1 prevents speeding up keeping the vector < 1
    const vx1 = (person1.vx + (2 * person2.vx)) % 1
    const vy1 = (person1.vy + (2 * person2.vy)) % 1
    const vx2 = (person2.vx + (2 * person1.vx)) % 1
    const vy2 = (person2.vy + (2 * person1.vy)) % 1
    // Move circles apart so there is no entanglement
    person1.x += vx1;
    person1.y += vy1;
    person2.x += vx2;
    person2.y += vy2;
    // Set new vectors
    person1.vx = vx1
    person1.vy = vy1
    person2.vx = vx2
    person2.vy = vy2
    // Infect!
    if (person1.status === 'SICK' && person2.status === 'HEALTHY') {
      person2.infection()
    }
    if (person2.status === 'SICK' && person1.status === 'HEALTHY') {
      person1.infection()
    }
  }
}

