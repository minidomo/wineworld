import React from 'react';

import LineGraph from '../components/LineGraph';

const lineGraphData = [
  {
    date: new Date(2000, 0, 1, 0).toISOString(),
    value: 10,
  },
  {
    date: new Date(2000, 0, 1, 15).toISOString(),
    value: 5,
  },
  {
    date: new Date(2000, 0, 1, 23).toISOString(),
    value: 6,
  },
];

const Provider = () => (
  <>
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
      color="OrangeRed"
      yAxisLabel="Y Label"
      xAxisLabel="X Label"
      timeFormat="%-I %p"
      title="Title"
      data={lineGraphData.map(e => ({
        date: new Date(e.date),
        value: e.value,
      }))}
    />
  </>
);

export default Provider;
