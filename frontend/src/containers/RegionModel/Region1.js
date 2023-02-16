import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import regionImage from '../../assets/regionImage.jpg'
import { Link } from 'react-router-dom'
import r1 from '../../assets/r1.jpg'
import r2 from '../../assets/r2.jpg'
import r3 from '../../assets/r3.jfif'



const Region1 = () => {
  return (
    <div>
      <img src={regionImage} class="img-fluid" alt="..."></img>
        <h3>Altenjo</h3>
        <h6>Portugal</h6>
        <Row>
        <div className='p-5'>
          <p align ="left">
            Description: A beautiful location to vist and experience wine-making in its truest form. Come see the rich history of wine
            and explore the famous vineyards this region has to offer.
          </p>
          <p align="left">
            Rating: 4.2
          </p>
          <p align="left" >
            Reviews: 123
          </p>
          <p align="left" >
            Trip Type: Business, Couples
          </p>
          <p align="left" >
            Tags: Sights & Landmarks, Food & Drink
          </p>
        </div>
        </Row>

        <Row>
          <Col>
          <img src={r1} class="img-fluid" alt="..."></img>
          </Col>
          <Col>
          <img src={r2} class="img-fluid" alt="..."></img>
          </Col>
          <Col>
          <img src={r3} class="img-fluid" alt="..."></img>
          </Col>
        </Row>

        <Row md ={10} className="p-4 g-4 justify-content-center">
          <li>
            <Link to = {`/Wines/Wine1`}> Check out some wines! </Link>
          </li>
          <li>
            <Link to = {`/Vineyards/Vineyard1`}> Check out some vineyards! </Link>
          </li>

          {/* <Col>
            <Button 
            className="btn btn-primary stretched-link"
            variant="secondary"
            href={"/Wines/Wine1"}
            >
              Explore Wine
            </Button>
          </Col>
          <Col>
            <Button 
            className="btn btn-primary stretched-link"
            variant="secondary"
            href={"/Vineyards/Vineyard1"}
            >
              Explore Vineyard
            </Button>
          </Col> */}
        </Row>
    </div>
  )
}

export default Region1