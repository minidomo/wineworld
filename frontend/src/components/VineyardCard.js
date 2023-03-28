import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ECHighlighter from "react-ec-highlighter";
import { Link } from 'react-router-dom';
import { handleVineyardImageError } from '../util/handleImageError';


const VineyardCard = props => {
    const { id, name, country, price, rating, reviews, image } = props.vineyard;

    function highlightText(input) {
        if (props.regex != null) {
          return <ECHighlighter searchPhrase={props.regex} text={input} />;
        }
        return input;
      }

    return (
        <Container>
            <Card border="dark" style={{ height: '30rem', width: '18rem' }}>
                <Card.Img
                    variant="top"
                    src={image}
                    style={{ height: '50%', width: '100%', objectFit: 'cover' }}
                    onError={handleVineyardImageError}
                />
                <Card.Body>
                    <Card.Title> {highlightText(name)} </Card.Title>
                    <Card.Subtitle> {highlightText(country)} </Card.Subtitle>
                    <Card.Text>
                        Price Level: {price}
                        <br />
                        Rating: {rating}
                        <br />
                        Review Count: {reviews}
                    </Card.Text>
                </Card.Body>
                <div class="card-footer">
                    <Link to={`/vineyards/${id}`} class="btn btn-secondary stretched-link">
                        See Vineyard
                    </Link>
                </div>
            </Card>
        </Container>

    );
};
export default VineyardCard;
