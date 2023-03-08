import React from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col'
import WineCard from '../components/WineCard';
import VineyardCard from '../components/VineyardCard';
import Map from '../components/Map';

const RegionInstance = () => {
    let {id} = useParams();
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState(0);
    const [tags, setTags] = useState([]);
    const [tripTypes, setTripTypes] = useState([]);
    const [image, setImage] = useState('');
    const [imageHeight, setImageHeight] = useState(0);
    const [imageWidth, setImageWidth] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [wines, setWines] = useState([]);
    const [vineyards, setVineyards] = useState([]);
    const [url, setUrl] = useState('');


    useEffect(() => {
    let mounted = true;
    axios.get(`https://api.wineworld.me/regions/${id}`)
        .then(response => {
        if(mounted) {
            setName(response.data['name']);
            setCountry(response.data['country']);
            setRating(response.data['rating']);
            setReviews(response.data['reviews']);
            setTags(response.data['tags']);
            setTripTypes(response.data['tripTypes']);
            setImage(response.data.image['url']);
            setImageHeight(response.data.image['height']);
            setImageWidth(response.data.image['width']);
            setLatitude(response.data.coordinates['latitude']);
            setLongitude(response.data.coordinates['longitude']);
            setWines(response.data.related['wines']);
            setVineyards(response.data.related['vineyards']);
            setUrl(response.data['url']);
        }
        })
        .catch(errRes => {
        console.error(errRes);
        })
    return () => mounted = false;
    }, [])

    return (
    <div>
        <img src={image} class="img-fluid" alt="..."></img>
        <h3>{name}</h3>
        <h6>{country}</h6>
        <Row>
        <div className='p-5'>
            <p align ="left">
            Rating: {rating}
            <br />
            Reviews: {reviews}
            <br />
            Trip Type: {tripTypes.join(", ")}
            <br />
            Tags: {tags.join(", ")}
            </p>
        </div>
        </Row>
        <Row md = {10} className = "p-4 g-4">
            <h5 align="left">Related Wines</h5>
            {
                wines.map((wine) => {
                    return (
                        <Col>
                            <WineCard wine = {wine} />
                        </Col>
                        
                    )
                })
            }
        </Row>
        <Row md = {10} className = "p-4 g-4">
            <h5 align="left">Related Vineyards</h5>
            {
                vineyards.map((vineyard) => {
                    return (
                        <Col>
                            <VineyardCard vineyard = {vineyard} />
                        </Col>
                        
                    )
                })
            }
        </Row>
        <Row>
            <Map
            lat = {latitude}
            lng = {longitude}
            />
        </Row>

    </div>
    )
}
export default RegionInstance
