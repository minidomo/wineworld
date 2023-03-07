import React from "react";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/esm/Button";


const RegionCard = (props) => {
    const {
        id,
        name,
        country,
        rating,
        reviews,
        tags,
        tripTypes,
        image,
        // imageHeight,
        // imageWidth,
        // latitude,
        // longitude,
        // wines,
        // vineyards,
        url,
    } = props.region


    return (
        <Card border= 'dark' style={{ width: "80%", height: "50%" }}>
            <Card.Img variant ="top" src={image} style={{height:"50%", width:"100%", objectFit:"contain",}}/>
            <Card.Body>
                <Card.Title> <small> {name} </small>  </Card.Title>
                <Card.Subtitle> <small> {country} </small> </Card.Subtitle>
                <Card.Text>
                    <small>
                        Rating: {rating}
                        <br />
                        Review Count: {reviews}
                        <br />
                        Trip Type: {tripTypes.join(", ")}
                        <br />
                        Tags: {tags.join(", ")}
                    </small>
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <Button
                className="btn btn-primary stretched-link"
                variant="secondary"
                href={`regions/${id}`}                
                >
                    See More
                </Button>
            </Card.Footer>
        </Card>
    )
  }
 
  export default RegionCard
