import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PieChart, Pie, Tooltip, } from 'recharts';


const data = [
    {
        type: "Red",
        count: 115
    },
    {
        type: "White",
        count: 129
    },
    {
        type: "Sparkling",
        count: 7
    },
    {
        type: "Rose",
        count: 53
    },
    {
        type: "Dessert",
        count: 54
    },
    {
        type: "Port",
        count: 33
    },
];


const WineChart = () => (
    <Container fluid="md">
        <Row>
            <h6> Wine Types </h6>
            <Col>
                <PieChart width={230} height={250}>
                    <Pie
                    data={data}
                    dataKey="count"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#ba4547"
                    label />
                    <Tooltip />
                </PieChart>
            </Col>
        </Row>
    </Container>
  );

export default WineChart;
