import React from 'react';
import Container from 'react-bootstrap/esm/Container';

import Scatterplot from '../components/Scatterplot';
import VineyardChart from '../components/VineyardChart';
import WineChart from '../components/WineChart';

const Visualizations = () => (
  <Container>
    <h1> Visualizations </h1>

    <h4> Pie Chart </h4>
    <WineChart />

    <h4> Bar Chart </h4>
    <VineyardChart />

    <h4> Scatterplot </h4>
    <Scatterplot />
  </Container>
);

export default Visualizations;
