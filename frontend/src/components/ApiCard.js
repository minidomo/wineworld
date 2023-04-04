import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


const ApiCard = props => {
  const { name, image, text, url } = props.api;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Link to={url} class={'btn stretched-link'}>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ApiCard;
