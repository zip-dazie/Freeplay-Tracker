import React, { useEffect } from 'react';
import CourtQueue from '../CourtQueue/CourtQueue.js';
// eslint-disable-next-line no-unused-vars
import AliceCarousel from 'react-alice-carousel';
// eslint-disable-next-line no-unused-vars
import CourtList from '../CourtList/CourtList.js';
import './FreePlay.css';
// eslint-disable-next-line no-unused-vars
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

// eslint-disable-next-line no-unused-vars
function FreePlay() {
  useEffect(() => {
    // fetch data when the page is loaded
  });
  return (
    <div>
      <CardGroup style={{ marginBottom: '0.5vh' }}>
        <Card className="court">
          <Card.Body>
            <Card.Title className="court-title">Court 1</Card.Title>
            <CourtQueue id={'Court 1'} title="Court 1"></CourtQueue>
          </Card.Body>
        </Card>
        <Card className="court">
          <Card.Body>
            <Card.Title className="court-title">Court 2</Card.Title>
            <CourtQueue id={'Court 2'} title="Court 2"></CourtQueue>
          </Card.Body>
        </Card>
        <Card className="court">
          <Card.Body>
            <Card.Title className="court-title">Court 3</Card.Title>
            <CourtQueue id={'Court 3'} title="Court 3"></CourtQueue>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
}
export default FreePlay;
