import React, { useState } from 'react';
import whiteSingles from '../../assets/whiteSingles.png';
import whiteDoubles from '../../assets/whiteDoubles.png';
import greySingles from '../../assets/greySingles.png';
import greyDoubles from '../../assets/greyDoubles.png';
import './Reserve.css';
import { useParams } from 'react-router-dom';

function Reserve() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [doublesText, setDoublesText] = useState('selected-text');
  const [singlesText, setSinglesText] = useState('unselected-text');
  const [doublesBox, setDoublesBox] = useState('selected-box');
  const [singlesBox, setSinglesBox] = useState('unselected-box');
  const [event, setEvent] = useState('doubles');

  const { courtId } = useParams();

  const changeToDoubles = () => {
    setDoublesBox('selected-box');
    setSinglesBox('unselected-box');
    setDoublesText('selected-text');
    setSinglesText('unselected-text');
    setEvent('doubles');
  };

  const changeToSingles = () => {
    setDoublesBox('unselected-box');
    setSinglesBox('selected-box');
    setDoublesText('unselected-text');
    setSinglesText('selected-text');
    setEvent('singles');
  };

  return (
    <div className="Reserve">
      <form className="form">
        <div className="name-layer">
          <h2>{courtId}</h2>
          <button>Reserve &nbsp;&rarr;</button>
        </div>
        <div className="phone-layer">
          <div className="phone-input">
            <label className="label">What&apos;s your phone number?</label>
            <input
              type="text"
              value={phoneNumber}
              placeholder="e.g. 7463785928"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="event-layer">
          <label className="label">What event?</label>
          <div className="options">
            <div className={'option ' + doublesBox} onClick={changeToDoubles}>
              <p className={doublesText}>Doubles </p>
              <div className="images">
                <img src={event === 'doubles' ? whiteDoubles : greyDoubles} />
                <p className={doublesText}>vs.</p>
                <img src={event === 'doubles' ? whiteDoubles : greyDoubles} />
              </div>
              <p className={doublesText}>For four players on court</p>
            </div>
            <div className={'option ' + singlesBox} onClick={changeToSingles}>
              <p className={singlesText}>Singles</p>
              <div className="images">
                <img src={event === 'singles' ? whiteSingles : greySingles} />
                <p className={singlesText}>vs.</p>
                <img src={event === 'singles' ? whiteSingles : greySingles} />
              </div>
              <p className={singlesText}>For two players on court</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Reserve;
