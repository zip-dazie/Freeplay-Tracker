import React, { useState, useEffect } from 'react';
import Reserve from '../Reserve/Reserve.js';
import CourtList from '../CourtList/CourtList.js';
import './FreePlay.css';

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

function FreePlay() {
  const [courtID, setCourtID] = useState(null);
  const [courts, setCourts] = useState(null);

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
    <div className="FreePlay">
      <div className="column times">
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

      {courtID && <Reserve courtID={courtID} closeReserve={() => setCourtID(null)} />}
    </div>
  );
}

export default FreePlay;
