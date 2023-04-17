import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { useLocation } from 'react-router-dom';

import { wineworld } from '../api';
import RegionCard from '../components/RegionCard';


const RegionSearch = () => {
  const [regions, setRegions] = useState([]);
  const [regionLoaded, setRegionLoaded] = useState(false);

  const location = useLocation();
  const query = location.pathname.split('/search/').at(-1);
  const searchQuery = decodeURI(query);

  useEffect(() => {
    wineworld.get('/regions', {
      params: {
        search: searchQuery,
      },
    })
      .then(res => {
        setRegions(res.data.list);
        setRegionLoaded(true);
      })
      .catch(console.error);
  }, [searchQuery]);

  return (
    <Container>
      <h1> Region Search Results</h1>
      <p style={{ opacity: 0.65 }} hidden={regions.length > 0}>
        No regions seem to match your search
      </p>
      <Row md={4} className="d-flex g-4 p-4 justify-content-left">
        {regionLoaded ? (
          regions.map(region => (
            <Col>
              <RegionCard region={region} searchQuery={searchQuery} />
            </Col>
          ))
        ) : (
          <Spinner animation="border" role="status"></Spinner>
        )}
      </Row>
    </Container>
  );
};

export default RegionSearch;
