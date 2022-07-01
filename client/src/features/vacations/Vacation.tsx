import React, { useState } from 'react'
import { Button, Card, Col, Placeholder } from 'react-bootstrap';
import { Vacations } from './vacations.interface';

function Vacation({ currentVacation }: { currentVacation: Vacations }) {
    const [isErr,setIsErr]=useState(false)
    return (
      <Col>
        <Card >
          <Card.Img
            variant="top"
            onError={(e) => setIsErr(true)}
            src={isErr?"holder.js/100px160":currentVacation.picture}
          />
          <Card.Body>
            <Card.Title>{currentVacation.destination}</Card.Title>
            <Card.Text>{currentVacation.description}</Card.Text>
           
          </Card.Body>
        </Card>
      </Col>
    );
}

export default Vacation