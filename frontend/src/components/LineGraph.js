import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { wineworld } from '../api';

const date = dayjs();
const ticks = (() => {
  const ret = [];

  for (let hour = 0; hour <= 23; hour += 3) {
    ret.push(date.clone().set('hour', hour).set('minute', 0).unix());
  }

  ret.push(date.clone().set('hour', 23).set('minute', 59).unix());

  return ret;
})();

function formatValue(value, name, props) {
  return `${value.toFixed(3)}%`;
}

function formatUnix(value) {
  return dayjs.unix(value).format('h:mm A');
}

function createLineData(data) {
  return data.map(e => ({
    time: date.clone().set('hour', e.time.hour).set('minute', e.time.minute).unix(),
    percentage: e.percent * 100,
  }));
}

const LineGraph = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    wineworld
      .get('/visualizations/provider/line')
      .then(res => setGraphData(res.data.data))
      .catch(console.error);
  }, []);

  return (
    <Container fluid="md">
      <Row style={{ height: 400 }}>
      <h3 className="p-5 text-center">Percentage of Parks Open at a Specific Time</h3>
        <Col>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={600} height={300} data={createLineData(graphData)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                type="number"
                domain={['dataMin', 'dataMax']}
                ticks={ticks}
                tickFormatter={formatUnix}
              />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip labelFormatter={formatUnix} labelStyle={{ color: '#000' }} formatter={formatValue} />
              <Legend />
              <Line type="monotone" dataKey="percentage" stroke="#0E79B2" />
            </LineChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default LineGraph;
