import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// const [lineData, setLineData] = useState([]);
const data = [
    {
        time: 3,
        val: 1,
    },
    {
        time: 18,
        val: 33,
    },
    {
        time: 7,
        val: 6,
    },

];

// const response = await axios.get(apiLink);
// setLineData(response.data.list);

const LineGraph = () => (
    <Container>
        <Row style={{ height: 600 }}>
            <h3 className='p-5 text-center'>Blank</h3>
            <Col>
                <ResponsiveContainer width='100%' height='100%'>
                    <LineChart
                        width={ 600 }
                        height={ 300 }
                        data={data.map(e => ({
                            time: e.time,
                            val: e.val,
                          }))}
                        margin={{
                            top: 30,
                            right: 30,
                            bottom: 60,
                            left: 60,
                        }}
                    >
                        <CartesianGrid strokeDasharray='5 5' />
                        <XAxis dataKey='time' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line dataKey='val' color='#6fa092' />
                    </LineChart>
                </ResponsiveContainer>
            </Col>
        </Row>
    </Container>
);

export default LineGraph;
