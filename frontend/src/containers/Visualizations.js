import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import VineyardChart from '../components/VineyardChart';
import WineChart from '../components/WineChart';

const Visualizations = () => (
    <Container>
        <h1> Visualizations </h1>

        <h4> Pie Chart </h4>
        <WineChart></WineChart>
        <h4> Bar Chart </h4>
        <VineyardChart></VineyardChart>
        <h4> Scatterplot </h4>

    </Container>
    );

export default Visualizations;
