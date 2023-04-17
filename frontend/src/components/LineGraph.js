import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const date = dayjs();
const ticks = (() => {
    const ret = [];

    for (let hour = 0; hour <= 23; hour += 3) {
        ret.push(
            date.clone()
                .set('hour', hour)
                .set('minute', 0)
                .unix()
        );
    }

    ret.push(
        date.clone()
            .set('hour', 23)
            .set('minute', 59)
            .unix()
    );

    return ret;
})();

function formatUnix(value) {
    return dayjs.unix(value).format('h:mm A');
}

function createLineData(data) {
    return data.map(e => (
        {
            time: date.clone()
                .set('hour', e.time.hour)
                .set('minute', e.time.minute)
                .unix(),
            days: e.value,
        }
    ));
}

const LineGraph = () => {
    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        async function callApi() {
            const response = await axios.get('https://api.wineworld.me/visualizations/provider/line');
            setGraphData(response.data.data);
        }
        callApi();
    }, []);


    return (
        <Container fluid='md'>
            <Row style={{ height: 400 }}>
                <h6> Number of Days Found where a Park is Open at a Specific Time </h6>
                <Col>
                    <ResponsiveContainer width='100%' height='100%'>
                        <LineChart
                            width={600}
                            height={300}
                            data={createLineData(graphData)}
                        >
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis
                                dataKey='time'
                                type='number'
                                domain={['dataMin', 'dataMax']}
                                ticks={ticks}
                                tickFormatter={formatUnix}
                            />
                            <YAxis
                                domain={['auto', 'auto']}
                            />
                            <Tooltip
                                labelFormatter={formatUnix}
                                labelStyle={{ color: '#000' }}
                            />
                            <Legend />
                            <Line type='monotone' dataKey='days' stroke='#ba4547' />
                        </LineChart>
                    </ResponsiveContainer>
                </Col>
            </Row>
        </Container>
    );
};

export default LineGraph;
