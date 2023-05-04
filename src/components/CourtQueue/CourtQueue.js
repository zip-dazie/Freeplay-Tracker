import './CourtQueue.css';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { Tooltip, Alert, Fade } from 'react-bootstrap';
import { useRef } from 'react';
import QueueReserve from '../QueueReserve/QueueReserve.js';
import Timer from '../Timer/Timer.js';
import { GrCheckmark, GrClose } from 'react-icons/gr';
// eslint-disable-next-line no-unused-vars
import { GiPlayerNext } from 'react-icons/gi';
// eslint-disable-next-line no-unused-vars
import Draggable from 'react-draggable';
function CourtQueue(props) {
  const [nextId, setNextId] = useState(localStorage.getItem('nextId') || 0); // indexing for queuing
  const { id } = props;
  const [showModal, setShowModal] = useState(false);
  const [warning, setWarning] = useState(false);
  // retrive array from local storage (persisting)
  const [players, setPlayers] = useState(
    JSON.parse(localStorage.getItem(`players-queue-${id}`)) || []
  );
  const MISSING_SIGN = '👤';
  const VERSUS_SIGN = '🏸';
  const checkCourts = {
    1: [2, 3],
    2: [1, 3],
    3: [1, 2]
  };
  const toggleWarning = () => {
    setWarning(!warning);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => setShowModal(true);
  const handleWarning = () => setWarning(true);
  const replaceEmpty = (arr) => {
    let count = 0;
    let formatted = arr.map((i) => {
      if (i === '') {
        count++;
        return '?';
      } else {
        return i;
      }
    });
    return { count, formatted };
  };
  const inputPlayers = (inputs, merge) => {
    console.log(inputs);
    // check for sign-up on another court
    let courtNums = checkCourts[id.match(/\d+/)[0]];
    let A = courtNums[0];
    let B = courtNums[1];

    let tempA = JSON.parse(localStorage.getItem(`players-queue-${`Court ${A}`}`));
    let tempB = JSON.parse(localStorage.getItem(`players-queue-${`Court ${B}`}`));

    let otherCourts = [...tempA.map((item) => item.name), ...tempB.map((item) => item.name)].flat();
    let onOtherCourt = inputs
      .filter((input) => input !== '')
      .some((input) => otherCourts.includes(input));
    // check for sign-up on same court
    let onCourt = false;
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      for (let j = 0; j < players.length; j++) {
        const player = players[j];
        if (player.name.includes(input)) {
          onCourt = true;
          break;
        }
      }
    }
    // alert based on duplicate type
    if (onCourt) {
      alert('Player is already signed up!');
      return false;
    } else if (onOtherCourt) {
      alert('Player is already signed up another court');
      return false;
    }
    let { count, formatted } = replaceEmpty(inputs);
    const index = findEmpty(formatted, count);
    // merging
    if (merge && nextId != 0 && index != -1) {
      let counter = 0;
      let toMerge = formatted.filter((e) => e != '?');
      let mergeWith = players[index].name.filter((e) => {
        if (e === '?' && counter < toMerge.length) {
          counter++;
          return false;
        }
        return true;
      });
      let merged = toMerge.concat(mergeWith);
      const updatedPlayers = [...players];
      updatedPlayers[index].name = merged;
      updatedPlayers[index].status[1] = merged.filter((e) => e === { MISSING_SIGN }).length;
      setPlayers(updatedPlayers);
      return true;
    }
    setNextId((prevNextId) => prevNextId + 1);
    setPlayers([...players, { id: nextId, name: formatted, status: [formatted.length, count] }]);
  };
  const findEmpty = (input, toBeFilled) => {
    for (let i = 0; i < players.length; i++) {
      let playerInfo = players[i];
      let slotSize = playerInfo.status[0];
      let emptySlots = playerInfo.status[1];
      if (
        slotSize === input.length &&
        emptySlots != 0 &&
        emptySlots === toBeFilled &&
        slotSize - emptySlots + (slotSize - toBeFilled) <= input.length
      ) {
        console.log(emptySlots, toBeFilled);
        console.log('all add');
        return i;
      } else if (
        slotSize === input.length &&
        emptySlots != 0 &&
        emptySlots < toBeFilled &&
        slotSize - emptySlots + (slotSize - toBeFilled) <= input.length
      ) {
        console.log('partial add');
        return i;
      }
    }
    return -1;
  };
  // eslint-disable-next-line no-unused-vars
  const queueText = (p) => {
    let short = shortenNames(p);
    let { a: firstHalf, b: secondHalf } = splitNames(p);
    const { a: fHalf, b: sHalf } = splitNames(short);
    const text = secondHalf ? `${fHalf} ${VERSUS_SIGN} ${sHalf}` : firstHalf;
    // reconvert back into string for tooltip
    if (/\p{Emoji}/gu.test(firstHalf)) {
      firstHalf = firstHalf.replace(/\p{Emoji}/gu, '?');
    }
    if (/\p{Emoji}/gu.test(secondHalf)) {
      secondHalf = secondHalf.replace(/\p{Emoji}/gu, '?');
    }
    return (
      <>
        <span
          title={`${firstHalf} vs. ${secondHalf}`}
          onTouchStart={(e) => {
            e.preventDefault();
            e.currentTarget.title = `${firstHalf} vs. ${secondHalf}`;
          }}
        >
          {text}
        </span>
      </>
    );
  };
  const shortenName = (name) => {
    const words = name.split(' ');
    if (words.length === 1) {
      return name;
    } else {
      const lastWord = words[words.length - 1];
      const shortened = lastWord.slice(0, 1) + '.';
      return words.slice(0, -1).join(' ') + ' ' + shortened;
    }
  };
  const shortenNames = (names) => {
    return names.map(shortenName);
  };
  const splitNames = (names) => {
    const half = Math.ceil(names.length / 2);
    const firstHalf = names
      .slice(0, half)
      .map((value) => (value === '?' ? MISSING_SIGN : value))
      .join(' + ');
    const secondHalf = names
      .slice(half)
      .map((value) => (value === '?' ? MISSING_SIGN : value))
      .join(' + ');
    return { a: firstHalf, b: secondHalf };
  };
  const OnCourtText = (p) => {
    let short = shortenNames(p);
    let { a: firstHalf, b: secondHalf } = splitNames(p);
    const { a: fHalf, b: sHalf } = splitNames(short);
    const separator = sHalf ? <div>{VERSUS_SIGN}</div> : null;
    //convert emoji to string
    if (/\p{Emoji}/gu.test(fHalf)) {
      firstHalf = fHalf.replace(/\p{Emoji}/gu, '?');
    }
    if (/\p{Emoji}/gu.test(sHalf)) {
      secondHalf = sHalf.replace(/\p{Emoji}/gu, '?');
    }
    return (
      <div style={{ whiteSpace: 'pre', lineHeight: 1.4 }}>
        <span
          title={firstHalf}
          onTouchStart={(e) => {
            e.preventDefault();
            e.currentTarget.title = `${firstHalf}`;
          }}
        >
          {fHalf}
        </span>
        {separator}
        <span
          title={secondHalf}
          onTouchStart={(e) => {
            e.preventDefault();
            e.currentTarget.title = `${secondHalf}`;
          }}
        >
          {sHalf}
        </span>
      </div>
    );
  };
  //toast event handling
  const handleClearing = () => {
    if (players.length > 1) {
      handleWarning();
    }
  };

  // bind keys to queueing
  const clearQueue = () => {
    setPlayers((players) => [players[0]]);
  };
  const removePlayers = (pid) => {
    setPlayers((players) => players.filter((player) => player.id !== pid));
  };

  useEffect(() => {
    if (players.length > 0) {
      childRef.current.start();
    } else if (players.length <= 0) {
      childRef.current.stop();
    }
    localStorage.setItem(`players-queue-${id}`, JSON.stringify(players));
  }, [players]);
  const childRef = useRef(null);
  const handleNext = () => {
    childRef.current.reset();
  };
  useEffect(() => {
    localStorage.setItem('nextId', nextId);
  }, [nextId]);
  return (
    <div>
      <div className="top-items">
        <Timer ref={childRef} title={id} />
        {/*pop queue*/}
        <button
          className="circle-control"
          style={{ marginLeft: 'auto', borderRadius: '0.5rem 0.5rem 0 0' }}
          onClick={() => {
            setPlayers(players.slice(1, players.length));
            handleNext();
          }}
        >
          →<span className="tip-text">Next</span>
        </button>
      </div>
      {/* display only top of queue */}
      <div
        className="Current-Box"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        {players.slice(0, 1).map((player) => (
          <div className="Cur-Players" key={player.id}>
            <div
              style={{
                margin: '5vh',
                textAlign: 'center'
              }}
            >
              {OnCourtText(player.name)}
            </div>
          </div>
        ))}
      </div>

      {warning ? <div className="dark-overlay"></div> : null}
      <div
        className="controls"
        style={{
          position: 'relative',
          zIndex: 1
        }}
      >
        <Alert
          variant="light"
          transition={Fade}
          show={warning && players.length > 0}
          style={{
            zIndex: 9998,
            display: 'flex',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            top: '.001vh',
            position: 'absolute',
            pointerEvents: 'auto',
            paddingBottom: '0px',
            paddingTop: '7px',
            overflow: 'hidden'
          }}
        >
          <Alert.Heading
            style={{
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            Clear Line?
            <button
              className="check-control"
              onClick={() => {
                clearQueue();
                toggleWarning();
              }}
            >
              <GrCheckmark />
            </button>
            <button
              className="close-control"
              onClick={() => {
                toggleWarning();
              }}
            >
              <GrClose />
            </button>
          </Alert.Heading>
        </Alert>
        {/* add to queue */}
        <button
          className="circle-control"
          onClick={handleShow}
          style={{
            pointerEvents: 'auto'
          }}
        >
          +
        </button>
        <QueueReserve showModal={showModal} handleClose={handleClose} handleSave={inputPlayers} />
        <strong style={{ color: 'white', fontSize: '10px' }}>
          Waiting: {players.length - 1 > 0 ? players.length - 1 : 0}
        </strong>
        {/* clear queue */}
        <button
          className="circle-control"
          onClick={handleClearing}
          style={{
            pointerEvents: 'auto'
          }}
        >
          ×
        </button>
      </div>
      <div className="Queue-Box">
        {/* display rest of queue */}
        {players.slice(1, players.length).map((player) => (
          <div className="Queue-Item" key={player.id}>
            <p className="Queue-Text">{queueText(player.name)}</p>
            <button className="remove-btn" onClick={() => removePlayers(player.id)}>
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default CourtQueue;

CourtQueue.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};
