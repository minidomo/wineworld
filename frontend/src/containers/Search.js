import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import WineCard from '../components/WineCard';
import VineyardCard from '../components/VineyardCard';
import RegionCard from '../components/RegionCard';


const Search = () => {
    const [wines, setWines] = useState([]);
    const [vineyards, setVineyards] = useState([]);
    const [regions, setRegions] = useState([]);
    const location = useLocation();
    const query = location.pathname.split("/Search/").at(-1)

    //reformat query with spaces
    const words = query.split('%20')
    const searchQuery = words.join(" ")
    console.log(searchQuery)

    useEffect(() => {
        async function searchWines() {
            const response = await axios.get('https://api.wineworld.me/wines', {
                params: {
                    name: searchQuery,
                },
            });
            setWines(response.data.list)
        }

        async function searchVineyards() {
            const response = await axios.get('https://api.wineworld.me/vineyards', {
                params: {
                    name: searchQuery,
                },
            });
            setVineyards(response.data.list)
        }

        async function searchRegions() {
            const response = await axios.get('https://api.wineworld.me/regions', {
                params: {
                    name: searchQuery,
                },
            });
            setRegions(response.data.list)
        }

        searchWines();
        searchVineyards();
        searchRegions();
    }, [wines, vineyards, regions])
    
    return (
        <Container>
            <h1> Search Results</h1>
            <Tabs defaultActiveKey="wines">
                <Tab eventKey="wines" title ="Wines">
                    <h6 class="display-4">Wine Results</h6>
                    <Row md={4} className="d-flex g-4 p-4 justify-content-left">
                        {wines.map(wine => (
                            <Col>
                                <WineCard wine={wine} />
                            </Col>
                        ))}
                    </Row>
                </Tab>
                <Tab eventKey="vineyards" title ="Vineyards">
                    <h6 class="display-4">Vineyard Results</h6>
                    <Row md={4} className="d-flex g-4 p-4 justify-content-left">
                        {vineyards.map(vineyard => (
                            <Col>
                                <VineyardCard vineyard={vineyard} />
                            </Col>
                        ))}
                    </Row>
                </Tab>
                <Tab eventKey="regions" title ="Regions">
                    <h6 class="display-4">Region Results</h6>
                    <Row md={4} className="d-flex g-4 p-4 justify-content-left">
                        {regions.map(region => (
                            <Col>
                                <RegionCard region={region} />
                            </Col>
                        ))}
                    </Row>
                </Tab>
            </Tabs>
        </Container>
    )
}

export default Search