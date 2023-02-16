import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import regionImage from '../../assets/regionImage.jpg'
import { Link } from 'react-router-dom'


const Region3 = () => {
  return (
    <div>
      <img src={regionImage} class="img-fluid" alt="..."></img>
        <h3>Region Name</h3>
        <h6>Country</h6>
        <Row>
        <div className='p-5'>
          <p align ="left">
            Description:
          </p>
          <p align="left">
            Rating:
          </p>
          <p align="left" >
            Reviews:
          </p>
          <p align="left" >
            Trip Type:
          </p>
          <p align="left" >
            Tags:
          </p>
        </div>
        </Row>

        <Row md ={10} className="p-4 g-4 justify-content-center">
          <li>
            <Link to = {`/Wines/Wine3`}> Check out some wines! </Link>
          </li>
          <li>
            <Link to = {`/Vineyards/Vineyard3`}> Check out some vineyards! </Link>
          </li>

          {/* <Col>
            <Button 
            className="btn btn-primary stretched-link"
            variant="secondary"
            href={"/Wines/Wine3"}
            >
              Explore Wine
            </Button>
          </Col>
          <Col>
            <Button 
            className="btn btn-primary stretched-link"
            variant="secondary"
            href={"/Vineyards/Vineyard3"}
            >
              Explore Vineyard
            </Button>
          </Col> */}
        </Row>
    </div>
  )
}

export default Region3