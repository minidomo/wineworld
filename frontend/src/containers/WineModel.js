import './Cards.css';

import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';

import { wineworld } from '../api';
import { CustomPagination } from '../components/models/CustomPagination';
import { FilterCheckboxDropdownItem } from '../components/models/FilterCheckboxDropdownItem';
import { FilterIntegerInput, FilterNumberInput } from '../components/models/FilterInput';
import { SearchBar } from '../components/models/SearchBar';
import { SortDropdownItem } from '../components/models/SortDropdownItem';
import WineCard from '../components/WineCard';
import { loading } from '../util/loadingAnimation';

const WineModel = () => {
  const [sortName, setSortName] = useState('Sort By: Name (A-Z)');
  const [loaded, setLoaded] = useState(false);

  // data from main api call
  const [wines, setWines] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalInstances, setTotalInstances] = useState(1);

  // constraints
  const [typeConstraints, setTypeConstraints] = useState([]);
  const [countryConstraints, setCountryConstraints] = useState([]);
  const [wineryConstraints, setWineryConstraints] = useState([]);
  const [sortConstraints, setSortConstraints] = useState([]);
  const [ratingConstraints, setRatingConstraints] = useState({});
  const [reviewConstraints, setReviewConstraints] = useState({});

  // params
  const [page, setPage] = useState(1);
  const [type, setType] = useState([]);
  const [country, setCountry] = useState([]);
  const [winery, setWinery] = useState([]);
  const [startReviews, setStartReviews] = useState();
  const [endReviews, setEndReviews] = useState();
  const [startRating, setStartRating] = useState();
  const [endRating, setEndRating] = useState();
  const [sort, setSort] = useState('name_asc');
  const [searchQuery, setSearchQuery] = useState();

  useEffect(() => {
    wineworld
      .get('/wines/constraints')
      .then(res => {
        setTypeConstraints(res.data.types);
        setCountryConstraints(res.data.countries);
        setWineryConstraints(res.data.wineries);
        setSortConstraints(res.data.sorts);
        setRatingConstraints(res.data.rating);
        setReviewConstraints(res.data.reviews);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    wineworld
      .get('/wines', {
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
          search: searchQuery,
        },
      })
      .then(res => {
        setWines(res.data.list);
        setTotalPages(res.data.totalPages);
        setTotalInstances(res.data.totalInstances);
        setLoaded(true);
      })
      .catch(console.error);
  }, [page, type, country, winery, startReviews, endReviews, startRating, endRating, sort, searchQuery]);

  return (
    <Container>
      <h1 className="display-4">Wines</h1>
      <Row>
        <Col>
          <DropdownButton variant="secondary" size="sm" menuVariant="dark" title="Filter" className="mt-2">
            <Container>
              <Row className="g-1" style={{ flexWrap: 'nowrap' }}>
                <Col>
                  <Dropdown>
                    <div class="d-grid">
                      <Dropdown.Toggle variant="secondary" size="sm">
                        Type
                      </Dropdown.Toggle>
                    </div>
                    <Dropdown.Menu variant="dark" className="custom">
                      {typeConstraints.map(e => (
                        <FilterCheckboxDropdownItem value={e} filters={type} setFilters={setType} />
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
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
                        Winery
                      </Dropdown.Toggle>
                    </div>
                    <Dropdown.Menu variant="dark" className="custom">
                      {wineryConstraints.map(e => (
                        <FilterCheckboxDropdownItem value={e} filters={winery} setFilters={setWinery} />
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
            </Container>
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
          <SearchBar placeholder="Search wines" setValue={setSearchQuery} valueIfEmpty={undefined} />
        </Col>
      </Row>
      <br />
      {loading({
        loaded: loaded,
        element: (
          <>
            <CustomPagination
              firstPage={1}
              lastPage={totalPages}
              setPage={setPage}
              getCurrentPage={() => page}
              maxVisiblePages={5}
            />
            <Row>
              <h6>Found {totalInstances} wines</h6>
            </Row>
            <Row md={4} className="d-flex g-4 p-4">
              {wines.map(wine => (
                <Col>
                  <WineCard wine={wine} searchQuery={searchQuery} />
                </Col>
              ))}
            </Row>
          </>
        ),
      })}
    </Container>
  );
};
export default WineModel;
