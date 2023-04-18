import React, { useEffect, useState } from 'react';
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

const Search = () => {
  const [wines, setWines] = useState([]);
  const [wineTotalPages, setWineTotalPages] = useState(1);
  const [winePage, setWinePage] = useState(1);
  const [wineLoaded, setWineLoaded] = useState(false);

  const [vineyards, setVineyards] = useState([]);
  const [vineyardTotalPages, setVineyardTotalPages] = useState(1);
  const [vineyardPage, setVineyardPage] = useState(1);
  const [vineyardLoaded, setVineyardLoaded] = useState(false);

  const [regions, setRegions] = useState([]);
  const [regionTotalPages, setRegionTotalPages] = useState(1);
  const [regionPage, setRegionPage] = useState(1);
  const [regionLoaded, setRegionLoaded] = useState(false);

  const { query } = useParams();

  useEffect(() => {
    wineworld
      .get('/wines', {
        params: {
          page: winePage,
          search: query,
        },
      })
      .then(res => {
        setWines(res.data.list);
        setWineTotalPages(res.data.totalPages);
        setWineLoaded(true);
      })
      .catch(console.error);
  }, [query, winePage]);

  useEffect(() => {
    wineworld
      .get('/vineyards', {
        params: {
          page: vineyardPage,
          search: query,
        },
      })
      .then(res => {
        setVineyards(res.data.list);
        setVineyardTotalPages(res.data.totalPages);
        setVineyardLoaded(true);
      })
      .catch(console.error);
  }, [query, vineyardPage]);

  useEffect(() => {
    wineworld
      .get('/regions', {
        params: {
          page: regionPage,
          search: query,
        },
      })
      .then(res => {
        setRegions(res.data.list);
        setRegionTotalPages(res.data.totalPages);
        setRegionLoaded(true);
      })
      .catch(console.error);
  }, [query, regionPage]);

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
                  setPage={setWinePage}
                  getCurrentPage={() => winePage}
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
                  setPage={setVineyardPage}
                  getCurrentPage={() => vineyardPage}
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
                  setPage={setRegionPage}
                  getCurrentPage={() => regionPage}
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
