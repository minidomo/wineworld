import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  {
    country: 'Argentina',
    count: 1,
  },
  {
    country: 'Australia',
    count: 33,
  },
  {
    country: 'Austria',
    count: 6,
  },
  {
    country: 'Brazil',
    count: 2,
  },
  {
    country: 'France',
    count: 25,
  },
  {
    country: 'Germany',
    count: 3,
  },
  {
    country: 'Italy',
    count: 21,
  },
  {
    country: 'New Zealand',
    count: 13,
  },
  {
    country: 'Portugal',
    count: 7,
  },
  {
    country: 'Spain',
    count: 6,
  },
  {
    country: 'Switzerland',
    count: 2,
  },
  {
    country: 'United States',
    count: 96,
  },
];

const VineyardChart = () => (
  <Container fluid="md">
    <Row style={{ height: 500 }}>
      <h3 className="p-5 text-center">Number of Vineyards per Country</h3>
      <Col>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={600} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" />
            <YAxis />
            <Tooltip labelStyle={{ color: '#000' }} />
            <Legend />
            <Bar dataKey="count" fill="#0E79B2" />
          </BarChart>
        </ResponsiveContainer>
      </Col>
    </Row>
  </Container>
);

export default VineyardChart;
