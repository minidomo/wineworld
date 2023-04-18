import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';

import { wineworld } from '../api';
import Map from '../components/Map';
import RegionCard from '../components/RegionCard';
import WineCard from '../components/WineCard';
import { handleVineyardImageError } from '../util/handleImageError';

const VineyardInstance = () => {
  let { id } = useParams();

  const [loaded, setLoaded] = useState(false);

  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [image, setImage] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [wines, setWines] = useState([]);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    wineworld
      .get(`/vineyards/${id}`)
      .then(res => {
        setName(res.data.name);
        setCountry(res.data.country);
        setPrice(res.data.price);
        setRating(res.data.rating);
        setReviews(res.data.reviews);
        setImage(res.data.image);
        setLatitude(res.data.coordinates.latitude);
        setLongitude(res.data.coordinates.longitude);
        setWines(res.data.related.wines);
        setRegions(res.data.related.regions);
        setLoaded(true);
      })
      .catch(console.error);
  }, [id]);

  return (
    <Container>
      {loaded ? (
        <div>
          <br />
          <Container className="custom2">
            <br />
            <img
              src={image}
              style={{
                height: '20%',
                width: '20%',
                objectFit: 'contain',
                borderStyle: 'solid',
                borderWidth: '3px',
              }}
              onError={handleVineyardImageError}
              alt=""
            />
            <br />
            <br />
            <h3>{name}</h3>
            <h5>{country}</h5>
            <Row>
              <div className="p-5">
                <p align="center">
                  <h6>
                    Price Level: {price}
                    <br />
                    <br />
                    Rating: {rating}
                    <br />
                    <br />
                    Reviews: {reviews}
                  </h6>
                </p>
              </div>
            </Row>
          </Container>
          <br></br>
          <Row>
            <h5 align="left">Related Wines</h5>
          </Row>
          <Row md={4} className="p-4 g-4">
            {wines.map(wine => (
              <Col>
                <WineCard wine={wine} />
              </Col>
            ))}
          </Row>
          <Row>
            <h5 align="left">Related Regions</h5>
          </Row>
          <Row md={4} className="p-4 g-4">
            {regions.map(region => (
              <Col>
                <RegionCard region={region} />
              </Col>
            ))}
          </Row>
          <Row>
            <h5 align="left">Location</h5>
            <Map lat={latitude} lng={longitude} />
          </Row>
        </div>
      ) : (
        <Spinner animation="border" role="status"></Spinner>
      )}
    </Container>
  );
};
export default VineyardInstance;
