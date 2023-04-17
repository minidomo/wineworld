import './Cards.css';
import './ModelPagination.css';

import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';

import { wineworld } from '../api';
import RegionCard from '../components/RegionCard';
import { clamp } from '../util/clamp';

const RegionModel = () => {
  const [regions, setRegions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalInstances, setTotalInstances] = useState(1);
  const [sortName, setSortName] = useState('Sort By');
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

  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const handleSubmit = event => {
    event.preventDefault();
    navigate(`/regions/search/${query}`);
  };

  useEffect(() => {
    wineworld.get('/regions/constraints')
      .then(res => {
        setCountriesList(res.data.countries);
        setTagsList(res.data.tags);
        setTripTypesList(res.data.tripTypes);
        setSortList(res.data.sorts);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    wineworld.get('/regions',
      {
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
      })
      .then(res => {
        setRegions(res.data.list);
        setTotalPages(res.data.totalPages);
        setTotalInstances(res.data.totalInstances);
        setLoaded(true);
      })
      .catch(console.error);
  }, [page, country, startReviews, endReviews, startRating, endRating, tripTypes, tags, sort]);

  function handlePagination(pageTarget) {
    setPage(clamp(1, totalPages, pageTarget));
  }

  function updateConstraints(element, constraint, category, categoryList) {
    let listCopy = categoryList.map(x => x);
    if (element.checked === true) {
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
      <Dropdown.Item id={id} onClick={() => sortOperations()}>
        {name}
      </Dropdown.Item>
    );
  };

  function createCheckboxDropdownItems(itemNames, callback, callbackArgs) {
    return (
      <>
        {itemNames.map(name => (
          <Dropdown.Item
            onClick={e => {
              e.stopPropagation();
              const checkbox = e.currentTarget.querySelector('input');
              checkbox.click();
            }}
          >
            <FormCheck
              type="checkbox"
              label={name}
              onClick={e => {
                e.stopPropagation();
                callback(e.currentTarget, name, ...callbackArgs);
              }}
            />
          </Dropdown.Item>
        ))}
      </>
    );
  }

  return (
    <Container>
      <h1 class="display-4">Regions</h1>
      <Row>
        <Col>
          <DropdownButton variant="secondary" size="sm" menuVariant="dark" title="Filter" className="mt-2">
            <div class="container">
              <Row className="g-1">
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" size="sm">
                      Country
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark" className="custom">
                      {createCheckboxDropdownItems(countriesList, updateConstraints, ['country', country])}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  <DropdownButton variant="secondary" size="sm" menuVariant="dark" title="Rating">
                    <Container>
                      <form>
                        <div class="form-group">
                          <label for="formGroupExampleInput">Min (0 - 5)</label>
                          <input
                            type="text"
                            class="form-control"
                            id="minRating"
                            placeholder="0"
                            onChange={() => updateNumConstraints('startRating', 'minRating')}
                          ></input>
                        </div>
                        <div class="form-group">
                          <label for="formGroupExampleInput2">Max (0 - 5)</label>
                          <input
                            type="text"
                            class="form-control"
                            id="maxRating"
                            placeholder="5"
                            onChange={() => updateNumConstraints('endRating', 'maxRating')}
                          ></input>
                        </div>
                      </form>
                    </Container>
                  </DropdownButton>
                </Col>
                <Col>
                  <DropdownButton variant="secondary" size="sm" menuVariant="dark" title="Reviews">
                    <Container>
                      <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">
                          Minimum Review Count
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="minReviews"
                          placeholder="0"
                          onChange={() => updateNumConstraints('startReviews', 'minReviews')}
                        ></input>
                      </div>
                      <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">
                          Maximum Review Count
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="maxReviews"
                          placeholder="max"
                          onChange={() => updateNumConstraints('endReviews', 'maxReviews')}
                        ></input>
                      </div>
                    </Container>
                  </DropdownButton>
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" size="sm">
                      Tags
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark" className="custom">
                      {createCheckboxDropdownItems(tagsList, updateConstraints, ['tags', tags])}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" size="sm">
                      Trip Type
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark" className="custom">
                      {createCheckboxDropdownItems(tripTypesList, updateConstraints, ['tripTypes', tripTypes])}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </div>
          </DropdownButton>
        </Col>
        <Col>
          <Dropdown className="mt-2">
            <Dropdown.Toggle id="dropdown-basic-button" variant="secondary" size="sm">
              {sortName}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark" className="custom">
              {sortList.map(constraint => (
                <SortList constraint={constraint} />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <Form onSubmit={handleSubmit} className="d-flex mt-2">
            <Form.Control
              className="custom"
              type="search"
              placeholder="search regions"
              onChange={event => setQuery(event.target.value)}
              size="sm"
            />
          </Form>
        </Col>
      </Row>
      <br></br>
      <Pagination className="justify-content-center">
        <Pagination.First onClick={() => handlePagination(page - 4)} disabled={page === 1} />
        <Pagination.Prev onClick={() => handlePagination(page - 1)} disabled={page === 1} />
        {page > 3 && (
          <Pagination.Item onClick={() => handlePagination(1)} active={page === 1}>
            {' '}
            1{' '}
          </Pagination.Item>
        )}
        {page > 4 && <Pagination.Ellipsis />}
        <Pagination.Item onClick={() => handlePagination(page - 2)} hidden={page < 3}>
          {page - 2}
        </Pagination.Item>
        <Pagination.Item onClick={() => handlePagination(page - 1)} hidden={page < 2}>
          {page - 1}
        </Pagination.Item>
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Item onClick={() => handlePagination(page + 1)} hidden={page > totalPages - 1}>
          {page + 1}
        </Pagination.Item>
        <Pagination.Item onClick={() => handlePagination(page + 2)} hidden={page > totalPages - 2}>
          {page + 2}
        </Pagination.Item>
        {page < totalPages - 3 && <Pagination.Ellipsis />}
        {page < totalPages - 2 && (
          <Pagination.Item onClick={() => handlePagination(totalPages)} active={page === totalPages}>
            {' '}
            {totalPages}{' '}
          </Pagination.Item>
        )}
        <Pagination.Next onClick={() => handlePagination(page + 1)} disabled={page === totalPages} />
        <Pagination.Last onClick={() => handlePagination(page + 4)} disabled={page === totalPages} />
      </Pagination>
      <Row>
        <h6>Found {totalInstances} regions</h6>
      </Row>
      <Row md={4} className="g-4 p-4">
        {loaded ? (
          regions.map(region => (
            <Col>
              <RegionCard region={region} />
            </Col>
          ))
        ) : (
          <Spinner animation="border" role="status"></Spinner>
        )}
      </Row>
    </Container>
  );
};
export default RegionModel;
