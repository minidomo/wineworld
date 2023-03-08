import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';

const VineyardCard = (props) => {
    const {
        id,
        name,
        country,
        price,
        rating,
        reviews,
        image,
        // latitude,
        // longitude,
        // wines,
        // regions,
        // url,
    } = props.vineyard
    
  return (
    <Card border="dark" style={{height:"30rem", width:"18rem"}}>
        <Card.Img variant ="top" src={image} style={{height:"50%", width:"100%", objectFit:"cover",}}/>
        <Card.Body>
            <Card.Title> {name} </Card.Title>
            <Card.Subtitle> {country} </Card.Subtitle>
            <Card.Text>
                    Price: {price}
                    <br />
                    Rating: {rating}
                    <br />
                    Review Count: {reviews}
            </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
            <Button
            className="btn btn-primary stretched-link"
            variant="secondary"
            href= {`/Vineyards/${id}`}              
            >
                See Vineyard
            </Button>
        </Card.Footer>
    </Card>
  )
}
export default VineyardCard
