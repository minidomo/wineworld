import React from 'react';
import Container from 'react-bootstrap/esm/Container';

import LineGraph from '../components/LineGraph';

const Provider = () => (
  <Container>
      <h1> Provider Visualizations </h1>

      <h4> Line Chart </h4>
      <LineGraph></LineGraph>
  </Container>
  );

export default Provider;
