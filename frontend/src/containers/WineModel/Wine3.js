import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import wineImage from '../../assets/wineImage.jpg'

const Wine3 = () => {
  return (
    <div>
      <img src={wineImage} class="img-fluid" alt="..."></img>
        <h3>Wine Name</h3>
        <h6>Winery</h6>
        <Row>
        <div className='p-5'>
          <p align ="left">
            Description
          </p>
          <p align="left">
            Rating:
          </p>
          <p align="left" >
            Reviews:
          </p>
        </div>
        </Row>

        <Row md ={10} className="p-4 g-4 justify-content-center">
          <Col>
            <Button 
            className="btn btn-primary stretched-link"
            variant="secondary"
            href={"/Vineyards/Vineyard3"}
            >
              Explore Vineyard
            </Button>
          </Col>
          <Col>
            <Button 
            className="btn btn-primary stretched-link"
            variant="secondary"
            href={"/Regions/Region3"}
            >
              Explore Region
            </Button>
          </Col>
        </Row>
    </div>
  )
}

export default Wine3