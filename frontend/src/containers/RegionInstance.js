import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { useParams } from 'react-router-dom';
import Map from '../components/Map';
import VineyardCard from '../components/VineyardCard';
import WineCard from '../components/WineCard';
import Spinner from 'react-bootstrap/Spinner';
import { handleRegionImageError } from '../util/handleImageError';
import Container from 'react-bootstrap/esm/Container';

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
                    <img src={image} class="img-fluid" alt="..." onError={handleRegionImageError}></img>
                    <br />
                    <br />
                    <h3>{name}</h3>
                    <h5>{country}</h5>
                    <Row>
                        <span class="border-bottom border-secondary">
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
                        </span>
                    </Row>
                    <Row className='p-5'>
                        <h5 align="left">Location</h5>
                        <Map lat={latitude} lng={longitude} />
                    </Row>
                    <Row md={10} className="p-4 g-4">
                        <h5 align="left">Related Wines</h5>
                        {wines.map(wine => (
                            <Col>
                                <WineCard wine={wine} />
                            </Col>
                        ))}
                    </Row>
                    <Row md={10} className="p-4 g-4">
                        <h5 align="left">Related Vineyards</h5>
                        {vineyards.map(vineyard => (
                            <Col>
                                <VineyardCard vineyard={vineyard} />
                            </Col>
                        ))}
                    </Row>
                </div>
            ) : (
                <Spinner animation='border' role='status'></Spinner>
            )
            }
        </Container>

    );
};
export default RegionInstance;
