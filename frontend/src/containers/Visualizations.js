import React from 'react';
import Container from 'react-bootstrap/esm/Container';

import Scatterplot from '../components/Scatterplot';
import VineyardChart from '../components/VineyardChart';
import WineChart from '../components/WineChart';

const Visualizations = () => (
  <Container>
    <h1> Visualizations </h1>

    <WineChart />
    <div class="border-top my-3"></div>
    <VineyardChart />
    <div class="border-top my-3"></div>
    <Scatterplot />
    <br />
  </Container>
);

export default Visualizations;
