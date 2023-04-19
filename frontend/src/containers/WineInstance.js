import './WineInstance.css';

import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { useParams } from 'react-router-dom';

import { wineworld } from '../api';
import RedditCarousel from '../components/RedditCarousel';
import RegionCard from '../components/RegionCard';
import VineyardCard from '../components/VineyardCard';
import { handleWineImageError } from '../util/handleImageError';
import { loading } from '../util/loadingAnimation';

const WineInstance = () => {
  let { id } = useParams();

  const [loaded, setLoaded] = useState(false);

  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [type, setType] = useState('');
  const [winery, setWinery] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [image, setImage] = useState('');
  const [reddit, setReddit] = useState([]);
  const [vineyards, setVineyards] = useState([]);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    wineworld
      .get(`/wines/${id}`)
      .then(res => {
        setName(res.data.name);
        setCountry(res.data.country);
        setRegion(res.data.region);
        setType(res.data.type);
        setWinery(res.data.winery);
        setRating(res.data.rating);
        setReviews(res.data.reviews);
        setImage(res.data.image);
        setReddit(res.data.redditPosts);
        setVineyards(res.data.related.vineyards);
        setRegions(res.data.related.regions);
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
                style={{ height: '12%', width: '6%', objectFit: 'contain' }}
                onError={handleWineImageError}
                alt=""
              />
              <br />
              <br />
              <h3>{name}</h3>
              <h5>{type} Wine</h5>
              <Row>
                <div className="p-5">
                  <p align="center">
                    <h6>
                      Country: {country}
                      <br />
                      <br />
                      Region: {region}
                      <br />
                      <br />
                      Winery: {winery}
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
            <br />
            <div id="learn-more-section" className="p-4 g-4">
              <h5>Learn more about {type} wine</h5>
              <br />
              <RedditCarousel redditUrls={reddit} />
            </div>
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
            <Row>
              <h5 align="left">Related Regions</h5>
            </Row>
            <Row md={4} className="p-4 g-4">
              <Col>
                {regions.map(region_data => (
                  <Col>
                    <RegionCard region={region_data} />
                  </Col>
                ))}
              </Col>
            </Row>
          </div>
        ),
      })}
    </Container>
  );
};
export default WineInstance;
