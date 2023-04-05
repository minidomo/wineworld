import React from "react";
import * as d3 from 'd3';
import './LineGraph.css';

export default function LineGraph(props) {
  // const [activeIndex, setActiveIndex] = useState(null);

  const {
    targetWidth,
    targetHeight,
    margin,
    color,
    yAxisLabel,
    xAxisLabel,
    timeFormat,
    data,
  } = props;

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

  const xAxis = ref => {
    const xAxis = d3.axisBottom(getX);
    xAxis.tickValues(getX.ticks(d3.timeHour.every(2)))
    d3.select(ref).call(xAxis.tickFormat(d3.timeFormat(timeFormat)));
  };

  const yAxis = ref => {
    // const yAxis = d3.axisLeft(getY).tickSize(-width).tickPadding(7);
    const yAxis = d3.axisLeft(getY);
    d3.select(ref).call(yAxis);
  };

  const linePath = d3
    .line()
    .x(d => getX(d.date))
    .y(d => getY(d.value))
    .curve(d3.curveMonotoneX)(data);

  // const areaPath = d3
  //     .area()
  //     .x((d) => getX(d.date))
  //     .y0((d) => getY(d.price))
  //     .y1(() => getY(yMinValue - 1))
  //     .curve(d3.curveMonotoneX)(data);

  // const handleMouseMove = (e) => {
  //     const bisect = d3.bisector((d) => d.date).left;
  //     const x0 = getX.invert(d3.pointer(e, this)[0]);
  //     const index = bisect(data, x0, 1);
  //     setActiveIndex(index);
  // };

  // const handleMouseLeave = () => {
  //     setActiveIndex(null);
  // };

  return (
    <div className="wrapper">
      <svg
        width={targetWidth}
        height={targetHeight}
      // onMouseMove={handleMouseMove}
      // onMouseLeave={handleMouseLeave}
      >
        <g transform={`translate(${margin.left},${margin.top})`}>
          <g transform={`translate(0,${height})`} ref={xAxis} />
          <g ref={yAxis} />
          <path fill='none' strokeWidth={3} stroke={color} d={linePath} />
          <text
            className="x-axis label"
            x={width / 2}
            y={height + margin.bottom}
            textAnchor='middle'
          >
            {xAxisLabel}
          </text>
          <text
            className='y-axis label'
            x={-margin.left}
            y={height / 2}
            dx='1em'
            transform='rotate(-90)'
            textAnchor='middle'
          >
            {yAxisLabel}
          </text>
          {/* {
            data.map((item, index) => {
              return (
                <g key={index}>
                  <text
                    fill="#666"
                    x={getX(item.date)}
                    y={getY(item.value) - 20}
                    textAnchor="middle"
                  >
                    {index === activeIndex ? item.value : ""}
                  </text>
                  <circle
                    cx={getX(item.date)}
                    cy={getY(item.value)}
                    r={index === activeIndex ? 6 : 4}
                    fill={color}
                    strokeWidth={index === activeIndex ? 2 : 0}
                    stroke="#fff"
                    style={{ transition: "ease-out .1s" }}
                  />
                </g>
              );
            })
          } */}
        </g>
      </svg>
    </div>
  );
}