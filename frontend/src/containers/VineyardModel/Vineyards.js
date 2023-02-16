import React from 'react';
import Stack from "react-bootstrap/Stack"
import VineyardCard from '../../components/VineyardCard';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import vineyardImage from '../../assets/vineyardImage.jpg'

const Vineyards = () => {
    return (
        <Stack>
            <div>
                <Row md ={10} className="p-4 g-4 justify-content-center">
                    <Col>
                        <Card border = 'dark'>
                            <Card.Img variant ="top" src={vineyardImage} />
                            {/* <Card.Header className='text-muted '> Top Choice </Card.Header> */}
                            <Card.Body>
                                <Card.Title> The Austin Winery </Card.Title>
                                <Card.Subtitle> United States </Card.Subtitle>
                                <Card.Text>
                                    <p>
                                        Price: 2
                                    </p>
                                    <p>
                                        Rating: 4
                                    </p>
                                    <p>
                                        Review Count: 127
                                    </p>
                                </Card.Text>

                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <Button
                                    className="btn btn-primary stretched-link"
                                    variant="secondary"
                                    href={"/Vineyards/Vineyard1"}                
                                    >
                                        See More
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>

                    <Col>
                        <Card border = 'dark'>
                            <Card.Img variant ="top" src={vineyardImage} />
                            <Card.Body>
                                <Card.Title>Hamilton Pool Vineyards</Card.Title>
                                <Card.Subtitle> United States </Card.Subtitle>
                                <Card.Text>
                                    <p>
                                        Price: 2
                                    </p>
                                    <p>
                                        Rating: 4
                                    </p>
                                    <p>
                                        Review Count: 13
                                    </p>
                                </Card.Text>

                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <Button
                                    className="btn btn-primary stretched-link"
                                    variant="secondary"
                                    href={"/Vineyards/Vineyard2"}                
                                    >
                                        See More
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>

                    <Col>
                        <Card border = 'dark'>
                            <Card.Img variant ="top" src={vineyardImage} />
                            <Card.Body>
                                <Card.Title> Solis Winery</Card.Title>
                                <Card.Subtitle> United States </Card.Subtitle>
                                <Card.Text>
                                    <p>
                                        Price: 1
                                    </p>
                                    <p>
                                        Rating: 3
                                    </p>
                                    <p>
                                        Review Count: 30
                                    </p>
                                </Card.Text>

                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <Button
                                    className="btn btn-primary stretched-link"
                                    variant="secondary"
                                    href={"/Vineyards/Vineyard3"}                
                                    >
                                        See More
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Stack>        
    );
}

export default Vineyards;