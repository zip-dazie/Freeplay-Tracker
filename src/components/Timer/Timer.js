import React from 'react';
import './Timer.css';
// eslint-disable-next-line no-unused-vars
import { forwardRef, useImperativeHandle, useState, useEffect, useRef } from 'react';

const Timer = forwardRef((props, ref) => {
  const [time, setTime] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [running, setRunning] = useState(false);
  useImperativeHandle(ref, () => ({
    reset() {
      setTime(0);
    },
    start() {
      setRunning(true);
    },
    stop() {
      setRunning(false);
    }
  }));
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div>
      {/* doesn't go beyond minites */}
      <span className="time-text">
        {('0' + Math.floor((time / 60000) % 60)).slice(-2)}:
        {('0' + Math.floor((time / 1000) % 60)).slice(-2)}
      </span>
    </div>
  );
});
Timer.displayName = 'Timer';
export default Timer;
