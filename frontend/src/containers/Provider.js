import React from 'react';
import Container from 'react-bootstrap/esm/Container';

import LineGraph from '../components/LineGraph';
import BubbleMap from '../components/BubbleMap';

const Provider = () => (
  <Container>
      <h1> Provider Visualizations </h1>

      <h4> Line Chart </h4>
      <LineGraph></LineGraph>

      <h4> Bubble Map </h4>
      <BubbleMap></BubbleMap>

      <h4> Choropleth </h4>
  </Container>
  );

export default Provider;
