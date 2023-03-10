import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import VineyardData from '../../api-example/data/vineyards.json';

const VineyardContent = () =>
    VineyardData.data.map(vd => (
        <Col>
            {
                <Card border="dark" style={{ width: 200 }}>
                    <Card.Img
                        class="rounded mx-auto d-block"
                        variant="top"
                        style={{ width: 198, height: 150 }}
                        src={vd.image}
                    />
                    {/* <Card.Header className='text-muted '> Recommended </Card.Header> */}
                    <Card.Body>
                        <Card.Title>
                            {' '}
                            <p>{vd.name}</p>{' '}
                        </Card.Title>
                        <Card.Subtitle>
                            {' '}
                            <p>{vd.country}</p>{' '}
                        </Card.Subtitle>
                        <Card.Text>
                            <p>Price: ${vd.price}</p>
                            <p>Rating: {vd.rating}</p>
                            <p>Reviews: {vd.reviews}</p>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="">
                        <Button className="btn btn-primary stretched-link" variant="secondary" href={'/Wines/Wine1'}>
                            See More
                        </Button>
                    </Card.Footer>
                </Card>
            }
        </Col>
    ));
export default VineyardContent;
