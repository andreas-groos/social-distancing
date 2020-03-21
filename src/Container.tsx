import React, { useEffect, useRef, ReactElement } from 'react'
import { select } from 'd3'
import { useWindowSize } from './utils';

const INTERVAL = 50;

interface Props {

}

export default function Container({ }: Props): ReactElement {
  const d3svg = useRef(null);
  const { width, height } = useWindowSize();

  console.log(width, height)
  useEffect(() => {
    if (d3svg.current) {
      let svg = select(d3svg.current);
      svg.append('circle').attr('cx', 10).attr('cy', 10).attr('r', 10).attr('fill', 'green')
    }
  }, []);

  if (width && height) {
    return (
      <div>
        <svg
          className="bar-chart-container"
          width={width - 10}
          height={height - 10}
          role="img"
          ref={d3svg}
        ></svg>
      </div>
    )
  }
  return <p>Loading</p>
}
