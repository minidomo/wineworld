import axios from 'axios';
import React, { useState, useEffect } from 'react';
// Import { get } from '../api-example/siteapi';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';
import VineyardCard from '../components/VineyardCard';
// Import Spinner from "react-bootstrap/Spinner";

function clamp(minVal, maxVal, val) {
    if (val < minVal) return minVal;
    if (val > maxVal) return maxVal;
    return val;
}

const VineyardModel = () => {
    const [vineyards, setVineyards] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalInstances, setTotalInstances] = useState(1);
    const [sortName, setSortName] = useState('Sort By');
    const [orderName, setOrderName] = useState('Order');

    useEffect(() => {
        async function callApi() {
            const response = await axios.get('https://api.wineworld.me/vineyards', {
                params: {
                    page: page,
                },
            });
            setVineyards(response.data.list);
            setTotalPages(response.data.totalPages);
            setTotalInstances(response.data.totalInstances);
        }

        if (page >= 1 && page <= totalPages) {
            callApi();
        } else {
            setPage(clamp(1, totalPages, page));
        }
    }, [totalPages, page]);

    return (
        <Container>
            <h1 class="display-4">Vineyards</h1>
            <Row>
                <Col>
                    <DropdownButton
                        variant="secondary"
                        size="sm"
                        menuVariant="dark"
                        title="Filter"
                        className="mt-2"
                    >
                        <div class="container">
                            <Row>
                                <Col>
                                    <DropdownButton
                                        variant="secondary"
                                        size="sm"
                                        menuVariant="dark"
                                        title="Type"
                                    ></DropdownButton>
                                </Col>
                                <Col>
                                    <DropdownButton
                                        variant="secondary"
                                        size="sm"
                                        menuVariant="dark"
                                        title="Country"
                                    ></DropdownButton>
                                </Col>
                                <Col>
                                    <DropdownButton
                                        variant="secondary"
                                        size="sm"
                                        menuVariant="dark"
                                        title="Region"
                                    ></DropdownButton>
                                </Col>
                                <Col>
                                    <DropdownButton
                                        variant="secondary"
                                        size="sm"
                                        menuVariant="dark"
                                        title="Winery"
                                    ></DropdownButton>
                                </Col>
                                <Col>
                                    <DropdownButton
                                        variant="secondary"
                                        size="sm"
                                        menuVariant="dark"
                                        title="Reviews"
                                    ></DropdownButton>
                                </Col>
                                <Col>
                                    <DropdownButton
                                        variant="secondary"
                                        size="sm"
                                        menuVariant="dark"
                                        title="Ratings"
                                    >
                                        <div class="container">
                                            <form>
                                                <div class="form-group">
                                                    <label for="formGroupExampleInput">Min (1-5)</label>
                                                    <input type="text" class="form-control"
                                                        id="formGroupExampleInput" placeholder="">
                                                    </input>
                                                </div>
                                                <div class="form-group">
                                                    <label for="formGroupExampleInput2">Max (1-5)</label>
                                                    <input type="text" class="form-control"
                                                        id="formGroupExampleInput2" placeholder="">
                                                    </input>
                                                </div>
                                            </form>
                                        </div>
                                    </DropdownButton>

                                </Col>
                            </Row>
                        </div>
                    </DropdownButton>

                </Col>
                <Col>
                    <DropdownButton
                        id="dropdown-basic-button"
                        variant="secondary"
                        size="sm"
                        menuVariant="dark"
                        title={sortName}
                        className="mt-2"
                    >
                        <Dropdown.Item onClick={() => setSortName('Name')}>Name</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col>
                    <DropdownButton
                        id="dropdown-basic-button"
                        variant="secondary"
                        size="sm"
                        menuVariant="dark"
                        title={orderName}
                        className="mt-2"
                    >
                        <Dropdown.Item onClick={() => setOrderName('Ascending')}>Ascending</Dropdown.Item>
                        <Dropdown.Item onClick={() => setOrderName('Descending')}>Descending</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col>
                    <form class="d-flex" role="search">
                        <input class="form-control me-1" type="search" placeholder="Search" aria-label="Search"></input>
                        <button class="btn btn-outline-secondary" type="submit">
                            Search
                        </button>
                    </form>
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col>
                    <button class="btn btn-outline-secondary" onClick={() => setPage(page - 1)} disabled={page === 1}>
                        Previous
                    </button>
                </Col>
                <Col>
                    <Row>
                        {' '}
                        <h5>
                            Page {page} of {totalPages}
                        </h5>
                    </Row>
                    <Row>
                        {' '}
                        <h6>Found {totalInstances} vineyards</h6>
                    </Row>
                </Col>
                <Col>
                    <button
                        class="btn btn-outline-secondary"
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </Col>
            </Row>
            <Row className="g-4 p-4">
                {vineyards.map(vineyard => (
                    <Col>
                        <VineyardCard vineyard={vineyard} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
export default VineyardModel;
