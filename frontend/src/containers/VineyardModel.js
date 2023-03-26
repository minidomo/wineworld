import axios from 'axios';
import React, { useState, useEffect } from 'react';
// Import { get } from '../api-example/siteapi';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FormCheck from 'react-bootstrap/FormCheck';
import Row from 'react-bootstrap/Row';
import VineyardCard from '../components/VineyardCard';
// Import Spinner from "react-bootstrap/Spinner";
import {useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';

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
    const [apiLink, setApiLink] = useState('https://api.wineworld.me/vineyards?');
    const [sortName, setSortName] = useState('Sort By');
    const [countriesList, setCountriesList] = useState([]);
    const [sortList, setSortList] = useState([]);

    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/Vineyards/Search/${query}`);
    };

    useEffect(() => {
        async function callApi() {
            const response = await axios.get(apiLink, {
                params: {
                    page: page,
                },
            });
            setVineyards(response.data.list);
            setTotalPages(response.data.totalPages);
            setTotalInstances(response.data.totalInstances);

            const constraintsResponse = await axios.get(
                'https://api.wineworld.me/vineyards/constraints', {
            });

            setCountriesList(constraintsResponse.data.countries);
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
            setApiLink(apiLink.concat('&'.concat(category.concat('=').concat(id.replace('CheckV', '')))));
        } else {
            setApiLink(apiLink.replace('&'.concat(category.concat('=').concat(id.replace('CheckV', ''))), ''));
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
            <h1 class="display-4">Vineyards</h1>
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
                                                        id={constraint.concat('CheckV')}
                                                        onClick={() => updateConstraints('country',
                                                            constraint.concat('CheckV'))}
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
                                        title="Price Level"
                                    >
                                        <Container>
                                            Slider
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
                                            Slider
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
                        {sortList.map(constraint => (
                            <SortList constraint = {constraint}/>
                        ))}
                        <Dropdown.Item onClick={() => setSortName('Name')}>Name</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col>
                    <Form onSubmit={handleSubmit} className="d-flex">
                        <Form.Control type="search" placeholder="search" onChange={(event) => setQuery(event.target.value)}/>
                    </Form>
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
