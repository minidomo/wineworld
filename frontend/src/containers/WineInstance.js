import React from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';
import {get} from '../api-example/siteapi';
import Button from 'react-bootstrap/esm/Button'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';


const WineInstance = () => {
    let {id} = useParams();
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
        let mounted = true;
        // axios.get(`https://api.wineworld.me/wine/${id}`)
        get(`https://api.wineworld.me/wine/${id}`)
            .then(response => {
                if(mounted) {
                    setName(response.data['name']);
                    setCountry(response.data['country']);
                    setRegion(response.data['region']);
                    setType(response.data['type']);
                    setWinery(response.data['winery']);                    
                    setRating(response.data['rating']);
                    setReviews(response.data['reviews']);
                    setImage(response.data['image']);
                    setReddit(response.data['reddit_posts']);
                    setVineyards(response.data.related['vineayards']); // check
                    setRegions(response.data.related['regions']);//check
                }
            })
            .catch(errRes => {
                console.error(errRes);
            });
        return () => mounted = false;
    }, [])
       
  return (
    <div>
        <img src={image} class="img-fluid" alt="..."></img>
        <h3>{name}</h3>
        <h5 class ="text-muted">{type} Wine</h5>
        <Row>
            {/* <table class="table">
                <tbody>
                    <tr>
                        <th scope='row'>Country</th>
                        <td>{country}</td>
                    </tr>
                    <tr>
                        <th scope='row'>Region</th>
                        <td>{region}</td>
                    </tr>
                    <tr>
                        <th scope='row'>Winery</th>
                        <td>{winery}</td>
                    </tr>
                    <tr>
                        <th scope='row'>Rating</th>
                        <td>{rating}</td>
                    </tr>
                    <tr>
                        <th scope='row'>Reviews</th>
                        <td>{reviews}</td>
                    </tr>
                </tbody>
            </table> */}
            
            <div className='p-5'>
                <p align = "left">
                    Country: {country}
                    <br />
                    Region: {region}
                    <br />
                    Winery: {winery}
                    <br />
                    Rating: {rating}
                    <br />
                    Reviews: {reviews}
                </p>
            </div>
        </Row>
        <Row md = {10} className = "p-4 g-4 justify-content-center">
            <Col>
                {/* fix link */}
                <Button
                className="btn btn-primary stretched-link"
                variant="secondary"
                href={"/Vineyards"}>
                    Explore Vineyard
                </Button>
            </Col>
            <Col>
                {/* fix link */}
                <Button
                className="btn btn-primary stretched-link"
                variant="secondary"
                href={"/Regions"}>
                    Explore Region
                </Button>
            </Col>
        </Row>
    </div>
  )
}
export default WineInstance
