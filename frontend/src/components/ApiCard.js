import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ApiCard = props => {
    console.log(props);
    const { name, image, text, url } = props.api;

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{text}</Card.Text>
                <a href={url}>
                    <Button variant="primary">Learn More</Button>
                </a>
            </Card.Body>
        </Card>
    );
};

export default ApiCard;
