import './CourtCall.css';
import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import court1 from '../../assets/court_1.mp3';
import court2 from '../../assets/court_2.mp3';
import court3 from '../../assets/court_3.mp3';
import ding from '../../assets/iphone_ding.mp3';
import finished from '../../assets/game_finished.mp3';
import PropTypes from 'prop-types';
import { BsFillVolumeOffFill, BsWifi1, BsX } from 'react-icons/bs';
const CourtCall = forwardRef(({ toCall }, ref) => {
  const calls = {
    'Court 1': court1,
    'Court 2': court2,
    'Court 3': court3
  };
  const [courtArrive, setCourtArrive] = useState(null);
  const [notifSound] = useState(new Audio(ding));
  const [finishSound] = useState(new Audio(finished));
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const title = toCall;
    const audioFile = calls[title];
    const courtAudio = new Audio(audioFile);
    setCourtArrive(courtAudio);
    return () => {
      courtAudio.pause();
      courtAudio.currentTime = 0;
    };
  }, [toCall]);

  const handlePlay = () => {
    notifSound.play();
    notifSound.onended = function () {
      courtArrive.play();
    };
  };
  const toggleMute = () => {
    finishSound.muted = !muted;
    notifSound.muted = !muted;
    courtArrive.muted = !muted;
    setMuted(!muted);
  };
  useImperativeHandle(ref, () => ({
    play() {
      handlePlay();
    },
    finish() {
      finishSound.play();
    }
  }));

  return (
    <div
      style={{
        height: 'fit-content',
        width: 'fit-content',
        fontSize: '4vh',
        color: 'white',
        cursor: 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        padding: '0'
      }}
      onMouseOver={(e) => {
        e.target.style.filter = 'brightness(80%)';
      }}
      onMouseOut={(e) => {
        e.target.style.filter = '';
      }}
    >
      <div className="audio-icon" onClick={handlePlay}>
        <BsFillVolumeOffFill />
      </div>
      <div
        className="right-icon"
        style={{
          height: 'fit-content',
          width: 'fit-content',
          marginLeft: '-1vh',
          zIndex: '1'
        }}
        onClick={toggleMute}
      >
        {muted ? <BsX style={{ fontSize: '3vh' }} /> : <BsWifi1 style={{ fontSize: '4vm' }} />}
      </div>
    </div>
  );
});

CourtCall.propTypes = {
  toCall: PropTypes.string.isRequired
};
CourtCall.displayName = 'CourtCall';

export default CourtCall;
