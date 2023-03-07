import React from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {get} from '../api-example/siteapi';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col'
import Button from 'react-bootstrap/esm/Button'


const RegionInstance = () => {
    let {id} = useParams
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
    // axios.get(`https://api.wineworld.me/region/${id}`)
    get(`https://api.wineworld.me/region/${id}`)
        .then(response => {
        if(mounted) {
            setName(response.data['name']);
            setCountry(response.data['country']);
            setRating(response.data['rating']);
            setReviews(response.data['reviews']);
            setTags(response.data['tags']);
            setTripTypes(response.data['tripTypes']);
            setImage(response.data.image['url']); //check
            setImageHeight(response.data.image['height']); //check
            setImageWidth(response.data.image['width']); //check
            setLatitude(response.data.coordinates['latitude']); //check
            setLongitude(response.data.coordinates['longitude']); //check
            setWines(response.data.related['wines']); //check
            setVineyards(response.data.related['vineayards']); //check
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
            Trip Type: {tripTypes}
            <br />
            Tags: {tags}
            </p>
        </div>
        </Row>
        <Row md ={10} className="p-4 g-4 justify-content-center">
        <Col>
            {/* fix link */}
            <Button
            className="btn btn-primary stretched-link"
            variant="secondary"
            href={"/Wines"}>
            Explore Wine
            </Button>
        </Col>
        <Col>
            {/* fix link */}
            <Button
            className="btn btn-primary stretched-link"
            variant="secondary"
            href={"/Vineyards"}>
            Explore Vineyard
            </Button>
        </Col>
        </Row>
    </div>
    )
}
export default RegionInstance
