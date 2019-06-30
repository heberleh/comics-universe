
import React from 'react'
import Axis from './Axis'

export default ({minSize, scales, margins, svgDimensions, ticks, dataModel}) => {

  const xProps = {
    orient: 'Bottom',
    scale: scales.xScale,
    translate: `translate(0, ${svgDimensions.height - margins.bottom})`,
    tickSize: svgDimensions.height - margins.top - margins.bottom,
    ticks: ticks.x.ticks,
    tickPadding: ticks.x.tickPadding
  }

  const yProps = {
    orient: 'Left',
    scale: scales.yScale,
    translate: `translate(${margins.left}, 0)`,
    tickSize: svgDimensions.width - margins.left - margins.right,
    ticks: ticks.y.ticks,
    tickPadding: ticks.y.tickPadding
  }

  return (
    <g>
      {/* <Axis {...xProps} /> uncomment this and set up x-axis*/} 
      <Axis {...yProps} />
    </g>
  )

}