import axios from 'axios';
import qs from 'qs';
import React, { useState, useEffect } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import WineCard from '../components/WineCard';
import Pagination from 'react-bootstrap/Pagination';
import "./Cards.css"
import "./ModelPagination.css"
import { clamp } from '../util/clamp';
import Spinner from "react-bootstrap/Spinner";

const WineModel = () => {
    const [wines, setWines] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalInstances, setTotalInstances] = useState(1);
    const [sortName, setSortName] = useState('Sort By');
    const apiLink = 'https://api.wineworld.me/wines?';
    const [typeList, setTypeList] = useState([]);
    const [countriesList, setCountriesList] = useState([]);
    const [wineryList, setWineryList] = useState([]);
    const [sortList, setSortList] = useState([]);
    const [type, setType] = useState([]);
    const [country, setCountry] = useState([]);
    const [winery, setWinery] = useState([]);
    const [startReviews, setStartReviews] = useState(0);
    const [endReviews, setEndReviews] = useState(99999);
    const [startRating, setStartRating] = useState(0.0);
    const [endRating, setEndRating] = useState(5.0);
    const [sort, setSort] = useState([]);

    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const handleSubmit = event => {
        event.preventDefault();
        navigate(`/wines/search/${query}`);
    };

    useEffect(() => {
        async function callApi() {
            const response = await axios.get(
                apiLink, {
                params: {
                    page: page,
                    type: type,
                    country: country,
                    winery: winery,
                    startReviews: startReviews,
                    endReviews: endReviews,
                    startRating: startRating,
                    endRating: endRating,
                    sort: sort,
                },
                paramsSerializer: {
                    indexes: null,
                },
            });

            setWines(response.data.list);
            setLoaded(true);
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

        callApi();
    }, [page, type, country, winery, startReviews, endReviews, startRating, endRating, sort]);

    function handlePagination(pageTarget) {
        setPage(clamp(1, totalPages, pageTarget));
    }

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
        if (category === 'type') {
            setType(listCopy);
        } else if (category === 'country') {
            setCountry(listCopy);
        } else if (category === 'winery') {
            setWinery(listCopy);
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
                setEndReviews(val);
            } else {
                setEndReviews(99999);
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
            <h1 class='display-4'>Wines</h1>
            <Row>
                <Col>
                    <DropdownButton
                        variant='secondary'
                        size='sm'
                        menuVariant='dark'
                        title='Filter'
                        className='mt-2'
                    >
                        <div class='container'>
                            <Row>
                                <Col>
                                    <DropdownButton
                                        variant='secondary'
                                        size='sm'
                                        menuVariant='dark'
                                        title='Type'
                                    >
                                        <Container>
                                            {typeList.map(constraint => (
                                                <FormCheck>
                                                    <FormCheck.Input
                                                        id={constraint.concat('CheckW')}
                                                        onClick={() => {
                                                            updateConstraints('type', type, constraint,
                                                                constraint.concat('CheckW'));
                                                        }}
                                                    ></FormCheck.Input>
                                                    <FormCheck.Label>{constraint}</FormCheck.Label>
                                                </FormCheck>
                                            ))}
                                        </Container>
                                    </DropdownButton>
                                </Col>
                                <Col>
                                    <DropdownButton
                                        variant='secondary'
                                        size='sm'
                                        menuVariant='dark'
                                        title='Country'
                                    >
                                        <Container>
                                            {countriesList.map(constraint => (
                                                <FormCheck>
                                                    <FormCheck.Input
                                                        id={constraint.concat('CheckW')}
                                                        onClick={() => {
                                                            updateConstraints('country', country, constraint,
                                                                constraint.concat('CheckW'));
                                                        }}
                                                    ></FormCheck.Input>
                                                    <FormCheck.Label>{constraint}</FormCheck.Label>
                                                </FormCheck>
                                            ))}
                                        </Container>
                                    </DropdownButton>
                                </Col>
                                <Col>
                                    <DropdownButton
                                        variant='secondary'
                                        size='sm'
                                        menuVariant='dark'
                                        title='Winery'
                                    >
                                        <Container>
                                            {wineryList.map(constraint => (
                                                <FormCheck>
                                                    <FormCheck.Input
                                                        id={constraint.concat('CheckW')}
                                                        onClick={() => {
                                                            updateConstraints('winery', winery, constraint,
                                                                constraint.concat('CheckW'));
                                                        }}
                                                    ></FormCheck.Input>
                                                    <FormCheck.Label>{constraint}</FormCheck.Label>
                                                </FormCheck>
                                            ))}
                                        </Container>
                                    </DropdownButton>
                                </Col>
                                <Col>
                                    <DropdownButton
                                        variant='secondary'
                                        size='sm'
                                        menuVariant='dark'
                                        title='Reviews'
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
                                            <div class='mb-3'>
                                                <label for='exampleFormControlInput1' class='form-label'>
                                                    Minimum Review Count
                                                </label>
                                                <input type='text' class='form-control'
                                                    id='minReviews' placeholder='0'
                                                    onChange={() =>
                                                        updateNumConstraints('startReviews', 'minReviews')}>
                                                </input>
                                            </div>
                                            <div class='mb-3'>
                                                <label for='exampleFormControlInput1' class='form-label'>
                                                    Maximum Review Count
                                                </label>
                                                <input type='text' class='form-control'
                                                    id='maxReviews' placeholder='max'
                                                    onChange={() =>
                                                        updateNumConstraints('endReviews', 'maxReviews')}>
                                                </input>
                                            </div>
                                        </Container>
                                    </DropdownButton>
                                </Col>
                                <Col>
                                    <DropdownButton
                                        variant='secondary'
                                        size='sm'
                                        menuVariant='dark'
                                        title='Ratings'
                                    >
                                        <Container>
                                            <form>
                                                <div class='form-group'>
                                                    <label for='formGroupExampleInput'>Min (0 - 5)</label>
                                                    <input type='text' class='form-control'
                                                        id='minRating' placeholder='0'
                                                        onChange={() =>
                                                            updateNumConstraints('startRating', 'minRating')}>
                                                    </input>
                                                </div>
                                                <div class='form-group'>
                                                    <label for='formGroupExampleInput2'>Max (0 - 5)</label>
                                                    <input type='text' class='form-control'
                                                        id='maxRating' placeholder='5'
                                                        onChange={() =>
                                                            updateNumConstraints('endRating', 'maxRating')}>
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
                        id='dropdown-basic-button'
                        variant='secondary'
                        size='sm'
                        menuVariant='dark'
                        title={sortName}
                        className='mt-2'
                    >
                        {sortList.map(constraint => (
                            <SortList constraint={constraint} />
                        ))}
                    </DropdownButton>
                </Col>
                <Col>
                    <Form onSubmit={handleSubmit} className='d-flex'>
                        <Form.Control type='search' placeholder='search wines' onChange={event =>
                            setQuery(event.target.value)} />
                    </Form>
                </Col>
            </Row>
            <br></br>
            <Pagination className="justify-content-center">
                <Pagination.First onClick={() => handlePagination(page - 4)} disabled={page === 1} />
                <Pagination.Prev onClick={() => handlePagination(page - 1)} disabled={page === 1} />
                {page > 3 && (
                    <Pagination.Item
                        onClick={() => handlePagination(1)}
                        active={1 === page}> 1 </Pagination.Item>)}
                {page > 4 && <Pagination.Ellipsis />}
                <Pagination.Item onClick={() => handlePagination(page - 2)} hidden={page < 3}>{page - 2}</Pagination.Item>
                <Pagination.Item onClick={() => handlePagination(page - 1)} hidden={page < 2}>{page - 1}</Pagination.Item>
                <Pagination.Item active>{page}</Pagination.Item>
                <Pagination.Item onClick={() => handlePagination(page + 1)} hidden={page > totalPages - 1}>{page + 1}</Pagination.Item>
                <Pagination.Item onClick={() => handlePagination(page + 2)} hidden={page > totalPages - 2}>{page + 2}</Pagination.Item>
                {page < totalPages - 3 && <Pagination.Ellipsis />}
                {page < totalPages - 2 && (
                    <Pagination.Item
                        onClick={() => handlePagination(totalPages)}
                        active={page === totalPages}> {totalPages} </Pagination.Item>)}
                <Pagination.Next onClick={() => handlePagination(page + 1)} disabled={page === totalPages} />
                <Pagination.Last onClick={() => handlePagination(page + 4)} disabled={page === totalPages} />
            </Pagination>
            <Row>
                <h6>Found {totalInstances} wines</h6>
            </Row>
            <Row md={4} className='d-flex g-4 p-4'>
                {loaded ? (
                    wines.map(wine => (
                        <Col>
                            <WineCard wine={wine} />
                        </Col>
                    ))) : (
                    <Spinner animation='border' role='status'></Spinner>
                )
                }
            </Row>
        </Container>
    );
};
export default WineModel;
