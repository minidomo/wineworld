import React from 'react';
import Container from 'react-bootstrap/esm/Container';

import BubbleMap from '../components/BubbleMap';
import Choropleth from '../components/Choropleth';
import LineGraph from '../components/LineGraph';

const Provider = () => (
  <Container>
    <h1> Provider Visualizations </h1>
    <LineGraph />
    <div class="border-top my-3"></div>
    <BubbleMap />
    <div class="border-top my-3"></div>
    <Choropleth />
    <br/>
  </Container>
);

export default Provider;
