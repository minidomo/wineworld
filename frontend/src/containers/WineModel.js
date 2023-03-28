import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import FormCheck from 'react-bootstrap/FormCheck';
import Row from 'react-bootstrap/Row';
import WineCard from '../components/WineCard';
import "./Cards.css"
// import Spinner from "react-bootstrap/Spinner";
import {useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';

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

    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/wines/search/${query}`);
    };

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
            setApiLink(apiLink.concat('&'.concat(category.concat('=').concat(id.replace('CheckW', '')))));
        } else {
            setApiLink(apiLink.replace('&'.concat(category.concat('=').concat(id.replace('CheckW', ''))), ''));
        }
    }

    function updateReviews(id) {
        var reviewText = document.getElementById(id);
        if (reviewText.value !== '0' && !isNaN(reviewText.value)) {
            setApiLink(apiLink.concat('&startReviews=').concat(reviewText.value));
        } else {
            setApiLink(apiLink.replace('&startReviews', ''));
        }
    }

    const SortList = props => {
        const { name, id } = props.constraint;

        function sortOperations() {
            var preString = 'sort=',
            searchString = '&';
            var preIndex;
            var adjustIndex;
            if (apiLink.indexOf(preString) === -1) {
                preIndex = apiLink.length;
                adjustIndex = preIndex;
            } else {
                preIndex = apiLink.indexOf(preString);
                adjustIndex = preIndex - 1;
            }
            var searchIndex;
            if (apiLink.substring(preIndex).indexOf(searchString) === -1) {
                searchIndex = apiLink.length;
            } else {
                searchIndex = preIndex + apiLink.substring(preIndex).indexOf(searchString);
            }

            setApiLink(apiLink.replace(apiLink.substring(adjustIndex, searchIndex), '').concat('&sort='.concat(id)));
            // console.log(apiLink);
            // setApiLink(apiLink.concat('&sort='.concat(id)));
            setSortName(name);
        }
        return (
            <Dropdown.Item
                id={ id }
                onClick={() => sortOperations()}
            >{ name }</Dropdown.Item>
        );
    };

    return (
        <Container>
            <h1 class="display-4">Wines</h1>
            <h6>{ apiLink }</h6>
            <Row>
                <Col>
                    <DropdownButton
                        variant="secondary"
                        size="sm"
                        menuVariant="dark"
                        title="Filter"
                        className="mt-2"
                    >
                        <div  class="container" style={{height: 1000}}>
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
                                                        id={constraint.concat('CheckW')}
                                                        onClick={() => updateConstraints('type',
                                                            constraint.concat('CheckW'))}
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
                                                        id={constraint.concat('CheckW')}
                                                        onClick={() => updateConstraints('country',
                                                            constraint.concat('CheckW'))}
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
                                                        id={constraint.concat('CheckW')}
                                                        onClick={() => updateConstraints('type',
                                                            constraint.concat('CheckW'))}
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
                                                id={constraint.concat('CheckW')}
                                                onClick={() => updateConstraints('type',
                                                    constraint.concat('CheckW'))}
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
                        {sortList.map(constraint => (
                            <SortList constraint = {constraint}/>
                        ))}
                        <Dropdown.Item onClick={() => setSortName('Name')}>Name</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col>
                    <Form onSubmit={handleSubmit} className="d-flex">
                        <Form.Control type="search" placeholder="search wines" onChange={(event) => setQuery(event.target.value)}/>
                    </Form>
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col>
                <ButtonGroup>
                    <button class="btn btn-outline-secondary" onClick={() => setPage(Math.max(page + -4, 1))} disabled={page === 1}>
                        &lt;&lt;
                    </button>
                    <button class="btn btn-outline-secondary" onClick={() => setPage(page - 1)} disabled={page === 1}>
                        Previous
                    </button>
                </ButtonGroup> 
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
                    <ButtonGroup>
                        <button class="btn btn-outline-secondary" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                            Next
                        </button>
                        <button class="btn btn-outline-secondary" onClick={() => setPage(Math.min(page + 4, totalPages))} disabled={page === totalPages}>
                            &gt;&gt;
                        </button>
                    </ButtonGroup>
                    
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
