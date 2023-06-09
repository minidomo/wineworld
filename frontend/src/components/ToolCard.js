import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const ToolCard = props => {
  const { name, image, text, url } = props.tool;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} style={{ height: '55%', width: '100%', objectFit: 'contain' }} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Link to={url} class={'btn stretched-link'}></Link>
      </Card.Body>
    </Card>
  );
};

export default ToolCard;
