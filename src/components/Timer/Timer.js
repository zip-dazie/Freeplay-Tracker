import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Timer.css';

const Timer = forwardRef((props, ref) => {
  const { title } = props;
  const [start, setStart] = useState(
    parseInt(localStorage.getItem(`timer-${title}-start`), 10) || Date.now()
  );
  const [time, setTime] = useState(parseInt(localStorage.getItem(`timer-${title}-time`), 10) || 0);
  const [running, setRunning] = useState(
    localStorage.getItem(`timer-${title}`) === 'true' || false
  );

  useImperativeHandle(ref, () => ({
    reset() {
      setTime(0);
      setStart(Date.now());
      setRunning(false);
    },
    start() {
      setRunning(true);
      setStart(Date.now());
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
        setTime(time + cur - start);
        setStart(cur);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running, start, time]);

  useEffect(() => {
    localStorage.setItem(`timer-${title}-start`, start);
    localStorage.setItem(`timer-${title}-time`, time);
    localStorage.setItem(`timer-${title}`, running);
  }, [title, start, time, running]);

  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time / 1000) % 60);
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
