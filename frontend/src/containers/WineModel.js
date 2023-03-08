import React from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import WineCard from '../components/WineCard';
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

// const client = axios.create({
//   baseURL: 'https://api.wineworld.me/',
// });

const WineModel = () => {
    const [wines, setWines] = useState([]);

    useEffect(() => {
        const getWines = async () => {
            if (wines === undefined || wines.length === 0) {
                // const response = await client.get('wines')
                axios.get('https://api.wineworld.me/wines')
                    .then((response) => {
                        setWines(response.data.list);
                    })
                    .catch(errRes => {
                        console.error(errRes);
                    });
            }
        }
        getWines();
    }, [wines]);
   
    // useEffect(() => {
    //   let mounted = true;
    //   axios.get('https://api.wineworld.me/wines')
    //     .then(response => {
    //         if(mounted) {
    //             // list = response.data;
    //             setWines(response.data.list);
    //         }
    //     })
    //     .catch(errRes => {
    //         console.error(errRes);
    //     })
    //   return () => mounted = false;
    // }, [])
   
    return(
        <Container>
            <h1 class="display-4">Wines</h1>
            <Row>
                <Col>
                    
                    <DropdownButton id="dropdown-basic-button" variant="secondary" size="sm" menuVariant = "dark" title="Sort By" className="mt-2">
                        <Dropdown.Item href="#/action-1"> Name</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Winery</Dropdown.Item>
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

            <Row md={3} className="d-flex g-4 p-4 justify-content-left">
                {
                    wines.map((wine) => {
                        return (
                            <Col>
                                <WineCard wine = {wine} />
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}
export default WineModel
