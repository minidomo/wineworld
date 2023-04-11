import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {
    Bar, BarChart, CartesianGrid, Cell, Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';

const data = [
    {
        country: 'Argentina',
        vineyard_count: 1,
    },
    {
        country: 'Australia',
        vineyard_count: 33,
    },
    {
        country: 'Austria',
        vineyard_count: 6,
    },
    {
        country: 'Brazil',
        vineyard_count: 2,
    },
    {
        country: 'France',
        vineyard_count: 25,
    },
    {
        country: 'Germany',
        vineyard_count: 3,
    },
    {
        country: 'Italy',
        vineyard_count: 21,
    },
    {
        country: 'New Zealand',
        vineyard_count: 13,
    },
    {
        country: 'Portugal',
        vineyard_count: 7,
    },
    {
        country: 'Spain',
        vineyard_count: 6,
    },
    {
        country: 'Switzerland',
        vineyard_count: 2,
    },
    {
        country: 'United States',
        vineyard_count: 96,
    },
];

const BarGraph = () => (
    <Container>
        <Row style={{ height: 600 }}>
            <h3 className='p-5 text-center'>Number of vineyards per country</h3>
            <Col>
                <ResponsiveContainer width='100%' height='100%'>
                    <BarChart
                        width={ 600 }
                        height={ 300 }
                        data={ data }
                        margin={{
                            top: 30,
                            right: 30,
                            bottom: 60,
                            left: 60,
                        }}
                    >
                        <CartesianGrid strokeDasharray='5 5' />
                        <XAxis dataKey='country' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey='vineyard_count' fill='#6fa092' />
                    </BarChart>
                </ResponsiveContainer>
            </Col>
        </Row>
    </Container>
);

export default BarGraph;
