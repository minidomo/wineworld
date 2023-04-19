import React, { useEffect, useRef, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useParams } from 'react-router-dom';

import { wineworld } from '../api';
import { CustomPagination } from '../components/models/CustomPagination';
import RegionCard from '../components/RegionCard';
import VineyardCard from '../components/VineyardCard';
import WineCard from '../components/WineCard';
import { loading } from '../util/loadingAnimation';
import { createTriggerFunction } from '../util/trigger';

const Search = () => {
  const [wines, setWines] = useState([]);
  const [wineTotalPages, setWineTotalPages] = useState(1);
  const [wineLoaded, setWineLoaded] = useState(false);

  const winePageRef = useRef(1);
  const [winePageTrigger, setWinePageTrigger] = useState(false);
  const setWinePageAndTrigger = createTriggerFunction(winePageRef, winePageTrigger, setWinePageTrigger);

  const [vineyards, setVineyards] = useState([]);
  const [vineyardTotalPages, setVineyardTotalPages] = useState(1);
  const [vineyardLoaded, setVineyardLoaded] = useState(false);

  const vineyardPageRef = useRef(1);
  const [vineyardPageTrigger, setVineyardPageTrigger] = useState(false);
  const setVineyardPageAndTrigger = createTriggerFunction(vineyardPageRef, vineyardPageTrigger, setVineyardPageTrigger);

  const [regions, setRegions] = useState([]);
  const [regionTotalPages, setRegionTotalPages] = useState(1);
  const [regionLoaded, setRegionLoaded] = useState(false);

  const regionPageRef = useRef(1);
  const [regionPageTrigger, setRegionPageTrigger] = useState(false);
  const setRegionPageAndTrigger = createTriggerFunction(regionPageRef, regionPageTrigger, setRegionPageTrigger);

  const { query } = useParams();

  function wineEndpoint(page) {
    wineworld
      .get('/wines', {
        params: {
          page: page,
          search: query,
        },
      })
      .then(res => {
        setWines(res.data.list);
        setWineTotalPages(res.data.totalPages);
        setWineLoaded(true);
      })
      .catch(console.error);
  }

  function vineyardEndpoint(page) {
    wineworld
      .get('/vineyards', {
        params: {
          page: page,
          search: query,
        },
      })
      .then(res => {
        setVineyards(res.data.list);
        setVineyardTotalPages(res.data.totalPages);
        setVineyardLoaded(true);
      })
      .catch(console.error);
  }

  function regionEndpoint(page) {
    wineworld
      .get('/regions', {
        params: {
          page: page,
          search: query,
        },
      })
      .then(res => {
        setRegions(res.data.list);
        setRegionTotalPages(res.data.totalPages);
        setRegionLoaded(true);
      })
      .catch(console.error);
  }

  useEffect(() => {
    winePageRef.current = 1;
    wineEndpoint(winePageRef.current);

    vineyardPageRef.current = 1;
    vineyardEndpoint(vineyardPageRef.current);

    regionPageRef.current = 1;
    regionEndpoint(regionPageRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    wineEndpoint(winePageRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winePageTrigger]);

  useEffect(() => {
    vineyardEndpoint(vineyardPageRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vineyardPageTrigger]);

  useEffect(() => {
    regionEndpoint(regionPageRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionPageTrigger]);

  return (
    <Container>
      <h1> Search Results</h1>
      <Tabs defaultActiveKey="wines">
        <Tab eventKey="wines" title="Wines">
          <h6 class="display-4">Wine Results</h6>
          {loading({
            loaded: wineLoaded,
            element: (
              <>
                <CustomPagination
                  firstPage={1}
                  lastPage={wineTotalPages}
                  setPage={setWinePageAndTrigger}
                  getCurrentPage={() => winePageRef.current}
                  maxVisiblePages={5}
                />
                <p style={{ opacity: 0.65 }} hidden={wines.length > 0}>
                  No wines seem to match your search
                </p>
                <Row md={4} className="d-flex g-4 p-4 justify-content-left">
                  {wines.map(wine => (
                    <Col>
                      <WineCard wine={wine} searchQuery={query} />
                    </Col>
                  ))}
                </Row>
              </>
            ),
          })}
        </Tab>
        <Tab eventKey="vineyards" title="Vineyards">
          <h6 class="display-4">Vineyard Results</h6>
          {loading({
            loaded: vineyardLoaded,
            element: (
              <>
                <CustomPagination
                  firstPage={1}
                  lastPage={vineyardTotalPages}
                  setPage={setVineyardPageAndTrigger}
                  getCurrentPage={() => vineyardPageRef.current}
                  maxVisiblePages={5}
                />
                <p style={{ opacity: 0.65 }} hidden={vineyards.length > 0}>
                  No vineyards seem to match your search
                </p>
                <Row md={4} className="d-flex g-4 p-4 justify-content-left">
                  {vineyards.map(vineyard => (
                    <Col>
                      <VineyardCard vineyard={vineyard} searchQuery={query} />
                    </Col>
                  ))}
                </Row>
              </>
            ),
          })}
        </Tab>
        <Tab eventKey="regions" title="Regions">
          <h6 class="display-4">Region Results</h6>
          {loading({
            loaded: regionLoaded,
            element: (
              <>
                <CustomPagination
                  firstPage={1}
                  lastPage={regionTotalPages}
                  setPage={setRegionPageAndTrigger}
                  getCurrentPage={() => regionPageRef.current}
                  maxVisiblePages={5}
                />
                <p style={{ opacity: 0.65 }} hidden={regions.length > 0}>
                  No regions seem to match your search
                </p>
                <Row md={4} className="d-flex g-4 p-4 justify-content-left">
                  {regions.map(region => (
                    <Col>
                      <RegionCard region={region} searchQuery={query} />
                    </Col>
                  ))}
                </Row>
              </>
            ),
          })}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Search;
