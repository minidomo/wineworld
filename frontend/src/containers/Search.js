import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useLocation } from 'react-router-dom';
import RegionCard from '../components/RegionCard';
import VineyardCard from '../components/VineyardCard';
import WineCard from '../components/WineCard';
import Spinner from 'react-bootstrap/Spinner';

const Search = () => {
    const [wines, setWines] = useState([]);
    const [vineyards, setVineyards] = useState([]);
    const [regions, setRegions] = useState([]);
    const [wineLoaded, setWineLoaded] = useState(false);
    const [vineyardLoaded, setVineyardLoaded] = useState(false);
    const [regionLoaded, setRegionLoaded] = useState(false);
    const location = useLocation();
    const query = location.pathname.split("/Search/").at(-1);

    // reformat query with spaces
    const words = query.split('%20');
    const searchQuery = words.join(" ");
    console.log(searchQuery);

    useEffect(() => {
        async function searchWines() {
            const response = await axios.get('https://api.wineworld.me/wines', {
                params: {
                    name: searchQuery,
                },
            });
            setWines(response.data.list);
            setWineLoaded(true);
        }

        async function searchVineyards() {
            const response = await axios.get('https://api.wineworld.me/vineyards', {
                params: {
                    name: searchQuery,
                },
            });
            setVineyards(response.data.list);
            setVineyardLoaded(true);
        }

        async function searchRegions() {
            const response = await axios.get('https://api.wineworld.me/regions', {
                params: {
                    name: searchQuery,
                },
            });
            setRegions(response.data.list);
            setRegionLoaded(true);
        }

        searchWines();
        searchVineyards();
        searchRegions();
        console.log("useEffect");
    }, [searchQuery]);

    return (
        <Container>
            <h1> Search Results</h1>
            <Tabs defaultActiveKey="wines">
                <Tab eventKey="wines" title ="Wines">
                    <h6 class="display-4">Wine Results</h6>
                    <p style={{opacity: 0.65}} hidden = {wines.length > 0}>No wines seem to match your search</p>
                    <Row md={4} className="d-flex g-4 p-4 justify-content-left">
                        {wineLoaded ? (
                            wines.map(wine => (
                            <Col>
                                <WineCard wine={wine} regex={searchQuery} />
                            </Col>
                            ))) : (
                            <Spinner animation="border" role="status"></Spinner>
                        )
                        }
                    </Row>
                </Tab>
                <Tab eventKey="vineyards" title ="Vineyards">
                    <h6 class="display-4">Vineyard Results</h6>
                    <p style={{opacity: 0.65}} hidden = {vineyards.length > 0}>No vineyards seem to match your search</p>
                    <Row md={4} className="d-flex g-4 p-4 justify-content-left">
                        { vineyardLoaded ?  (
                            vineyards.map(vineyard => (
                            <Col>
                                <VineyardCard vineyard={vineyard} regex={searchQuery}/>
                            </Col>
                            ))) : (
                            <Spinner animation="border" role="status"></Spinner>
                        )
                        }
                    </Row>
                </Tab>
                <Tab eventKey="regions" title ="Regions">
                    <h6 class="display-4">Region Results</h6>
                    <p style={{opacity: 0.65}} hidden = {regions.length > 0}>No regions seem to match your search</p>
                    <Row md={4} className="d-flex g-4 p-4 justify-content-left">
                        { regionLoaded ? (
                            regions.map(region => (
                            <Col>
                                <RegionCard region={region} regex={searchQuery}/>
                            </Col>
                            ))) : (
                                <Spinner animation="border" role="status"></Spinner>                                
                            )
                        }
                    </Row>
                </Tab>
            </Tabs>
        </Container>
    );
};

export default Search;
