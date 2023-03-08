import React from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col'
import Button from 'react-bootstrap/esm/Button'
import WineCard from '../components/WineCard';
import RegionCard from '../components/RegionCard';


const VineyardInstance = () => {
    let {id} = useParams();
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
    const [url, setUrl] = useState('');


    useEffect(() => {
    let mounted = true;
    axios.get(`https://api.wineworld.me/vineyards/${id}`)
        .then(response => {
        if (mounted) {
            setName(response.data['name']);
            setCountry(response.data['country']);
            setPrice(response.data['price']);
            setRating(response.data['rating']);
            setReviews(response.data['reviews']);
            setImage(response.data['image']);
            setLatitude(response.data.coordinates['latitude']); //check
            setLongitude(response.data.coordinates['longitude']); //check
            setUrl(response.data['url']);
            setWines(response.data.related['wines']); //check
            setRegions(response.data.related['regions']); //check
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
            <p align = 'left'>
            Price: {price}
            <br />
            Rating: {rating}
            <br />
            Reviews: {reviews}
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
            <h5 align="left">Related Regions</h5>
            {
                regions.map((region) => {
                    return (
                        <Col>
                            <RegionCard region = {region} />
                        </Col>
                        
                    )
                })
            }
        </Row>
    </div>
    )
}
export default VineyardInstance
