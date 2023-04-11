import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    {
        country: "Argentina",
        count: 1,
    },
    {
        country: "Australia",
        count: 33,
    },
    {
        country: "Austria",
        count: 6,
    },
    {
        country: "Brazil",
        count: 2,
    },
    {
        country: "France",
        count: 25,
    },
    {
        country: "Germany",
        count: 3,
    },
    {
        country: "Italy",
        count: 21,
    },
    {
        country: "New Zealand",
        count: 13,
    },
    {
        country: "Portugal",
        count: 7,
    },
    {
        country: "Spain",
        count: 6,
    },
    {
        country: "Switzerland",
        count: 2,
    },
    {
        country: "United States",
        count: 96,
    },

];


const VineyardChart = () => (
    <Container fluid="md">
        <Row>
            <h6> Number of Vineyards in a Country </h6>
            <Col>
                <BarChart width={1200} height={350} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="country" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#ba4547" />
                </BarChart>
            </Col>
        </Row>
    </Container>
  );

export default VineyardChart;
