import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';

import Map from '../components/Map';
import VineyardCard from '../components/VineyardCard';
import WineCard from '../components/WineCard';
import { handleRegionImageError } from '../util/handleImageError';

const RegionInstance = () => {
  let { id } = useParams();
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
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    axios
      .get(`https://api.wineworld.me/regions/${id}`)
      .then(response => {
        if (mounted) {
          setName(response.data.name);
          setCountry(response.data.country);
          setRating(response.data.rating);
          setReviews(response.data.reviews);
          setTags(response.data.tags);
          setTripTypes(response.data.tripTypes);
          setImage(response.data.image.url);
          setLatitude(response.data.coordinates.latitude);
          setLongitude(response.data.coordinates.longitude);
          setWines(response.data.related.wines);
          setVineyards(response.data.related.vineyards);
          setLoaded(true);
        }
      })
      .catch(errRes => {
        console.error(errRes);
      });
    return () => (mounted = false);
  }, [id]);

  return (
    <Container>
      {loaded ? (
        <div>
          <br />
          <Container className="custom2">
            <br />
            <img src={image} style={{
              height: '10%', width: '20%', objectFit: 'contain',
              borderStyle: 'solid', borderWidth: '3px',
            }}
              onError={handleRegionImageError}></img>
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
          <br></br>
          <Row className="p-5">
            <h5 align="left">Location</h5>
            <Map lat={latitude} lng={longitude} />
          </Row>
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
      ) : (
        <Spinner animation="border" role="status"></Spinner>
      )}
    </Container>
  );
};
export default RegionInstance;
