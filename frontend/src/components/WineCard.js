import React from "react";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";


const WineCard = (props) => {
    const {
        id,
        name,
        country,
        region,
        type,
        winery,
        rating,
        reviews,
        image,
        // reddit,
        // vineyards,
        // regions,
    } = props.wine

    return (
        // <Card border="dark" style={{ width: "80%", height: "50%" }}>
        <Card border="dark" style={{height:"35rem", width:"18rem"}}>
            {/* <Card.Img class="rounded mx-auto d-block" variant="top" style={{width: 50}} src={image} /> */}
            <Card.Img class="img-thumbnail" variant ="top" src={image} style={{height:"50%", width:"100%", objectFit:"contain",}}/>
            <Card.Body>
                <Card.Title> <small> {name} </small> </Card.Title>
                <Card.Subtitle> {type} Wine </Card.Subtitle>
                <Card.Text>
                        Country: {country}
                        <br />
                        Region: {region}
                        <br />
                        Winery: {winery}
                        <br />
                        Rating: {rating}
                        <br />
                        Reviews: {reviews}
                        
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button
                className="btn btn-primary stretched-link"
                variant="secondary"
                href= {`/Wines/${id}`}              
                >
                    View Wine
                </Button>
            </Card.Footer>
        </Card>
  )
}
export default WineCard
