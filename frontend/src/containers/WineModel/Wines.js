import React from 'react';
import Stack from "react-bootstrap/Stack"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import wineImage from '../../assets/wineImage.jpg'
import WineCard from '../../components/WineCard';
import WinesSearch from './WinesSearch';
import WineContent from './WineContent';


const Wines = () => {
  return (
    <Stack>
      <div>
        <Row md ={10} className="p-4 g-4 justify-content-center">
          <WinesSearch/>
          <WineContent/>
          <Col>
            <WineCard
            wine = "Pêra-Manca Tinto 1990"
            wineType = "Red"
            image = {wineImage}
            winery = "Cartuxa"
            rating = "4.7"
            reviews = "79"
            link = {"/Wines/Wine1"}
            />
          </Col>
          <Col>
            <WineCard
            wine = "Wraith Cabernet Sauvignon 2013"
            wineType = "White"
            image = {wineImage}
            winery = "Hundred Acre"
            rating = "4.9"
            reviews = "89"
            link = {"/Wines/Wine2"}
            />
          </Col>
          <Col>
            <WineCard
            wine = "Olema Cabernet Sauvignon 2019"
            wineType = "Red"
            image = {wineImage}
            winery = "Sonoma County"
            rating = "4.0"
            reviews = "82"
            link = {"/Wines/Wine3"}
            />
          </Col>
        </Row>
      </div>
    </Stack>
  );
}


export default Wines
