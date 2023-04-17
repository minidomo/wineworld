import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { useLocation } from 'react-router-dom';

import { wineworld } from '../api';
import VineyardCard from '../components/VineyardCard';

const VineyardSearch = () => {
  const [vineyards, setVineyards] = useState([]);
  const [vineyardLoaded, setVineyardLoaded] = useState(false);

  const location = useLocation();
  const query = location.pathname.split('/search/').at(-1);
  const searchQuery = decodeURI(query);

  useEffect(() => {
    wineworld
      .get('/vineyards', {
        params: {
          search: searchQuery,
        },
      })
      .then(res => {
        setVineyards(res.data.list);
        setVineyardLoaded(true);
      })
      .catch(console.error);
  }, [searchQuery]);

  return (
    <Container>
      <h1> Vineyard Search Results</h1>
      <p style={{ opacity: 0.65 }} hidden={vineyards.length > 0}>
        No vineyards seem to match your search
      </p>
      <Row md={4} className="d-flex g-4 p-4 justify-content-left">
        {vineyardLoaded ? (
          vineyards.map(vineyard => (
            <Col>
              <VineyardCard vineyard={vineyard} searchQuery={searchQuery} />
            </Col>
          ))
        ) : (
          <Spinner animation="border" role="status"></Spinner>
        )}
      </Row>
    </Container>
  );
};

export default VineyardSearch;
