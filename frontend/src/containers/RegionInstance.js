import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
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
    // Const [imageHeight, setImageHeight] = useState(0);
    // const [imageWidth, setImageWidth] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [wines, setWines] = useState([]);
    const [vineyards, setVineyards] = useState([]);
    // Const [url, setUrl] = useState('');

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
                    // SetImageHeight(response.data.image['height']);
                    // setImageWidth(response.data.image['width']);
                    setLatitude(response.data.coordinates.latitude);
                    setLongitude(response.data.coordinates.longitude);
                    setWines(response.data.related.wines);
                    setVineyards(response.data.related.vineyards);
                    // SetUrl(response.data['url']);
                }
            })
            .catch(errRes => {
                console.error(errRes);
            });
        return () => (mounted = false);
    }, [id]);

    return (
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
            <Row>
                <Map lat={latitude} lng={longitude} />
            </Row>
        </div>
    );
};
export default RegionInstance;
