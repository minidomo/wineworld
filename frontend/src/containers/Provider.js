import React from 'react'
import LineGraph from '../components/LineGraph'

const Provider = () => {
  return (
    <div style={{ padding: '100px 50px 100px 50px', }}>
      <div>Provider</div>
      <LineGraph
        margin={{
          top: 30,
          right: 30,
          bottom: 60,
          left: 60,
        }}
        targetWidth={960}
        targetHeight={280}
        color='OrangeRed'
        yAxisLabel='Count'
        xAxisLabel='Time'
        timeFormat='%-I %p'
        title='Title'
        data={
          [
            {
              date: new Date(new Date(2000, 0, 1, 0).toISOString()),
              value: 10,
            },
            {
              date: new Date(new Date(2000, 0, 1, 15).toISOString()),
              value: 5,
            },
            {
              date: new Date(new Date(2000, 0, 1, 23).toISOString()),
              value: 6,
            },
          ]
        }
      />
    </div>
  )
}

export default Provider