import './CourtQueue.css';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Alert, Fade } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useRef } from 'react';
import QueueReserve from '../QueueReserve/QueueReserve.js';
import Timer from '../Timer/Timer.js';
import { GrCheckmark, GrClose } from 'react-icons/gr';
import { GiPlayerNext } from 'react-icons/gi';
// eslint-disable-next-line no-unused-vars
import Draggable from 'react-draggable';
let nextId = 0; // indexing for queuing

function CourtQueue(props) {
  const { id } = props;
  const [players, setPlayers] = useState(
    JSON.parse(localStorage.getItem(`players-queue-${id}`)) || []
  );
  // eslint-disable-next-line no-unused-vars
  let isEmpty = true;
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [warning, setWarning] = useState(false);
  // eslint-disable-next-line no-unused-vars
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
        return '🫥';
      } else {
        return i;
      }
    });
    return { count, formatted };
  };
  const inputPlayers = (inputs, merge) => {
    let { count, formatted } = replaceEmpty(inputs);
    if (merge && nextId != 0) {
      const index = findEmpty(formatted, count);
      if (index != -1) {
        let counter = 0;
        let toMerge = formatted.filter((e) => e != '🫥');
        let mergeWith = players[index].name.filter((e) => {
          if (e === '🫥' && counter < toMerge.length) {
            counter++;
            return false;
          }
          return true;
        });
        let merged = toMerge.concat(mergeWith);
        const updatedPlayers = [...players];
        updatedPlayers[index].name = merged;
        updatedPlayers[index].status[1] = merged.filter((e) => e === '🫥').length;
        setPlayers(updatedPlayers);
      } else {
        setPlayers([
          ...players,
          { id: nextId++, name: formatted, status: [formatted.length, count] }
        ]);
      }
    } else {
      players.forEach((e) => console.log(e));
      setPlayers([
        ...players,
        { id: nextId++, name: formatted, status: [formatted.length, count] }
      ]);
    }
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
  const playersText = (p) => {
    const half = Math.ceil(p.length / 2);
    const firstHalf = p
      .slice(0, half)
      .map((value) => (value ? value : '?'))
      .join(' • ');
    const secondHalf = p
      .slice(half)
      .map((value) => (value ? value : '?'))
      .join(' • ');
    return secondHalf ? `${firstHalf}🏸${secondHalf}` : firstHalf;
  };
  //toast event handling
  // eslint-disable-next-line no-unused-vars
  const handleClearing = () => {
    if (players.length > 1) {
      handleWarning();
    }
  };

  // bind keys to queueing
  // eslint-disable-next-line no-unused-vars
  const clearQueue = () => {
    setPlayers((players) => [players[0]]);
  };
  const removePlayers = (pid) => {
    console.log(players.length);
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
  return (
    <div>
      <div className="top-items">
        <Timer ref={childRef} title={id} />
        {/*pop queue*/}
        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Next</Tooltip>}>
          <button
            className="circle-control"
            style={{ marginLeft: 'auto', borderRadius: '0.5rem 0.5rem 0 0' }}
            onClick={() => {
              setPlayers(players.slice(1, players.length));
              handleNext();
            }}
          >
            <GiPlayerNext />
          </button>
        </OverlayTrigger>
      </div>
      {/* display only top of queue */}
      <div className="Current-Box">
        {players.slice(0, 1).map((player) => (
          <div className="Cur-Players" key={player.id}>
            {playersText(player.name)}
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
            height: '25px',
            width: '100%',
            top: '.001vh',
            position: 'absolute',
            pointerEvents: 'auto',
            paddingBottom: '0px',
            paddingTop: '7px'
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
        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Clear line</Tooltip>}>
          <button
            className="circle-control"
            onClick={handleClearing}
            style={{
              pointerEvents: 'auto'
            }}
          >
            ×
          </button>
        </OverlayTrigger>
      </div>
      <div className="Queue-Box">
        {/* display rest of queue */}
        {players.slice(1, players.length).map((player) => (
          <div className="Queue-Item" key={player.id}>
            <button className="config-btn">⋮</button>
            <p className="Queue-Text">{playersText(player.name)}</p>
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
