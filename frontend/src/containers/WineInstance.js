import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { useParams } from 'react-router-dom';
import RedditCarousel from '../components/RedditCarousel';
import RegionCard from '../components/RegionCard';
import VineyardCard from '../components/VineyardCard';
import { handleWineImageError } from '../util/handleImageError';
import './WineInstance.css';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/esm/Container';

const WineInstance = () => {
    let { id } = useParams();
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
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let mounted = true;
        axios
            .get(`https://api.wineworld.me/wines/${id}`)
            .then(response => {
                if (mounted) {
                    setName(response.data.name);
                    setCountry(response.data.country);
                    setRegion(response.data.region);
                    setType(response.data.type);
                    setWinery(response.data.winery);
                    setRating(response.data.rating);
                    setReviews(response.data.reviews);
                    setImage(response.data.image);
                    setReddit(response.data.redditPosts);
                    setVineyards(response.data.related.vineyards);
                    setRegions(response.data.related.regions);
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
            { loaded ? (
                <div>
                <img src={image} class="img-fluid" alt="..." onError={handleWineImageError}></img>
                <br />
                <br />
                <h3>{name}</h3>
                <h5>{type} Wine</h5>
                <Row>
                    <span class="border-bottom border-secondary">
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
                    </span>
                </Row>
                <Row md={10} className="p-4 g-4">
                    <h5 align="left">Related Vineyards</h5>
                    {vineyards.map(vineyard => (
                        <Col>
                            <VineyardCard vineyard={vineyard} />
                        </Col>
                    ))}
                </Row>
                <Row md={10} className="p-4 g-4">
                    <Col>
                        <h5 align="left">Related Regions</h5>
                        {regions.map(region_data => (
                            <Col>
                                <RegionCard region={region_data} />
                            </Col>
                        ))}
                    </Col>
                </Row>
    
                <div id='learn-more-section' className='p-4 g-4'>
                    <h5>Learn more about {type} wine</h5>
                    <RedditCarousel redditUrls={reddit} />
                </div>
                </div>
                ) : (
                    <Spinner animation='border' role='status'></Spinner>
                )
            }
        </Container>
    );
};
export default WineInstance;
