import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Timer.css';

const Timer = forwardRef((props, ref) => {
  const { title } = props;
  const [startTime, setStartTime] = useState(
    parseInt(localStorage.getItem(`timer-${title}-start`), 10) || Date.now()
  );
  const [elapsedTime, setElapsedTime] = useState(
    parseInt(localStorage.getItem(`timer-${title}-elapsed`), 10) || 0
  );
  const [running, setRunning] = useState(
    localStorage.getItem(`timer-${title}-running`) === 'true' || false
  );

  useImperativeHandle(ref, () => ({
    reset() {
      setElapsedTime(0);
      setStartTime(Date.now());
      setRunning(false);
    },
    start() {
      setRunning(true);
      setStartTime(Date.now());
    },
    stop() {
      setRunning(false);
    }
  }));

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        const cur = Date.now();
        setElapsedTime((prevElapsedTime) => prevElapsedTime + cur - startTime);
        setStartTime(cur);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running, startTime]);

  useEffect(() => {
    localStorage.setItem(`timer-${title}-start`, startTime);
    localStorage.setItem(`timer-${title}-elapsed`, elapsedTime);
    localStorage.setItem(`timer-${title}-running`, running);
  }, [title, startTime, elapsedTime, running]);

  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes.toString();
  const secondsStr = seconds < 10 ? `0${seconds}` : seconds.toString();

  return (
    <div>
      <span className="time-text">
        {minutesStr}:{secondsStr}
      </span>
    </div>
  );
});

Timer.propTypes = {
  title: PropTypes.string.isRequired
};

Timer.displayName = 'Timer';

export default Timer;
