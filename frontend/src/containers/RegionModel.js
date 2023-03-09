import React from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';
// import { get } from '../api-example/siteapi';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RegionCard from '../components/RegionCard';
// import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'

function clamp(minVal, maxVal, val) {
    if (val < minVal)
        return minVal;
    if (val > maxVal)
        return maxVal;
    return val;
}

const RegionModel = () => {
    const [regions, setRegions] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalInstances, setTotalInstances] = useState(1);

    useEffect(() => {
        async function callApi() {
            const response = await axios.get('https://api.wineworld.me/regions', {
                params: {
                    page: page,
                }
            });

            setRegions(response.data.list);
            setTotalPages(response.data.totalPages);
            setTotalInstances(response.data.totalInstances);
        }

        if (1 <= page && page <= totalPages) {
            callApi();
        } else {
            setPage(clamp(1, totalPages, page));
        }
    }, [totalPages, page]);

    return (
        <Container>
            <h1 class="display-4">Regions</h1>
            {/* <Row>
                <Col>
                    <DropdownButton id="dropdown-basic-button" variant="secondary" size="sm" menuVariant="dark" title="Sort By" className="mt-2">
                        <Dropdown.Item href="#/action-1">Name</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Region</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Rating</Dropdown.Item>
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
            </Row> */}
            <br></br>
            <Row>
                <Col>
                    <button class="btn btn-outline-secondary" onClick={() => setPage(page - 1)} disabled={page === 1}>
                        Previous
                    </button>
                </Col>
                <Col>
                    <Row> <h5>Page {page} of {totalPages}</h5></Row>
                    <Row> <h6>Found {totalInstances} regions</h6></Row>
                </Col>
                <Col>
                    <button class="btn btn-outline-secondary" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                        Next
                    </button>
                </Col>
            </Row>
            <Row md={4} className="d-flex g-4 p-4 justify-content-left">
                {
                    regions.map((region) => {
                        return (
                            <Col>
                                <RegionCard region={region} />
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}
export default RegionModel