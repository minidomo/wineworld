import React from 'react';
import Stack from "react-bootstrap/Stack"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import vineyardImage from '../../assets/vineyardImage.jpg'
import VineyardCard from '../../components/VineyardCard';
import VineyardSearch from './VineyardSearch';
import VineyardContent from './VineyardContent';



const Vineyards = () => {
    return (
        <Stack>
            <div>
                <Row md ={10} className="p-4 g-4 justify-content-center">
                    <VineyardSearch/>
                    <VineyardContent/>
                    <Col>
                        <VineyardCard
                        vineyard = "The Austin Winery"
                        country = "United States"
                        image = {vineyardImage}
                        price = "2"
                        rating = "4"
                        reviews = "127"
                        link = "/Vineyards/Vineyard1"
                        />
                    </Col>


                    <Col>
                        <VineyardCard
                        vineyard = "Hamilton Pool Vineyards"
                        country = "United States"
                        image = {vineyardImage}
                        price = "2"
                        rating = "4"
                        reviews = "13"
                        link = "/Vineyards/Vineyard2"
                        />
                    </Col>


                    <Col>
                        <VineyardCard
                        vineyard = "Solis Winery"
                        country = "United States"
                        image = {vineyardImage}
                        price = "1"
                        rating = "3"
                        reviews = "30"
                        link = "/Vineyards/Vineyard3"
                        />
                    </Col>
                </Row>
            </div>
        </Stack>        
    );
}


export default Vineyards;
