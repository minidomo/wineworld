import VineyardData from '../../api-example/data/vineyards.json'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const VineyardContent = () => {
    return (
        VineyardData.data.map(vd => (<Col>
            {
                <Card border='dark'>
                    <Card.Img variant="top" src={vd.image} />
                    {/* <Card.Header className='text-muted '> Recommended </Card.Header> */}
                    <Card.Body>
                        <Card.Title> <p>{vd.name}</p> </Card.Title>
                        <Card.Subtitle> <p>{vd.country}</p> </Card.Subtitle>
                        <Card.Text>
                            <p>
                                Price: ${vd.price}
                            </p>
                            <p>
                                Rating: {vd.rating}
                            </p>
                            <p>
                                Reviews: {vd.reviews}
                            </p>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="">
                        <Button
                            className="btn btn-primary stretched-link"
                            variant="secondary"
                            href={"/Wines/Wine1"}
                        >
                            See More
                        </Button>
                    </Card.Footer>
                </Card>
            }
        </Col>))
    )
}
export default VineyardContent