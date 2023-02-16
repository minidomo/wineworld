import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import wineImage from '../../assets/wineImage.jpg'

const Wine2 = () => {
  return (
    <div>
      <img src={wineImage} class="img-fluid" alt="..."></img>
        <h3>Wraith Cabernet Sauvignon 2013</h3>
        <h6>Hundred Acre</h6>
        <Row>
        <div className='p-5'>
          <p align ="left">
            Description: A delicious wine known for its pleasasnt aroma. Made with original wine-making techniques, this is the perfect gift for friends and family who enjoy a rich blend of the perfect ingredients. 
          </p>
          <p align="left">
            Rating: 4.9
          </p>
          <p align="left" >
            Reviews: 89
          </p>
        </div>
        </Row>

        <Row md ={10} className="p-4 g-4 justify-content-center">
          <Col>
            <Button 
            className="btn btn-primary stretched-link"
            variant="secondary"
            href={"/Vineyards/Vineyard2"}
            >
              Explore Vineyard
            </Button>
          </Col>
          <Col>
            <Button 
            className="btn btn-primary stretched-link"
            variant="secondary"
            href={"/Regions/Region2"}
            >
              Explore Region
            </Button>
          </Col>
        </Row>
    </div>
  )
}

export default Wine2