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
        url,
    } = props.region


    return (
        <Card border= 'dark' style={{height:"30rem", width:"18rem"}}>
            <Card.Img variant ="top" src={image.url} style={{height:"50%", width:"100%", objectFit:"cover",}}/>
            <Card.Body>
                <Card.Title> {name} </Card.Title>
                <Card.Subtitle> {country} </Card.Subtitle>
                <Card.Text>
                    <small>
                        Rating: {rating}
                        <br />
                        Review Count: {reviews}
                        <br />
                        Trip Type: {tripTypes.join(", ")}
                        {/* <br />
                        Tags: {tags.join(", ")} */}
                    </small>
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <Button
                className="btn btn-primary stretched-link"
                variant="secondary"
                href={`Regions/${id}`}                
                >
                    Explore Region
                </Button>
            </Card.Footer>
        </Card>
    )
  }
 
  export default RegionCard
