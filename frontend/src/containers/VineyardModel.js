import axios from 'axios';
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
import VineyardCard from '../components/VineyardCard';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from 'react-bootstrap/Pagination';
import './ModelPagination.css'
import { clamp } from '../util/clamp';

const VineyardModel = () => {
    const [vineyards, setVineyards] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalInstances, setTotalInstances] = useState(1);
    const apiLink = 'https://api.wineworld.me/vineyards?';
    const [sortName, setSortName] = useState('Sort By');
    const [countriesList, setCountriesList] = useState([]);
    const [sortList, setSortList] = useState([]);
    const [country, setCountry] = useState([]);
    const [startPrice, setStartPrice] = useState(1);
    const [endPrice, setEndPrice] = useState(4);
    const [startReviews, setStartReviews] = useState(0);
    const [endReviews, setEndReviews] = useState(99999);
    const [startRating, setStartRating] = useState(0.0);
    const [endRating, setEndRating] = useState(5.0);
    const [sort, setSort] = useState([]);

    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const handleSubmit = event => {
        event.preventDefault();
        navigate(`/vineyards/search/${query}`);
    };

    useEffect(() => {
        async function callApi() {
            const response = await axios.get(apiLink, {
                params: {
                    page: page,
                    country: country,
                    startPrice: startPrice,
                    endPrice: endPrice,
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
            setVineyards(response.data.list);
            setLoaded(true);
            setTotalPages(response.data.totalPages);
            setTotalInstances(response.data.totalInstances);

            const constraintsResponse = await axios.get(
                'https://api.wineworld.me/vineyards/constraints', {
            });

            setCountriesList(constraintsResponse.data.countries);
            setSortList(constraintsResponse.data.sorts);
        }

        callApi();
    }, [page, country, startPrice, endPrice, startReviews, endReviews, startRating, endRating, sort]);

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
        if (category === 'country') {
            setCountry(listCopy);
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
        } else if (category === 'startPrice') {
            if (val !== '0' && !isNaN(val)) {
                setStartPrice(val);
            } else {
                setStartPrice(1);
            }
        } else if (category === 'endPrice') {
            if (val !== '0' && !isNaN(val)) {
                setEndPrice(val);
            } else {
                setEndPrice(4);
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
            <h1 class='display-4'>Vineyards</h1>
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
                                        title='Country'
                                    >
                                        <Container>
                                            {countriesList.map(constraint => (
                                                <FormCheck>
                                                    <FormCheck.Input
                                                        id={constraint.concat('CheckV')}
                                                        onClick={() => updateConstraints('country', country,
                                                            constraint, constraint.concat('CheckV'))}
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
                                        title='Price Level'
                                    >
                                        <Container>
                                            <form>
                                                <div class='form-group'>
                                                    <label for='formGroupExampleInput'>Min (1 - 4)</label>
                                                    <input type='text' class='form-control'
                                                        id='minPrice' placeholder='1'
                                                        onChange={() =>
                                                            updateNumConstraints('startPrice', 'minPrice')}>
                                                    </input>
                                                </div>
                                                <div class='form-group'>
                                                    <label for='formGroupExampleInput2'>Max (1 - 4)</label>
                                                    <input type='text' class='form-control'
                                                        id='maxPrice' placeholder='4'
                                                        onChange={() =>
                                                            updateNumConstraints('endPrice', 'maxPrice')}>
                                                    </input>
                                                </div>
                                            </form>
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
                                        <Container>
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
                        <Form.Control type='search' placeholder='search vineyards' onChange={event =>
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
                <h6>Found {totalInstances} vineyards</h6>
            </Row>
            <Row md={4} className='g-4 p-4'>
                {loaded ? (
                    vineyards.map(vineyard => (
                        <Col>
                            <VineyardCard vineyard={vineyard} />
                        </Col>
                    ))) : (
                    <Spinner animation='border' role='status'></Spinner>
                )
                }
            </Row>
        </Container>
    );
};
export default VineyardModel;
