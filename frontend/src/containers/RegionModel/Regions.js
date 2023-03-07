import React from 'react';
import Stack from "react-bootstrap/Stack"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import regionImage from '../../assets/regionImage.jpg'
import RegionCard from '../../components/RegionCard';
import RegionSearch from './RegionSearch';
import RegionContent from './RegionContent';


const Regions = () => {
    return (
        <Stack>
            <div>
                <Row md ={10} className="p-4 g-4 justify-content-center">
                    <RegionSearch/>
                    <RegionContent/>
                    <Col>
                        <RegionCard
                        region = "Altenjo"
                        country = "Portugal"
                        image = {regionImage}
                        rating = "4.2"
                        reviews = "123"
                        trip = "Business, Couples"
                        tags = "Sights & Landmarks, Food & Drink"
                        link = "/Regions/Region1"
                        />
                   
                    </Col>
                    <Col>
                        <RegionCard
                        region = "Alsace"
                        country = "France"
                        image = {regionImage}
                        rating = "4.1"
                        reviews = "88"
                        trip = "Business, Couples, Family"
                        tags = "Sights & Landmarks, Food & Drink"
                        link = "/Regions/Region2"
                        />
                   
                    </Col>
                    <Col>
                        <RegionCard
                        region = "Piedmont"
                        country = "Italy"
                        image = {regionImage}
                        rating = "4.5"
                        reviews = "120"
                        trip = "Couples, Family"
                        tags = "Sights & Landmarks, Food & Drink"
                        link = "/Regions/Region3"
                        />
                    </Col>
                </Row>
            </div>
        </Stack>
    );
}
export default Regions
