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
    setTimeout(() => {
      notifSound.play();
      courtArrive.play();
    }, 500);
  };

  const handleFinishPlay = () => {
    finishSound.play();
    setTimeout(() => {
      handlePlay();
    }, 1000);
  };
  const toggleMute = () => {
    console.log('muting');
    finishSound.muted = !muted;
    notifSound.muted = !muted;
    courtArrive.muted = !muted;
    setMuted(!muted);
  };
  useImperativeHandle(ref, () => ({
    play() {
      handlePlay();
    },
    finishPlay() {
      handleFinishPlay();
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
        padding: '0px'
      }}
      onMouseOver={(e) => {
        e.target.style.filter = 'brightness(80%)';
      }}
      onMouseOut={(e) => {
        e.target.style.filter = '';
      }}
    >
      <span onClick={handlePlay}>
        <BsFillVolumeOffFill style={{ width: 'fit-content' }} />
      </span>
      <div
        style={{
          transform: 'rotate(90deg) translateX(.65vh)',
          height: 'fit-content',
          width: 'fit-content'
        }}
        onClick={toggleMute}
      >
        {muted ? <BsX style={{ fontSize: '3vh' }} /> : <BsWifi1 style={{ fontSize: '4.5vh' }} />}
      </div>
      <style></style>
    </div>
  );
});

CourtCall.propTypes = {
  toCall: PropTypes.string.isRequired
};
CourtCall.displayName = 'CourtCall';

export default CourtCall;
