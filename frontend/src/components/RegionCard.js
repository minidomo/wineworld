import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

import { handleRegionImageError } from '../util/handleImageError';
import { highlightText } from '../util/highlightText';

const RegionCard = props => {
  const { id, name, country, rating, reviews, tripTypes, image } = props.region;
  const { searchQuery } = props;

  return (
    <Container>
      <Card style={{ height: '30rem' }}>
        <Card.Img
          variant="top"
          src={image.url}
          style={{ height: '40%', width: '100%', objectFit: 'cover' }}
          onError={handleRegionImageError}
        />
        <Card.Body>
          <Card.Title> {highlightText(name, searchQuery)} </Card.Title>
          <Card.Subtitle> {country} </Card.Subtitle>
          <Card.Text>
            <small>
              Rating: {rating}
              <br />
              Review Count: {reviews}
              <br />
              Trip Type: {tripTypes.join(', ')}
            </small>
          </Card.Text>
        </Card.Body>
        <div class="card-footer">
          <Link to={`/regions/${id}`} class="btn custom1 stretched-link btn-sm">
            Explore Region
          </Link>
        </div>
      </Card>
    </Container>
  );
};

export default RegionCard;
