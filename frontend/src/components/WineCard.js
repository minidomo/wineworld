import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { handleWineImageError } from '../util/handleImageError';
import { Link } from 'react-router-dom';
import { highlightText } from '../util/highlightText';

const WineCard = props => {
    const { id, name, country, region, type, winery, rating, reviews, image } = props.wine;
    const { searchQuery } = props;

    return (
        <Container>
            {/* <Card border="dark" style={{ width: "80%", height: "50%" }}> */}
            <Card border="dark" style={{ height: '35rem', width: '18rem' }}>
                <Card.Img
                    class="img-thumbnail"
                    variant="top"
                    src={image}
                    style={{ height: '50%', width: '100%', objectFit: 'contain' }}
                    onError={handleWineImageError}
                />
                <Card.Body>
                    <Card.Title>
                        {' '}
                        <small> {highlightText(name, searchQuery)}  </small>{' '}
                    </Card.Title>
                    <Card.Subtitle> {type} Wine </Card.Subtitle>
                    <Card.Text>
                        Country: {country}
                        <br />
                        Region: {region}
                        <br />
                        Winery: {winery}
                        <br />
                        Rating: {rating}
                        <br />
                        Reviews: {reviews}
                    </Card.Text>
                </Card.Body>
                <div class="card-footer">
                    <Link to={`/wines/${id}`} class="btn btn-secondary stretched-link">
                        View Wine
                    </Link>
                </div>
            </Card>
        </Container>

    );
};
export default WineCard;
