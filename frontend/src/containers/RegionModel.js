import './Cards.css';

import React, { useEffect, useRef, useState } from 'react';
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
import RegionCard from '../components/RegionCard';
import { loading } from '../util/loadingAnimation';
import { createTriggerFunction } from '../util/trigger';

const RegionModel = () => {
  const [sortName, setSortName] = useState('Sort By: Name (A-Z)');
  const [loaded, setLoaded] = useState(false);

  // data from main api call
  const [regions, setRegions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalInstances, setTotalInstances] = useState(1);

  // constraints
  const [tagConstraints, setTagConstraints] = useState([]);
  const [countryConstraints, setCountryConstraints] = useState([]);
  const [tripTypeConstraints, setTripTypeConstraints] = useState([]);
  const [sortConstraints, setSortConstraints] = useState([]);
  const [ratingConstraints, setRatingConstraints] = useState({});
  const [reviewConstraints, setReviewConstraints] = useState({});

  // params
  const [startReviews, setStartReviews] = useState();
  const [endReviews, setEndReviews] = useState();
  const [startRating, setStartRating] = useState();
  const [endRating, setEndRating] = useState();
  const [country, setCountry] = useState([]);
  const [tripTypes, setTripTypes] = useState([]);
  const [tags, setTags] = useState([]);
  const [sort, setSort] = useState('name_asc');
  const [searchQuery, setSearchQuery] = useState();

  const pageRef = useRef(1);
  const [pageTrigger, setPageTrigger] = useState(false);
  const setPageAndTrigger = createTriggerFunction(pageRef, pageTrigger, setPageTrigger);

  function mainEndpoint(page) {
    wineworld
      .get('/regions', {
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
          search: searchQuery,
        },
      })
      .then(res => {
        setRegions(res.data.list);
        setTotalPages(res.data.totalPages);
        setTotalInstances(res.data.totalInstances);
        setLoaded(true);
      })
      .catch(console.error);
  }

  useEffect(() => {
    wineworld
      .get('/regions/constraints')
      .then(res => {
        setCountryConstraints(res.data.countries);
        setTagConstraints(res.data.tags);
        setTripTypeConstraints(res.data.tripTypes);
        setSortConstraints(res.data.sorts);
        setRatingConstraints(res.data.rating);
        setReviewConstraints(res.data.reviews);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    mainEndpoint(pageRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageTrigger]);

  useEffect(() => {
    pageRef.current = 1;
    mainEndpoint(pageRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, startReviews, endReviews, startRating, endRating, tripTypes, tags, sort, searchQuery]);

  return (
    <Container>
      <h1 class="display-4">Regions</h1>
      <Row>
        <Col>
          <DropdownButton variant="secondary" size="sm" menuVariant="dark" title="Filter" className="mt-2">
            <div class="container">
              <Row className="g-1" style={{ flexWrap: 'nowrap' }}>
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
                <Col>
                  <Dropdown>
                    <div class="d-grid">
                      <Dropdown.Toggle variant="secondary" size="sm">
                        Tags
                      </Dropdown.Toggle>
                    </div>
                    <Dropdown.Menu variant="dark" className="custom">
                      {tagConstraints.map(e => (
                        <FilterCheckboxDropdownItem value={e} filters={tags} setFilters={setTags} />
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  <Dropdown>
                    <div class="d-grid">
                      <Dropdown.Toggle variant="secondary" size="sm">
                        Trip Type
                      </Dropdown.Toggle>
                    </div>
                    <Dropdown.Menu variant="dark" className="custom">
                      {tripTypeConstraints.map(e => (
                        <FilterCheckboxDropdownItem value={e} filters={tripTypes} setFilters={setTripTypes} />
                      ))}
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
          <SearchBar placeholder="Search regions" setValue={setSearchQuery} valueIfEmpty={undefined} />
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
              setPage={setPageAndTrigger}
              getCurrentPage={() => pageRef.current}
              maxVisiblePages={5}
            />
            <Row>
              <h6>Found {totalInstances} regions</h6>
            </Row>
            <Row md={4} className="g-4 p-4">
              {regions.map(region => (
                <Col>
                  <RegionCard region={region} searchQuery={searchQuery} />
                </Col>
              ))}
            </Row>
          </>
        ),
      })}
    </Container>
  );
};
export default RegionModel;
