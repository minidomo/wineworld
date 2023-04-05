import './style.css';

import * as d3 from 'd3';
import React, { useState } from 'react';

// d3 documentation https://github.com/d3/d3/blob/main/API.md

const dotTextYOffset = 20;
const dotActiveRadius = 6;
const dotInactiveRadius = 4;
const dotActiveStrokeRadius = 2;
const dotInactiveStrokeRadius = 0;

export default function LineGraph(props) {
  const [activeIndex, setActiveIndex] = useState(null);

  const [yAxisData, setYAxisData] = useState({
    width: 0.0,
    loaded: false,
  });

  const [xAxisData, setXAxisData] = useState({
    height: 0.0,
    loaded: false,
  });

  const { targetWidth, targetHeight, margin, color, yAxisLabel, xAxisLabel, timeFormat, title, data, className } =
    props;

  const width = targetWidth - margin.left - margin.right;
  const height = targetHeight - margin.top - margin.bottom;

  const yMinValue = d3.min(data, d => d.value);
  const yMaxValue = d3.max(data, d => d.value);

  const getX = d3
    .scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([0, width]);

  const getY = d3
    .scaleLinear()
    .domain([yMinValue - 1, yMaxValue + 2])
    .range([height, 0]);

  const initXAxis = ref => {
    if (!ref) return;

    const xAxis = d3.axisBottom(getX);
    xAxis.tickValues(getX.ticks(d3.timeHour.every(2)));
    d3.select(ref).call(xAxis.tickFormat(d3.timeFormat(timeFormat)));

    if (!xAxisData.loaded) {
      setXAxisData({
        height: ref.getBBox().height,
        loaded: true,
      });
    }
  };

  const initYAxis = ref => {
    if (!ref) return;

    const yAxis = d3.axisLeft(getY);
    d3.select(ref).call(yAxis);

    if (!yAxisData.loaded) {
      setYAxisData({
        width: ref.getBBox().width,
        loaded: true,
      });
    }
  };

  const initYAxisLabel = ref => {
    if (!ref) return;
    const leftBound = -margin.left;
    const rightBound = -yAxisData.width;
    const midpoint = (leftBound + rightBound) / 2;
    ref.setAttribute('x', midpoint);
  };

  const initXAxisLabel = ref => {
    if (!ref) return;
    const topBound = height + xAxisData.height;
    const botBound = height + margin.bottom;
    const midpoint = (topBound + botBound) / 2;
    ref.setAttribute('y', midpoint);
  };

  const initTitleLabel = ref => {
    if (!ref) return;
    const textHeight = ref.getBBox().height;
    ref.setAttribute('y', -textHeight / 2);
  };

  const linePath = d3
    .line()
    .x(d => getX(d.date))
    .y(d => getY(d.value))(data);

  const areaPath = d3
    .area()
    .x(d => getX(d.date))
    .y0(d => getY(d.value))
    .y1(() => getY(yMinValue - 1))(data);

  const handleMouseMove = e => {
    const coords = d3.pointer(e, this);
    const date = getX.invert(coords[0]);
    const index = d3.bisector(d => d.date).center(data, date);
    setActiveIndex(index);
  };

  const handleMouseLeave = () => setActiveIndex(null);

  let lineGraphClassName = 'line-graph wrapper';
  if (className) {
    lineGraphClassName += ` ${className}`.trimEnd();
  }

  return (
    <div className={`${lineGraphClassName}`}>
      <svg
        className='svg-wrapper'
        width={targetWidth}
        height={targetHeight}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <g className='g-wrapper' transform={`translate(${margin.left},${margin.top})`}>
          <g className='x-axis' transform={`translate(0,${height})`} ref={initXAxis} />
          <g className='y-axis' ref={initYAxis} />
          <path className='line' fill="none" strokeWidth={3} stroke={color} d={linePath} />
          <path className='area' fill={color} d={areaPath} opacity={0.3} />
          <text className='x-axis-text' x={width / 2} textAnchor="middle" ref={initXAxisLabel}>
            {xAxisLabel}
          </text>
          <text
            className='y-axis-text'
            y={height / 2}
            transform="rotate(-90)"
            textAnchor="middle"
            ref={initYAxisLabel}
          >
            {yAxisLabel}
          </text>
          <text className='title' x={width / 2} textAnchor="middle" ref={initTitleLabel}>
            {title}
          </text>
          {data.map((item, index) => (
            <g className='dot-wrapper' key={index}>
              <text
                className='dot-text'
                x={getX(item.date)}
                y={getY(item.value) - dotTextYOffset}
                textAnchor="middle"
              >
                {index === activeIndex ? item.value : ''}
              </text>
              <circle
                className='dot-circle'
                cx={getX(item.date)}
                cy={getY(item.value)}
                r={index === activeIndex ? dotActiveRadius : dotInactiveRadius}
                fill={color}
                strokeWidth={index === activeIndex ? dotActiveStrokeRadius : dotInactiveStrokeRadius}
                style={{ transition: 'ease-out .1s' }}
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
