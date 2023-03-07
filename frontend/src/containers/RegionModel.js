import React from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';
import {get} from '../api-example/siteapi';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RegionCard from '../components/RegionCard';
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

const RegionModel = () => {
    const [regions, setRegions] = useState([]);

    useEffect(() => {
      const getRegions = async () => {
        if (regions === undefined || regions.length === 0) {
            axios.get('https://api.wineworld.me/regions')
                .then((response) => {
                    setRegions(response.data.list)
                })
                .catch(errRes => {
                    console.error(errRes);
                })
        }
      }
      getRegions();
    }, [regions])
    
    return (
        <Container>
            <h1 class="display-4">Regions</h1>
            <Row>
                <Col>
                    <DropdownButton id="dropdown-basic-button" variant="secondary" size="sm" menuVariant = "dark" title="Sort By" className="mt-2">
                        <Dropdown.Item href="#/action-1">Name</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Region</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Rating</Dropdown.Item>
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

            <Row md={5} className="d-flex g-4 p-4 justify-content-left">
                {
                    regions.map((region) => {
                        return (
                            <Col>
                                <RegionCard region = {region}/>
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}
export default RegionModel