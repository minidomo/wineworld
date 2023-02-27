import WineData from '../../api-example/data/wines.json'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const WineContent = () => {
    return (
        WineData.data.map(wd => (<Col>
            {
                <Card border='dark'>
                    <Card.Img variant="top" src={wd.image} />
                    {/* <Card.Header className='text-muted '> Recommended </Card.Header> */}
                    <Card.Body>
                        <Card.Title> <p>{wd.name}</p> </Card.Title>
                        <Card.Subtitle> <p>Wine Type: {wd.type}</p></Card.Subtitle>
                        <Card.Text>
                            <p>
                                Winery: {wd.winery}
                            </p>
                            <p>
                                Rating: {wd.rating}
                            </p>
                            <p>
                                Reviews: {wd.reviews}
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
export default WineContent