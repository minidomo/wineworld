import React from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';
import { get } from '../api-example/siteapi';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import WineCard from '../components/WineCard';
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/esm/Button";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

function clamp(minVal, maxVal, val) {
    if (val < minVal)
        return minVal;
    if (val > maxVal)
        return maxVal;
    return val;
}

const WineModel = () => {
    const [wines, setWines] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        console.log('useEffect called');

        async function callApi() {
            const response = await axios.get('https://api.wineworld.me/wines', {
                params: {
                    page: page,
                }
            });
            console.log('called api');

            setWines(response.data.list);
            setTotalPages(response.data.totalPages);
        }

        if (1 <= page && page <= totalPages) {
            callApi();
        } else {
            setPage(clamp(1, totalPages, page));
        }
    }, [page]);

    return (
        <Container>
            <h1 class="display-4">Wines</h1>
            <Row>
                <Col>

                    <DropdownButton id="dropdown-basic-button" variant="secondary" size="sm" menuVariant="dark" title="Sort By" className="mt-2">
                        <Dropdown.Item href="#/action-1">Name</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Winery</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Region</Dropdown.Item>
                        <Dropdown.Item href="#/action-4">Rating</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col>
                    <DropdownButton id="dropdown-basic-button" variant="secondary" size="sm" menuVariant="dark" title="Order" className="mt-2">
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

            <Row>
                <Col>
                    <button onClick={() => setPage(page - 1)}>
                        Previous
                    </button>
                </Col>
                <Col>
                    <button onClick={() => setPage(page + 1)}>
                        Next
                    </button>
                </Col>
            </Row>

            <Row md={4} className="d-flex g-4 p-4 justify-content-left">
                {
                    wines.map((wine) => {
                        return (
                            <Col>
                                <WineCard wine={wine} />
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}
export default WineModel
