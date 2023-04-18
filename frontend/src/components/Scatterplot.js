import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';

import { wineworld } from '../api';

const Scatterplot = () => {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    wineworld
      .get('/regions')
      .then(res => {
        const arr = res.data.list.map(e => ({
          name: e.name,
          rating: e.rating,
          reviews: e.reviews,
        }));
        setRegions(arr);
      })
      .catch(console.error);
  }, []);

  return (
    <Container>
      <Row style={{ height: 600 }}>
        <h3 className="p-5 text-center">Region Review Counts vs Ratings</h3>
        <Col>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid />
              <YAxis type="number" domain={['auto', 'auto']} dataKey="rating" name="Rating" />
              <XAxis type="number" domain={['auto', 'auto']} dataKey="reviews" name="Reviews" />
              <ZAxis dataKey="name" name="Region" />
              <Legend />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Region" data={regions} fill="#0E79B2" />
            </ScatterChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default Scatterplot;
