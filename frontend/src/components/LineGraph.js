import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const LineGraph = () => {
    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        async function callApi() {
            const response = await axios.get('https://api.wineworld.me/visualizations/provider/line');
            setGraphData(response.data.data);
        }
        callApi();
    });

    return (
        <Container fluid='md'>
            <Row style={{ height: 400 }}>
                <h6> Number of Days All Parks Are Open At Specific Time </h6>
                <Col>
                    <ResponsiveContainer width='100%' height='100%'>
                        <LineChart
                            title='Something'
                            width={600}
                            height={300}
                            data={graphData.map(e => ({
                                time: new Date(2000, 0, 1, e.time.hour, e.time.minute).toLocaleTimeString(),
                                number_of_days: e.value,
                            }))}
                        >
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey='time' />
                            <YAxis />
                            <Tooltip labelStyle={{ color: '#000' }} />
                            <Legend />
                            <Line type='monotone' dataKey='number_of_days' stroke='#ba4547' />
                        </LineChart>
                    </ResponsiveContainer>
                </Col>
            </Row>
        </Container>
    );
};

export default LineGraph;
