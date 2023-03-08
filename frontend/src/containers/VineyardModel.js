import React from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';
import {get} from '../api-example/siteapi';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import VineyardCard from '../components/VineyardCard';
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

const VineyardModel = () => {
    const [vineyards, setVineyards] = useState([]);

    useEffect(() => {
        const getVineyards = async () => {
            if (vineyards === undefined || vineyards.length === 0) {
                axios.get('https://api.wineworld.me/vineyards')
                    .then((response) => {
                        setVineyards(response.data.list);
                    })
                    .catch(errRes => {
                        console.error(errRes);
                    });
            }
        }
        getVineyards();
    }, [vineyards])
    
    return (
        <Container>
            <h1 class="display-4">Vineyards</h1>
            <Row>
                <Col>
                    <DropdownButton id="dropdown-basic-button" variant="secondary" size="sm" menuVariant = "dark" title="Sort By" className="mt-2">
                        <Dropdown.Item href="#/action-1">Name</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Price</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Region</Dropdown.Item>
                        <Dropdown.Item href="#/action-4">Rating</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col>
                    <DropdownButton id="dropdown-basic-button" variant="secondary" size="sm" menuVariant = "dark" title="Order" className="mt-2">
                        <Dropdown.Item href="#/action-1">Ascending</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Descending</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col>
                    <form class="d-flex" role="search">
                        <input class="form-control me-1" type="search" placeholder="Search" aria-label="Search"></input>
                        <button class="btn btn-outline-secondary" type="submit">Search</button>
                    </form>
                </Col>
            </Row>
            <Row md={4} className="d-flex g-4 p-4 justify-content-left">
                {
                    vineyards.map((vineyard) => {
                        return (
                            <Col>
                                <VineyardCard vineyard={vineyard} />
                            </Col>
                        )
                    })
                }
            </Row>

        </Container>
    )
}
export default VineyardModel
