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
import './Cards.css';
// import Spinner from 'react-bootstrap/Spinner';
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
    const apiLink = 'https://api.wineworld.me/wines?';
    const [typeList, setTypeList] = useState([]);
    const [countriesList, setCountriesList] = useState([]);
    const [wineryList, setWineryList] = useState([]);
    const [sortList, setSortList] = useState([]);
    const [type, setType] = useState([]);
    const [country, setCountry] = useState([]);
    const [winery, setWinery] = useState([]);
    const [reviews, setReviews] = useState(0);
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
                    startReviews: reviews,
                    startRating: startRating,
                    endRating: endRating,
                    sort: sort,
                },
                paramsSerializer: {
                    indexes: null,
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
    }, [totalPages, page, type, country, winery, reviews, startRating, endRating, sort]);

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

        if (category === 'reviews') {
            if (val !== '0' && !isNaN(val)) {
                setReviews(val);
            } else {
                setReviews(0);
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
                                                    updateNumConstraints('reviews', 'minReviews')}>
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
                            setQuery(event.target.value)}/>
                    </Form>
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col>
                <ButtonGroup>
                    <button class='btn btn-outline-secondary' onClick={() => setPage(Math.max(page + -4, 1))}
                    disabled={page === 1}>
                        &lt;&lt;
                    </button>
                    <button class='btn btn-outline-secondary' onClick={() => setPage(page - 1)} disabled={page === 1}>
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
                        <button class='btn btn-outline-secondary' onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}>
                            Next
                        </button>
                        <button class='btn btn-outline-secondary' onClick={() =>
                            setPage(Math.min(page + 4, totalPages))} disabled={page === totalPages}>
                            &gt;&gt;
                        </button>
                    </ButtonGroup>
                </Col>
            </Row>

            <Row className='g-4 p-4'>
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
