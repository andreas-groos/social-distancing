import { useEffect, useState } from "react";
import { WindowSize } from './types';

export function degrees2Radians(degrees: number): number {
  if (degrees > 360) {
    degrees = degrees - 360;
  }
  return degrees * (Math.PI / 180);
}

export function useWindowSize(): WindowSize {
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
