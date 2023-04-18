import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts';

const Scatterplot = () => {
  const [regions, setRegions] = useState([]);
  const apiLink = 'https://api.wineworld.me/regions?';

  useEffect(() => {
    async function callApi() {
      const response = await axios.get(apiLink, {});
      setRegions(response.data.list);
    }
    callApi();
  }, []);

  return (
    <Container>
      <Row style={{ height: 600 }}>
        <h3 className="p-5 text-center">Region Review Counts and Ratings</h3>
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
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="A school" data={regions} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default Scatterplot;
