import React from "react";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';


const WineCard = () => {
  return (
    <div>
        <Row md ={10} className="p-4 g-4 justify-content-center">
            <Col>
                <Card border = 'dark'>
                    <Card.Body>
                        <Card.Title> Wine Name</Card.Title>
                        <Card.Subtitle> Wine Type</Card.Subtitle>
                        <Card.Text>
                            Winery:
                            Rating:
                            Reviews:
                            Image placeholder
                            Region link placeholder
                        </Card.Text>

                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <li>
                            <Link to = {`/Wines/${1}`}> See more</Link>
                        </li>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default WineCard