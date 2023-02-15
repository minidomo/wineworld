import React from 'react';
import Stack from "react-bootstrap/Stack"
import WineCard from '../../components/WineCard';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import wineImage from '../../assets/wineImage.jpg'


const Wines = () => {
  return (
    <Stack>
      <Row md ={10} className="p-4 g-4 justify-content-center">
        <Col>
          <Card border = 'dark'>
            <Card.Img variant ="top" src={wineImage} />
            <Card.Header className='text-muted '> Recommended </Card.Header>
            <Card.Body>
              <Card.Title> Wine Name</Card.Title>
              <Card.Subtitle> Wine Type</Card.Subtitle>
              <Card.Text>
                <p>
                  Winery:
                </p>
                <p>
                  Rating:
                </p>
                <p>
                  Reviews:
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
        </Col>

        <Col>
          <Card border = 'dark'>            
          <Card.Img variant ="top" src={wineImage} />
            <Card.Body>
              <Card.Title> Wine Name</Card.Title>
              <Card.Subtitle> Wine Type</Card.Subtitle>
              <Card.Text>
                <p>
                  Winery:
                </p>
                <p>
                  Rating:
                </p>
                <p>
                  Reviews:
                </p>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
              <Button
              className="btn btn-primary stretched-link"
              variant="secondary"
              href={"/Wines/Wine2"}
              >
                See More
              </Button>
            </Card.Footer>
          </Card>
        </Col>

        <Col>
          <Card border = 'dark'>            
          <Card.Img variant ="top" src={wineImage} />
            <Card.Body>
              <Card.Title> Wine Name</Card.Title>
              <Card.Subtitle> Wine Type</Card.Subtitle>
              <Card.Text>
                <p>
                  Winery:
                </p>
                <p>
                  Rating:
                </p>
                <p>
                  Reviews:
                </p>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
              <Button
              className="btn btn-primary stretched-link"
              variant="secondary"
              href={"/Wines/Wine3"}
              >
                See More
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Stack>
  );
} 

export default Wines