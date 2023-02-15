import React from 'react';
import Stack from "react-bootstrap/Stack"
import RegionCard from '../../components/RegionCard';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
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
                                <Card.Title > Region Name</Card.Title>
                                <Card.Subtitle> Country</Card.Subtitle>
                                <Card.Text>
                                    <p>
                                        Rating:
                                    </p>
                                    <p>
                                        Review Count:
                                    </p>
                                    <p>
                                        Trip Type:
                                    </p>
                                    <p>
                                        Tags:
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
                                <Card.Title> Region Name</Card.Title>
                                <Card.Subtitle> Country</Card.Subtitle>
                                <Card.Text>
                                    <p>
                                        Rating:
                                    </p>
                                    <p>
                                        Review Count:
                                    </p>
                                    <p>
                                        Trip Type:
                                    </p>
                                    <p>
                                        Tags:
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
                                <Card.Title> Region Name</Card.Title>
                                <Card.Subtitle> Country</Card.Subtitle>
                                <Card.Text>
                                    <p>
                                        Rating:
                                    </p>
                                    <p>
                                        Review Count:
                                    </p>
                                    <p>
                                        Trip Type:
                                    </p>
                                    <p>
                                        Tags:
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