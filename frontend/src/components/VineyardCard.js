import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

import { handleVineyardImageError } from '../util/handleImageError';
import { highlightText } from '../util/highlightText';

const VineyardCard = props => {
  const { id, name, country, price, rating, reviews, image } = props.vineyard;
  const { searchQuery } = props;

  return (
    <Container>
      <Card style={{ height: '30rem', width: '18rem' }}>
        <Card.Img
          variant="top"
          src={image}
          style={{ height: '50%', width: '100%', objectFit: 'cover' }}
          onError={handleVineyardImageError}
        />
        <Card.Body>
          <Card.Title> {highlightText(name, searchQuery)} </Card.Title>
          <Card.Subtitle> {country} </Card.Subtitle>
          <Card.Text>
            Price Level: {price}
            <br />
            Rating: {rating}
            <br />
            Review Count: {reviews}
          </Card.Text>
        </Card.Body>
        <div class="card-footer">
          <Link to={`/vineyards/${id}`} class="btn custom1 stretched-link">
            See Vineyard
          </Link>
        </div>
      </Card>
    </Container>
  );
};
export default VineyardCard;
