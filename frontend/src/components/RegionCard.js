import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ECHighlighter from 'react-ec-highlighter';
import { Link } from 'react-router-dom';
import { handleRegionImageError } from '../util/handleImageError';

const RegionCard = props => {
    const { id, name, country, rating, reviews, tripTypes, image } = props.region;

    function highlightText(input) {
        if (props.regex != null) {
          return <ECHighlighter searchPhrase={props.regex} text={input} />;
        }
        return input;
      }

    return (
        <Container>
        <Card border='dark' style={{ height: '30rem', width: '18rem' }}>
            <Card.Img
                variant='top'
                src={image.url}
                style={{ height: '50%', width: '100%', objectFit: 'cover' }}
                onError={handleRegionImageError}
            />
            <Card.Body>
                <Card.Title> {highlightText(name)} </Card.Title>
                <Card.Subtitle> {highlightText(country)} </Card.Subtitle>
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
                <div class='card-footer'>
                    <Link to={`/regions/${id}`} class='btn btn-secondary stretched-link'>
                        Explore Region
                    </Link>
                </div>
        </Card>
        </Container>
    );
};

export default RegionCard;
