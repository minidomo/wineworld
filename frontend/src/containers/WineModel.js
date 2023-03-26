import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';
// import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
// import DropdownItem from 'react-bootstrap/esm/DropdownItem';
// import MenuItem from '../components/MenuItem';
// import { menuItem } from '../components/MenuItems';
// import MenuItem from '../components/MenuItem';
// import { MenuItems } from '../components/MenuItems';
import WineCard from '../components/WineCard';
// import Spinner from "react-bootstrap/Spinner";

function clamp(minVal, maxVal, val) {
    if (val < minVal) return minVal;
    if (val > maxVal) return maxVal;
    return val;
}

const WineModel = () => {
    const [wines, setWines] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalInstances, setTotalInstances] = useState(1);
    const [filters, setFilters] = useState([]);
    const [sortName, setSortName] = useState('Sort By');
    const [orderName, setOrderName] = useState('Order');
    const [apiLink, setApiLink] = useState('https://api.wineworld.me/wines?');
    const [typeList, setTypeList] = useState([]);
    const [countriesList, setCountriesList] = useState([]);
    const [wineryList, setWineryList] = useState([]);
    const [sortList, setSortList] = useState([]);

    useEffect(() => {
        async function callApi() {
            const response = await axios.get(
                apiLink, {
                params: {
                    page: page,
                },
            });

            setWines(response.data.list);
            setTotalPages(response.data.totalPages);
            setTotalInstances(response.data.totalInstances);

            const constraintsResponse = await axios.get(
                'https://api.wineworld.me/wines/constraints', {
            });

            setTypeList(constraintsResponse.data.types);
            setCountriesList(constraintsResponse.data.countries);
            setWineryList(constraintsResponse.data.wineries);
            setSortList(constraintsResponse.data.sorts);
        }

        if (page >= 1 && page <= totalPages) {
            callApi();
        } else {
            setPage(clamp(1, totalPages, page));
        }
    }, [totalPages, page]);

    function updateConstraints(category, id) {
        var checkbox = document.getElementById(id);
        if (checkbox.checked === true) {
            setApiLink(apiLink.concat('&'.concat(category.concat('=').concat(id.replace('Check', '')))));
        } else {
            setApiLink(apiLink.replace(category.concat('=').concat(id.replace('Check', '')), ''));
        }
    }

    function updateReviews(id) {
        var reviewText = document.getElementById(id);
        if (reviewText.TEXT_NODE !== '0' && !isNaN(reviewText.TEXT_NODE)) {
            setApiLink(apiLink.concat('&startReviews=').concat(reviewText.TEXT_NODE));
        } else {
            setApiLink(apiLink.replace('&startReviews', ''));
        }
    }

    function updateSort(id) {
        var item = document.getElementById(id);
        if (item.selected === true) {
            // setApiLink(apiLink.replace(('sort=*&').concat(id.replace('Check', '')), ''));
            setApiLink(apiLink.concat('&sort='.concat(id)));
        }
    }

    return (
        <Container>
            <h1 class="display-4">Wines</h1>
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
                                    >
                                        <Container>
                                            {typeList.map(constraint => (
                                                <FormCheck>
                                                    <FormCheck.Input
                                                        id={constraint.concat('Check')}
                                                        onClick={() => updateConstraints('type',
                                                            constraint.concat('Check'))}
                                                    ></FormCheck.Input>
                                                    <FormCheck.Label>{constraint}</FormCheck.Label>
                                                </FormCheck>
                                            ))}
                                        </Container>
                                    </DropdownButton>
                                </Col>
                                <Col>
                                    <DropdownButton
                                        variant="secondary"
                                        size="sm"
                                        menuVariant="dark"
                                        title="Country"
                                    >
                                        <Container>
                                            {countriesList.map(constraint => (
                                                <FormCheck>
                                                    <FormCheck.Input
                                                        id={constraint.concat('Check')}
                                                        onClick={() => updateConstraints('country',
                                                            constraint.concat('Check'))}
                                                    ></FormCheck.Input>
                                                    <FormCheck.Label>{constraint}</FormCheck.Label>
                                                </FormCheck>
                                            ))}
                                        </Container>
                                    </DropdownButton>
                                </Col>
                                <Col>
                                    <DropdownButton
                                        variant="secondary"
                                        size="sm"
                                        menuVariant="dark"
                                        title="Winery"
                                    >
                                        <Container>
                                            {wineryList.map(constraint => (
                                                <FormCheck>
                                                    <FormCheck.Input
                                                        id={constraint.concat('Check')}
                                                        onClick={() => updateConstraints('type',
                                                            constraint.concat('Check'))}
                                                    ></FormCheck.Input>
                                                    <FormCheck.Label>{constraint}</FormCheck.Label>
                                                </FormCheck>
                                            ))}
                                        </Container>
                                    </DropdownButton>
                                </Col>
                                <Col>
                                    <DropdownButton
                                        variant="secondary"
                                        size="sm"
                                        menuVariant="dark"
                                        title="Reviews"
                                    >
                                        {/* <FormCheck>
                                            <FormCheck.Input
                                                id={constraint.concat('Check')}
                                                onClick={() => updateConstraints('type',
                                                    constraint.concat('Check'))}
                                            ></FormCheck.Input>
                                            <FormCheck.Label>{constraint}</FormCheck.Label>
                                        </FormCheck> */}
                                        <Container>
                                            {/* <Form>
                                                <Form.Group>
                                                    <Form.Label>
                                                        Minimum Review Count
                                                    </Form.Label>
                                                    <Form.Control
                                                        id='MinReviews'
                                                        onClick={() => updateReviews('MinReviews')}>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Form> */}
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label">
                                                    Minimum Review Count
                                                </label>
                                                <input type="text" class="form-control"
                                                    id="MinReviews" placeholder="0"
                                                    onClick={() => updateReviews('MinReviews')}>
                                                </input>
                                            </div>
                                        </Container>
                                    </DropdownButton>
                                </Col>
                                <Col>
                                    <DropdownButton
                                        variant="secondary"
                                        size="sm"
                                        menuVariant="dark"
                                        title="Ratings"
                                    >
                                        <Container>
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
                                        </Container>
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
                        {/* {sortList.name.map(constraint => (
                            <Dropdown.Item
                                id={constraint.id}
                                onClick={() => updateSort(constraint.id)}
                            >{ constraint.name }</Dropdown.Item>
                        ))} */}
                        <Dropdown.Item onClick={() => setSortName('Name')}>Name</Dropdown.Item>
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
                        <h6>Found {totalInstances} wines</h6>
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
                {wines.map(wine => (
                    <Col>
                        <WineCard wine={wine} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
export default WineModel;
