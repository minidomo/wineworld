import './Instance.css';

import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { useParams } from 'react-router-dom';

import { wineworld } from '../api';
import Map from '../components/Map';
import VineyardCard from '../components/VineyardCard';
import WineCard from '../components/WineCard';
import { handleRegionImageError } from '../util/handleImageError';
import { loading } from '../util/loadingAnimation';

const RegionInstance = () => {
  let { id } = useParams();

  const [loaded, setLoaded] = useState(false);

  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [tags, setTags] = useState([]);
  const [tripTypes, setTripTypes] = useState([]);
  const [image, setImage] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [wines, setWines] = useState([]);
  const [vineyards, setVineyards] = useState([]);

  useEffect(() => {
    wineworld
      .get(`/regions/${id}`)
      .then(res => {
        setName(res.data.name);
        setCountry(res.data.country);
        setRating(res.data.rating);
        setReviews(res.data.reviews);
        setTags(res.data.tags);
        setTripTypes(res.data.tripTypes);
        setImage(res.data.image.url);
        setLatitude(res.data.coordinates.latitude);
        setLongitude(res.data.coordinates.longitude);
        setWines(res.data.related.wines);
        setVineyards(res.data.related.vineyards);
        setLoaded(true);
      })
      .catch(console.error);
  }, [id]);

  return (
    <Container>
      {loading({
        loaded: loaded,
        element: (
          <div>
            <br />
            <Container className="custom2">
              <br />
              <img
                src={image}
                style={{
                  height: '10%',
                  width: '20%',
                  objectFit: 'contain',
                  borderStyle: 'solid',
                  borderWidth: '3px',
                }}
                onError={handleRegionImageError}
                alt=""
              />
              <br />
              <br />
              <h3>{name}</h3>
              <h5>{country}</h5>
              <Row>
                <div className="p-5">
                  <h6>
                    <p align="center">
                      Rating: {rating}
                      <br />
                      <br />
                      Reviews: {reviews}
                      <br />
                      <br />
                      Trip Type: {tripTypes.join(', ')}
                      <br />
                      <br />
                      Tags: {tags.join(', ')}
                    </p>
                  </h6>
                </div>
              </Row>
            </Container>
            <br />
            <div className="p-4 g-4 custom-section">
              <h5>Location</h5>
              <Map lat={latitude} lng={longitude} />
            </div>
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
              <h5 align="left">Related Vineyards</h5>
            </Row>
            <Row md={4} className="p-4 g-4">
              {vineyards.map(vineyard => (
                <Col>
                  <VineyardCard vineyard={vineyard} />
                </Col>
              ))}
            </Row>
          </div>
        ),
      })}
    </Container>
  );
};
export default RegionInstance;
