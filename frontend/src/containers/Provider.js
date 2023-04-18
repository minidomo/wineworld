import React from 'react';
import Container from 'react-bootstrap/esm/Container';

import BubbleMap from '../components/BubbleMap';
import Choropleth from '../components/Choropleth';
import LineGraph from '../components/LineGraph';

const Provider = () => (
  <Container>
    <h1> Provider Visualizations </h1>

    <h4> Line Chart </h4>
    <LineGraph />

    <h4> Bubble Map </h4>
    <BubbleMap />

    <h4> Choropleth </h4>
    <Choropleth />
  </Container>
);

export default Provider;
