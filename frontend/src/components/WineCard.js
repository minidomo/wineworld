import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

import { handleWineImageError } from '../util/handleImageError';
import { highlightText } from '../util/highlightText';

const WineCard = props => {
  const { id, name, country, region, type, winery, rating, reviews, image } = props.wine;
  const { searchQuery } = props;

  return (
    <Container>
      <Card style={{ height: '35rem' }}>
        <Card.Img
          class="img-thumbnail"
          variant="top"
          src={image}
          style={{ height: '40%', width: '100%', objectFit: 'contain' }}
          onError={handleWineImageError}
        />
        <Card.Body>
          <Card.Title>
            {' '}
            <small> {highlightText(name, searchQuery)} </small>{' '}
          </Card.Title>
          <Card.Subtitle> {highlightText(type, searchQuery)} Wine </Card.Subtitle>
          <Card.Text>
            Country: {highlightText(country, searchQuery)}
            <br />
            Region: {highlightText(region, searchQuery)}
            <br />
            Winery: {highlightText(winery, searchQuery)}
            <br />
            Rating: {rating}
            <br />
            Reviews: {reviews}
          </Card.Text>
        </Card.Body>
        <div class="card-footer">
          <Link to={`/wines/${id}`} class="btn custom1 stretched-link btn-sm">
            View Wine
          </Link>
        </div>
      </Card>
    </Container>
  );
};
export default WineCard;
