import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const DeveloperCard = props => {
    const { name, bio, role, commits, issues, unit_tests, image } = props.devCard;

    return (
        <Card style={{ width: '18rem', height: '42rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{bio}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>{role}</ListGroup.Item>
                <ListGroup.Item> Commits: {commits}</ListGroup.Item>
                <ListGroup.Item> Issues: {issues}</ListGroup.Item>
                <ListGroup.Item> Unit Tests: {unit_tests}</ListGroup.Item>
            </ListGroup>
        </Card>
    );
};

export default DeveloperCard;
