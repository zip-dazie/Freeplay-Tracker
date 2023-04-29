import React, { useState, useEffect } from 'react';
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
let time = [
  '6:00 pm - 6:15 pm',
  '6:15 pm - 6:30 pm',
  '6:30 pm - 6:45 pm',
  '6:45 pm - 7:00 pm',
  '7:00 pm - 7:15 pm',
  '7:15 pm - 7:30 pm',
  '7:30 pm - 7:45 pm',
  '7:45 pm - 8:00 pm',
  '8:00 pm - 8:15 pm',
  '8:15 pm - 8:30 pm',
  '8:30 pm - 8:45 pm',
  '8:45 pm - 9:00 pm'
];

// eslint-disable-next-line no-unused-vars
function FreePlay() {
  // eslint-disable-next-line no-unused-vars
  const [courtID, setCourtID] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [courts, setCourts] = useState(null);
  // eslint-disable-next-line no-unused-vars

  useEffect(() => {
    if (courtID) return;
    async function fetchData() {
      const response = await fetch('http://localhost:8000/courts');
      const data = await response.json();
      setCourts(data);
    }
    fetchData();
  }, [courtID]);
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
    /*
            <div className="FreePlay">
                <div className="times">
                    <p className="label">Time</p>
                    <div className="time-slots">
                        {time.map((i) => {
                            return <p key={i}>{i}</p>;
                        })}
                    </div>
                </div>
                {courts && <CourtList courts={courts.slice(0, 12)} title="Court 1" setCourtID={setCourtID} />}
                {courts && (
                    <CourtList courts={courts.slice(12, 24)} title="Court 2" setCourtID={setCourtID} />
                )}
                {courts && (
                    <CourtList courts={courts.slice(24, 36)} title="Court 3" setCourtID={setCourtID} />
                )}
            </div>
            */
  );

  /*

    */
}
export default FreePlay;
