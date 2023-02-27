import RegionData from '../../api-example/data/regions.json'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const RegionContent = () => {
    return (
        RegionData.data.map(rd => (<Col>
            {
                <Card border='dark'>
                    <Card.Img variant="top" src={rd.image} />
                    {/* <Card.Header className='text-muted '> Recommended </Card.Header> */}
                    <Card.Body>
                        <Card.Title> <p>{rd.name}</p> </Card.Title>
                        <Card.Subtitle> <p>{rd.country}</p></Card.Subtitle>
                        <Card.Text>
                            <p>
                                Rating: {rd.rating}
                            </p>
                            <p>
                                Reviews: {rd.reviews}
                            </p>
                            <p>
                                Trip Type: {rd.tripTypes}
                            </p>
                            <p>
                                Tags: {rd.tags}
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
export default RegionContent