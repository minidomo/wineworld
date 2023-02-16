import React from 'react';
import Stack from "react-bootstrap/Stack"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import regionImage from '../../assets/regionImage.jpg'

const Regions = () => {
    return (
        <Stack>
            <div>
                <Row md ={10} className="p-4 g-4 justify-content-center">
                    <Col>
                        <Card border = 'dark'>
                            <Card.Img variant ="top" src={regionImage} />
                            <Card.Body>
                                <Card.Title > Altenjo </Card.Title>
                                <Card.Subtitle> Portugal </Card.Subtitle>
                                <Card.Text>
                                    <p>
                                        Rating: 4.2
                                    </p>
                                    <p>
                                        Review Count: 123
                                    </p>
                                    <p>
                                        Trip Type: Business, Couples
                                    </p>
                                    <p>
                                        Tags: Sights & Landmarks, Food & Drink
                                    </p>
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <Button
                                className="btn btn-primary stretched-link"
                                variant="secondary"
                                href={"/Regions/Region1"}                
                                >
                                    See More
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>

                    <Col>
                        <Card border = 'dark'>
                            <Card.Img variant ="top" src={regionImage} />
                            <Card.Body>
                                <Card.Title> Alsace </Card.Title>
                                <Card.Subtitle> France </Card.Subtitle>
                                <Card.Text>
                                    <p>
                                        Rating: 4.1
                                    </p>
                                    <p>
                                        Review Count: 88
                                    </p>
                                    <p>
                                        Trip Type: Business, Couples, Family
                                    </p>
                                    <p>
                                        Tags: Sights & Landmarks, Food & Drink
                                    </p>
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <Button
                                className="btn btn-primary stretched-link"
                                variant="secondary"
                                href={"/Regions/Region2"}                
                                >
                                    See More
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>

                    <Col>
                        <Card border = 'dark'>
                            <Card.Img variant ="top" src={regionImage} />
                            <Card.Body>
                                <Card.Title> Piedmont</Card.Title>
                                <Card.Subtitle> Italy </Card.Subtitle>
                                <Card.Text>
                                    <p>
                                        Rating: 4.5
                                    </p>
                                    <p>
                                        Review Count: 120
                                    </p>
                                    <p>
                                        Trip Type: Couples, Family
                                    </p>
                                    <p>
                                        Tags: Sights & Landmarks, Food & Drink
                                    </p>
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <Button
                                className="btn btn-primary stretched-link"
                                variant="secondary"
                                href={"/Regions/Region3"}                
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
export default Regions