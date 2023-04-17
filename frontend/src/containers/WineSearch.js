import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { useLocation } from 'react-router-dom';

import { wineworld } from '../api';
import WineCard from '../components/WineCard';

const WineSearch = () => {
  const [wines, setWines] = useState([]);
  const [wineLoaded, setWineLoaded] = useState(false);

  const location = useLocation();
  const query = location.pathname.split('/search/').at(-1);
  const searchQuery = decodeURI(query);

  useEffect(() => {
    wineworld
      .get('/wines', {
        params: {
          search: searchQuery,
        },
      })
      .then(res => {
        setWines(res.data.list);
        setWineLoaded(true);
      })
      .catch(console.error);
  }, [searchQuery]);

  return (
    <Container>
      <h1> Wine Search Results</h1>
      <p style={{ opacity: 0.65 }} hidden={wines.length > 0}>
        No wines seem to match your search
      </p>
      <Row md={4} className="d-flex g-4 p-4 justify-content-left">
        {wineLoaded ? (
          wines.map(wine => (
            <Col>
              <WineCard wine={wine} searchQuery={searchQuery} />
            </Col>
          ))
        ) : (
          <Spinner animation="border" role="status"></Spinner>
        )}
      </Row>
    </Container>
  );
};

export default WineSearch;
