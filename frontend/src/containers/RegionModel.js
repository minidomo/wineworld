import axios from 'axios';
import React, { useState, useEffect } from 'react';
// Import { get } from '../api-example/siteapi';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FormCheck from 'react-bootstrap/FormCheck';
import Row from 'react-bootstrap/Row';
import RegionCard from '../components/RegionCard';
// Import Spinner from "react-bootstrap/Spinner";

function clamp(minVal, maxVal, val) {
    if (val < minVal) return minVal;
    if (val > maxVal) return maxVal;
    return val;
}

const RegionModel = () => {
    const [regions, setRegions] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalInstances, setTotalInstances] = useState(1);
    const [sortName, setSortName] = useState('Sort By');
    const [orderName, setOrderName] = useState('Order');
    const [apiLink, setApiLink] = useState('https://api.wineworld.me/regions?');
    const [tagsList, setTagsList] = useState([]);
    const [countriesList, setCountriesList] = useState([]);
    const [tripTypesList, setTripTypesList] = useState([]);
    const [sortList, setSortList] = useState([]);
    const [country, setCountry] = useState([]);
    const [startReviews, setStartReviews] = useState(0);
    const [endReviews, setEndReviews] = useState(99999);
    const [startRating, setStartRating] = useState(0.0);
    const [endRating, setEndRating] = useState(5.0);
    const [tripTypes, setTripTypes] = useState([]);
    const [tags, setTags] = useState([]);
    const [sort, setSort] = useState([]);

    useEffect(() => {
        async function callApi() {
            const response = await axios.get(apiLink, {
                params: {
                    page: page,
                    country: country,
                    startReviews: startReviews,
                    endReviews: endReviews,
                    startRating: startRating,
                    endRating: endRating,
                    tripTypes: tripTypes,
                    tags: tags,
                    sort: sort,
                },
                paramsSerializer: {
                    indexes: null,
                },
            });

            setRegions(response.data.list);
            setTotalPages(response.data.totalPages);
            setTotalInstances(response.data.totalInstances);

            const constraintsResponse = await axios.get(
                'https://api.wineworld.me/regions/constraints', {
            });

            setCountriesList(constraintsResponse.data.countries);
            setTagsList(constraintsResponse.data.tags);
            setTripTypesList(constraintsResponse.data.tripTypes);
            setSortList(constraintsResponse.data.sorts);
        }

        if (page >= 1 && page <= totalPages) {
            callApi();
        } else {
            setPage(clamp(1, totalPages, page));
        }
    }, [totalPages, page, country, startReviews, endReviews, startRating, endRating, tripTypes, tags, sort]);

    function updateConstraints(category, categoryList, constraint, id) {
        let checkbox = document.getElementById(id);
        let listCopy = categoryList.map(x => x);
        if (checkbox.checked === true) {
            listCopy.push(constraint);
        } else {
            const index = listCopy.indexOf(constraint);
            if (index > -1) {
                listCopy.splice(index, 1);
            }
        }
        if (category === 'country') {
            setCountry(listCopy);
        } else if (category === 'tags') {
            setTags(listCopy);
        } else if (category === 'tripTypes') {
            setTripTypes(listCopy);
        }
    }

    function updateNumConstraints(category, id) {
        var val = document.getElementById(id).value;
        console.log(val);

        if (category === 'startReviews') {
            if (val !== '0' && !isNaN(val)) {
                setStartReviews(val);
            } else {
                setStartReviews(0);
            }
        } else if (category === 'endReviews') {
            if (val !== '0' && !isNaN(val)) {
                setStartRating(val);
            } else {
                setStartRating(99999);
            }
        } else if (category === 'startRating') {
            if (val !== '0' && !isNaN(val)) {
                setStartRating(val);
            } else {
                setStartRating(1);
            }
        } else if (category === 'endRating') {
            if (val !== '0' && !isNaN(val)) {
                setEndRating(val);
            } else {
                setEndRating(5);
            }
        }
    }

    const SortList = props => {
        const { name, id } = props.constraint;

        function sortOperations() {
            setSort(id);
            setSortName(name);
        }
        return (
            <Dropdown.Item
                id={id}
                onClick={() => sortOperations()}
            >{name}</Dropdown.Item>
        );
    };

    return (
        <Container>
            <h1 class="display-4">Regions</h1>
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
                                        title="Country"
                                    >
                                        <Container>
                                            {countriesList.map(constraint => (
                                                <FormCheck>
                                                    <FormCheck.Input
                                                        id={constraint.concat('CheckR')}
                                                        onClick={() => updateConstraints('country', country,
                                                            constraint, constraint.concat('CheckR'))}
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
                                        title="Rating"
                                    >
                                        <Container>
                                            <form>
                                                <div class="form-group">
                                                    <label for="formGroupExampleInput">Min (0 - 5)</label>
                                                    <input type="text" class="form-control"
                                                        id="minRating" placeholder="0"
                                                        onChange={() =>
                                                            updateNumConstraints('startRating', 'minRating')}>
                                                    </input>
                                                </div>
                                                <div class="form-group">
                                                    <label for="formGroupExampleInput2">Max (0 - 5)</label>
                                                    <input type="text" class="form-control"
                                                        id="maxRating" placeholder="5"
                                                        onChange={() =>
                                                            updateNumConstraints('endRating', 'maxRating')}>
                                                    </input>
                                                </div>
                                            </form>
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
                                        <Container>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label">
                                                    Minimum Review Count
                                                </label>
                                                <input type="text" class="form-control"
                                                    id="minReviews" placeholder="0"
                                                    onChange={() =>
                                                        updateNumConstraints('startReviews', 'minReviews')}>
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
                                        title="Tags"
                                    >
                                        <Container>
                                            {tagsList.map(constraint => (
                                                <FormCheck>
                                                    <FormCheck.Input
                                                        id={constraint.concat('CheckR')}
                                                        onClick={() => updateConstraints('tags', tags,
                                                            constraint, constraint.concat('CheckR'))}
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
                                        title="Trip Type"
                                    >
                                        <Container>
                                            {tripTypesList.map(constraint => (
                                                <FormCheck>
                                                    <FormCheck.Input
                                                        id={constraint.concat('CheckR')}
                                                        onClick={() => updateConstraints('tripTypes', tripTypes,
                                                            constraint, constraint.concat('CheckR'))}
                                                    ></FormCheck.Input>
                                                    <FormCheck.Label>{constraint}</FormCheck.Label>
                                                </FormCheck>
                                            ))}
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
                        {sortList.map(constraint => (
                            <SortList constraint={constraint} />
                        ))}
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
                        <h6>Found {totalInstances} regions</h6>
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
                {regions.map(region => (
                    <Col>
                        <RegionCard region={region} />
                    </Col>
                ))}
            </Row>
        </Container >
    );
};
export default RegionModel;
