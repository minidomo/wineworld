import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useLocation } from 'react-router-dom';
import RegionCard from '../components/RegionCard';
import Spinner from 'react-bootstrap/Spinner';

const RegionSearch = () => {
    const [regions, setRegions] = useState([]);
    const [regionLoaded, setRegionLoaded] = useState(false);
    const location = useLocation();
    const query = location.pathname.split("/Search/").at(-1);
    const words = query.split('%20');
    const searchQuery = words.join(" ");

    useEffect(() => {
        async function searchRegions() {
            const response = await axios.get('https://api.wineworld.me/regions', {
                params: {
                    name: searchQuery,
                },
            });
            setRegions(response.data.list);
            setRegionLoaded(true);
        }

        searchRegions();
    }, [searchQuery])
    

    return (
        <Container>
            <h1> Region Search Results</h1>
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

        </Container>
    )
}

export default RegionSearch