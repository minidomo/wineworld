import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import vineyardImage from '../../assets/vineyardImage.jpg'
import v1 from '../../assets/v1.jfif'
import v2 from '../../assets/v2.jfif'
import v3 from '../../assets/v3.jfif'

const Vineyard3 = () => {
  return (
    <div>
      <img src={vineyardImage} class="img-fluid" alt="..."></img>
        <h3>Solis Winery</h3>
        <h6>United States</h6>
        <Row>
        <div className='p-5'>
          <p align ="left">
            Description: Visit this vineyard if you're interested in it's famous selection of white wines. The taste and scent of these premium bottles are incomparable to any other.
          </p>
          <p align ="left">
            Price: 1
          </p>
          <p align="left">
            Rating: 3
          </p>
          <p align="left" >
            Reviews: 30
          </p>
        </div>
        </Row>

        <Row>
          <Col>
          <img src={v1} class="img-fluid" alt="..."></img>
          </Col>
          <Col>
          <img src={v2} class="img-fluid" alt="..."></img>
          </Col>
          <Col>
          <img src={v3} class="img-fluid" alt="..."></img>
          </Col>
        </Row>

        <Row md ={10} className="p-4 g-4 justify-content-center">
          <Col>
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
            href={"/Regions/Region3"}
            >
              Explore Region
            </Button>
          </Col>
        </Row>
    </div>
  )
}

export default Vineyard3