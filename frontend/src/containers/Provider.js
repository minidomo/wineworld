import React from 'react'
import LineGraph from '../components/LineGraph'

const Provider = () => {
  return (
    <>
      <div>Provider</div>
      <LineGraph
        margin={{
          top: 10,
          right: 30,
          bottom: 30,
          left: 60,
        }}
        targetWidth={960}
        targetHeight={280}
        color='OrangeRed'
        yAxisLabel='Count'
        xAxisLabel='Time'
        timeFormat='%-I %p'
        data={
          [
            {
              date: new Date(2000, 0, 1, 0),
              value: 10,
            },
            {
              date: new Date(2000, 0, 1, 15),
              value: 5,
            },
            {
              date: new Date(2000, 0, 1, 23),
              value: 6,
            },
          ]
        }
      />
    </>
  )
}

export default Provider