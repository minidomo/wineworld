import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useParams } from 'react-router-dom';

import { wineworld } from '../api';
import RegionCard from '../components/RegionCard';
import VineyardCard from '../components/VineyardCard';
import WineCard from '../components/WineCard';

const Search = () => {
  const [wines, setWines] = useState([]);
  const [wineLoaded, setWineLoaded] = useState(false);

  const [vineyards, setVineyards] = useState([]);
  const [vineyardLoaded, setVineyardLoaded] = useState(false);

  const [regions, setRegions] = useState([]);
  const [regionLoaded, setRegionLoaded] = useState(false);

  const { query } = useParams();

  useEffect(() => {
    wineworld
      .get('/wines', {
        params: {
          search: query,
        },
      })
      .then(res => {
        setWines(res.data.list);
        setWineLoaded(true);
      })
      .catch(console.error);

    wineworld
      .get('/vineyards', {
        params: {
          search: query,
        },
      })
      .then(res => {
        setVineyards(res.data.list);
        setVineyardLoaded(true);
      })
      .catch(console.error);

    wineworld
      .get('/regions', {
        params: {
          search: query,
        },
      })
      .then(res => {
        setRegions(res.data.list);
        setRegionLoaded(true);
      })
      .catch(console.error);
  }, [query]);

  return (
    <Container>
      <h1> Search Results</h1>
      <Tabs defaultActiveKey="wines">
        <Tab eventKey="wines" title="Wines">
          <h6 class="display-4">Wine Results</h6>
          <p style={{ opacity: 0.65 }} hidden={wines.length > 0}>
            No wines seem to match your search
          </p>
          <Row md={4} className="d-flex g-4 p-4 justify-content-left">
            {wineLoaded ? (
              wines.map(wine => (
                <Col>
                  <WineCard wine={wine} searchQuery={query} />
                </Col>
              ))
            ) : (
              <Spinner animation="border" role="status"></Spinner>
            )}
          </Row>
        </Tab>
        <Tab eventKey="vineyards" title="Vineyards">
          <h6 class="display-4">Vineyard Results</h6>
          <p style={{ opacity: 0.65 }} hidden={vineyards.length > 0}>
            No vineyards seem to match your search
          </p>
          <Row md={4} className="d-flex g-4 p-4 justify-content-left">
            {vineyardLoaded ? (
              vineyards.map(vineyard => (
                <Col>
                  <VineyardCard vineyard={vineyard} searchQuery={query} />
                </Col>
              ))
            ) : (
              <Spinner animation="border" role="status"></Spinner>
            )}
          </Row>
        </Tab>
        <Tab eventKey="regions" title="Regions">
          <h6 class="display-4">Region Results</h6>
          <p style={{ opacity: 0.65 }} hidden={regions.length > 0}>
            No regions seem to match your search
          </p>
          <Row md={4} className="d-flex g-4 p-4 justify-content-left">
            {regionLoaded ? (
              regions.map(region => (
                <Col>
                  <RegionCard region={region} searchQuery={query} />
                </Col>
              ))
            ) : (
              <Spinner animation="border" role="status"></Spinner>
            )}
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Search;
