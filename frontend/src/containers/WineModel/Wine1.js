import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import wineImage from '../../assets/wineImage.jpg'
import w1 from '../../assets/w1.jpg'
import w2 from '../../assets/w2.jpg'
import w3 from '../../assets/w3.jpg'

const Wine1 = () => {
  return (
    <div>
      <img src={wineImage} class="img-fluid" alt="..."></img>
        <h3>Pêra-Manca Tinto 1990</h3>
        <h6>Cartuxa</h6>
        <Row>
        <div className='p-5'>
          <p align ="left">
            Description: A delicious wine known for its pleasasnt aroma. Made with original wine-making techniques, this is the perfect gift for friends and family who enjoy a rich blend of the perfect ingredients. 
          </p>
          <p align="left">
            Rating: 4.7
          </p>
          <p align="left" >
            Reviews: 79
          </p>
        </div>
        </Row>
        
        <Row>
          <Col>
          <img src={w1} class="img-fluid" alt="..."></img>
          </Col>
          <Col>
          <img src={w2} class="img-fluid" alt="..."></img>
          </Col>
          <Col>
          <img src={w3} class="img-fluid" alt="..."></img>
          </Col>
        </Row>

        <Row md ={10} className="p-4 g-4 justify-content-center">
          <Col>
            <Button 
            className="btn btn-primary stretched-link"
            variant="secondary"
            href={"/Vineyards/Vineyard1"}
            >
              Explore Vineyard
            </Button>
          </Col>
          <Col>
            <Button 
            className="btn btn-primary stretched-link"
            variant="secondary"
            href={"/Regions/Region1"}
            >
              Explore Region
            </Button>
          </Col>
        </Row>
    </div>
  )
}

export default Wine1