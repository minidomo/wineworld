import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  {
    type: 'Red',
    count: 115,
  },
  {
    type: 'White',
    count: 129,
  },
  {
    type: 'Sparkling',
    count: 7,
  },
  {
    type: 'Rose',
    count: 53,
  },
  {
    type: 'Dessert',
    count: 54,
  },
  {
    type: 'Port',
    count: 33,
  },
];

const WineChart = () => (
  <Container fluid="md">
    <Row style={{ height: 400 }}>
      <h6> Wine Types </h6>
      <Col>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={300} height={300}>
            <Pie data={data} dataKey="count" nameKey="type" cx="50%" cy="50%" outerRadius={120} fill="#ba4547" label />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Col>
    </Row>
  </Container>
);

export default WineChart;
