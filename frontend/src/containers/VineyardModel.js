import './Cards.css';
import './ModelPagination.css';

import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import { wineworld } from '../api';
import { FilterCheckboxDropdownItem } from '../components/models/FilterCheckboxDropdownItem';
import { FilterIntegerInput, FilterNumberInput } from '../components/models/FilterInput';
import { SearchBar } from '../components/models/SearchBar';
import { SortDropdownItem } from '../components/models/SortDropdownItem';
import VineyardCard from '../components/VineyardCard';
import { clamp } from '../util/clamp';

const VineyardModel = () => {
  const [sortName, setSortName] = useState('Sort By: Name (A-Z)');
  const [loaded, setLoaded] = useState(false);

  // data from main api call
  const [vineyards, setVineyards] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalInstances, setTotalInstances] = useState(1);

  // constraints
  const [countryConstraints, setCountryConstraints] = useState([]);
  const [sortConstraints, setSortConstraints] = useState([]);
  const [ratingConstraints, setRatingConstraints] = useState({});
  const [reviewConstraints, setReviewConstraints] = useState({});
  const [priceConstraints, setPriceConstraints] = useState({});

  // params
  const [page, setPage] = useState(1);
  const [country, setCountry] = useState([]);
  const [startPrice, setStartPrice] = useState();
  const [endPrice, setEndPrice] = useState();
  const [startReviews, setStartReviews] = useState();
  const [endReviews, setEndReviews] = useState();
  const [startRating, setStartRating] = useState();
  const [endRating, setEndRating] = useState();
  const [sort, setSort] = useState('name_asc');
  const [searchQuery, setSearchQuery] = useState();

  useEffect(() => {
    wineworld
      .get('/vineyards/constraints')
      .then(res => {
        setCountryConstraints(res.data.countries);
        setSortConstraints(res.data.sorts);
        setRatingConstraints(res.data.rating);
        setReviewConstraints(res.data.reviews);
        setPriceConstraints(res.data.price);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    wineworld
      .get('/vineyards', {
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
          search: searchQuery,
        },
      })
      .then(res => {
        setVineyards(res.data.list);
        setTotalPages(res.data.totalPages);
        setTotalInstances(res.data.totalInstances);
        setLoaded(true);
      })
      .catch(console.error);
  }, [page, country, startPrice, endPrice, startReviews, endReviews, startRating, endRating, sort, searchQuery]);

  function handlePagination(pageTarget) {
    setPage(clamp(1, totalPages, pageTarget));
  }

  return (
    <Container>
      <h1 class="display-4">Vineyards</h1>
      <Row>
        <Col>
          <DropdownButton variant="secondary" size="sm" menuVariant="dark" title="Filter" className="mt-2">
            <div class="container">
              <Row className="g-1">
                <Col>
                  <Dropdown>
                    <div class="d-grid">
                      <Dropdown.Toggle variant="secondary" size="sm">
                        Country
                      </Dropdown.Toggle>
                    </div>
                    <Dropdown.Menu variant="dark" className="custom">
                      {countryConstraints.map(e => (
                        <FilterCheckboxDropdownItem value={e} filters={country} setFilters={setCountry} />
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  <Dropdown>
                    <div class="d-grid">
                      <Dropdown.Toggle variant="secondary" size="sm">
                        Reviews
                      </Dropdown.Toggle>
                    </div>
                    <Dropdown.Menu variant="dark">
                      <div className="input-row">
                        <div className="label">Minimum:</div>
                        <FilterIntegerInput setFilter={setStartPrice} placeholder={`${priceConstraints.min}`} />
                      </div>
                      <div className="input-row">
                        <div className="label">Maximum:</div>
                        <FilterIntegerInput setFilter={setEndPrice} placeholder={`${priceConstraints.max}`} />
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  <Dropdown>
                    <div class="d-grid">
                      <Dropdown.Toggle variant="secondary" size="sm">
                        Reviews
                      </Dropdown.Toggle>
                    </div>
                    <Dropdown.Menu variant="dark">
                      <div className="input-row">
                        <div className="label">Minimum:</div>
                        <FilterIntegerInput setFilter={setStartReviews} placeholder={`${reviewConstraints.min}`} />
                      </div>
                      <div className="input-row">
                        <div className="label">Maximum:</div>
                        <FilterIntegerInput setFilter={setEndReviews} placeholder="max" />
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  <Dropdown>
                    <div class="d-grid">
                      <Dropdown.Toggle variant="secondary" size="sm">
                        Ratings
                      </Dropdown.Toggle>
                    </div>
                    <Dropdown.Menu variant="dark">
                      <div className="input-row">
                        <div className="label">Minimum:</div>
                        <FilterNumberInput setFilter={setStartRating} placeholder={`${ratingConstraints.min}`} />
                      </div>
                      <div className="input-row">
                        <div className="label">Maximum:</div>
                        <FilterNumberInput setFilter={setEndRating} placeholder={`${ratingConstraints.max}`} />
                      </div>
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
              {sortConstraints.map(constraint => (
                <SortDropdownItem name={constraint.name} id={constraint.id} setName={setSortName} setId={setSort} />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <SearchBar placeholder="Search vineyards" setValue={setSearchQuery} valueIfEmpty={undefined} />
        </Col>
      </Row>
      <br />
      {loaded ? (
        <>
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
            <h6>Found {totalInstances} vineyards</h6>
          </Row>
          <Row md={4} className="g-4 p-4">
            {vineyards.map(vineyard => (
              <Col>
                <VineyardCard vineyard={vineyard} searchQuery={searchQuery} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <Spinner animation="border" role="status" />
      )}
    </Container>
  );
};
export default VineyardModel;
