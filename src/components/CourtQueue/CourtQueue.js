import './CourtQueue.css';
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip, Alert, Fade, Toast } from 'react-bootstrap';
import QueueReserve from '../QueueReserve/QueueReserve.js';
import Unsign from '../Unsign/Unsign.js';
import Timer from '../Timer/Timer.js';
import CourtCall from '../CourtCall/CourtCall.js';
import AddOn from '../AddOn/AddOn.js';
import { GrCheckmark, GrClose } from 'react-icons/gr';
import { checkUser } from '../Users/Users.js';
import { CSSTransition } from 'react-transition-group';
// eslint-disable-next-line no-unused-vars
import Draggable from 'react-draggable';
import { AiOutlineUndo } from 'react-icons/ai';
function CourtQueue(props) {
  const [nextId, setNextId] = useState(localStorage.getItem('nextId') || 0); // indexing for queuing
  const { id } = props;
  const [showSignUp, SetShowSignup] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showUnsign, setShowUnsign] = useState(false);
  const [warning, setWarning] = useState(false);
  // retrive array from local storage (persisting)
  const [players, setPlayers] = useState(
    JSON.parse(localStorage.getItem(`players-queue-${id}`)) || []
  );
  const [pLength, setPLength] = useState(0);
  const [removed, setRemoved] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [canMerge, setCanMerge] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [toAdd, setToAdd] = useState([]);
  const [toAddId, setToAddId] = useState(null);
  const [toastText, setToastText] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem('loggedIn')) || false);
  const queueItemRef = useRef(null);
  let ITEM_HEIGHT = 0;
  const MISSING_SIGN = '👤';
  const VERSUS_SIGN = '🏸';
  const MISSING_STRING = '?';
  const CHECKCOURTS = {
    1: [2, 3],
    2: [1, 3],
    3: [1, 2]
  };
  useEffect(() => {
    if (queueItemRef.current) {
      ITEM_HEIGHT = queueItemRef.current.clientHeight;
    }
  }, []);
  const courtCallRef = useRef(null);
  const toggleWarning = () => {
    setWarning(!warning);
  };
  const handleClose = () => {
    SetShowSignup(false);
  };
  const handleSignUp = () => {
    setCanMerge(players.filter((player) => player.status[1] < player.status[0]));
    SetShowSignup(true);
    //setPlayers([...players, { id: nextId, name: formatted, status: [formatted.length, count] }]);
  };
  // eslint-disable-next-line no-unused-vars
  const handleAddon = (pid) => {
    setShowAdd(true);
    setToAddId(pid);
    //console.log(pid);
    setToAdd((prevToAdd) => {
      const player = players.find((_, index) => index === pid);
      return player ? player.name : prevToAdd;
    });
  };
  const closeAddon = () => {
    setShowAdd(false);
  };
  const saveAdd = (p) => {
    //console.log(toAddId);
    //console.log(toAdd);
    //console.log(p);
    const added = p.filter((e) => !toAdd.includes(e));
    if (alreadyOnCourt(added)) return false;
    else if (added.every((player) => player.trim() === '')) {
      setToastText('No double sign-ups!');
      setShowToast(true);
      return false;
    }
    console.log(added);
    let { formatted, count } = replaceEmpty(p);
    //console.log(formatted, count);
    let updatedStatus = [formatted.length, count];
    //console.log(players[toAddId].name);
    const updatedArray = [...players];
    updatedArray[toAddId] = { id: toAddId, name: formatted, status: updatedStatus };
    setPlayers(updatedArray);
  };
  // unsign/withdraw players
  const showRemove = () => {
    if (players.length > 0) {
      setShowUnsign(true);
    }
  };
  const closeRemove = () => setShowUnsign(false);
  const withdrawPlayers = async (p) => {
    let pName = p.toString().toLowerCase();
    let result = '';
    if (p !== '') {
      result = await checkUser(pName);
    }

    if (result.name) {
      const updatedPlayers = players
        .map((player) => {
          if (player.name.includes(result.name)) {
            const updatedName = player.name.map((name) =>
              name === result.name ? MISSING_STRING : name
            );
            const updatedStatus = [player.status[0], player.status[1] - 1];
            if (updatedStatus[1] <= 0) {
              removePlayers(player.id);
              return null;
            } else {
              return {
                ...player,
                name: updatedName,
                status: updatedStatus
              };
            }
          } else {
            return player;
          }
        })
        .filter(Boolean);
      setPlayers(updatedPlayers);
    } else {
      setToastText('Player is not signed up');
      setShowToast(true);
    }
  };
  const handleWarning = () => setWarning(true);
  const replaceEmpty = (arr) => {
    let count = 0;
    let formatted = arr.map((i) => {
      if (i === '') {
        return '?';
      } else {
        count++;
        return i;
      }
    });
    return { formatted, count };
  };
  const mergeArrays = (arr1, arr2) => {
    // keep integrity of player position
    const merged = [];
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] === '?') {
        const notEmpty = arr2.findIndex((el) => el !== '?');
        if (notEmpty !== -1) {
          merged.push(arr2[notEmpty]);
          arr2[notEmpty] = '?';
        } else {
          merged.push('?');
        }
      } else {
        merged.push(arr1[i]);
      }
    }
    return merged;
  };

  const alreadyOnCourt = (inputs) => {
    let courtNums = CHECKCOURTS[id.match(/\d+/)[0]];
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
      setToastText('A player is already signed up on this court!');
      setShowToast(true);
      return true;
    } else if (onOtherCourt) {
      setToastText('A player is signed up on another court!');
      setShowToast(true);
      return true;
    } else {
      return false;
    }
  };
  const inputPlayers = (inputs, merge) => {
    if (alreadyOnCourt(inputs)) return false;

    let { formatted, count } = replaceEmpty(inputs);
    const index = findEmpty(formatted, count);
    //console.log(index, count, formatted);
    // merging
    //console.log(index);
    if (merge && nextId != 0 && index != -1) {
      let mergeWith = players[index].name;
      //console.log(mergeWith);
      //console.log(formatted);
      let merged = mergeArrays(mergeWith, formatted);
      //console.log(merged);
      const updatedPlayers = [...players];
      updatedPlayers[index].name = merged;
      updatedPlayers[index].status[1] = merged.filter((e) => e !== MISSING_STRING).length;
      setPlayers(updatedPlayers);
      return true;
    }
    setNextId((prevNextId) => prevNextId + 1);
    setPlayers([...players, { id: nextId, name: formatted, status: [formatted.length, count] }]);
    return true;
  };
  const findEmpty = (input, toBeFilled) => {
    //console.log(input, toBeFilled);
    for (let i = 0; i < players.length; i++) {
      let playerInfo = players[i];
      let slotSize = playerInfo.status[0];
      let emptySlots = slotSize - playerInfo.status[1];
      if (
        slotSize === input.length &&
        emptySlots != 0 &&
        emptySlots === toBeFilled &&
        slotSize - emptySlots + toBeFilled <= slotSize
      ) {
        return i;
      } else if (
        slotSize === input.length &&
        emptySlots != 0 &&
        emptySlots >= toBeFilled &&
        slotSize - emptySlots + toBeFilled <= slotSize
      ) {
        return i;
      }
    }
    return -1;
  };
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
    const tooltip = <Tooltip>{`${firstHalf} vs. ${secondHalf}`}</Tooltip>;
    return (
      <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={tooltip}>
        <div data-bs-toggle="tooltip" data-bs-target="#my-tooltip">
          {text}
        </div>
      </OverlayTrigger>
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
    if (/\p{Emoji}/gu.test(firstHalf)) {
      firstHalf = firstHalf.replace(/\p{Emoji}/gu, '?');
    }
    if (/\p{Emoji}/gu.test(secondHalf)) {
      secondHalf = secondHalf.replace(/\p{Emoji}/gu, '?');
    }
    return (
      <div style={{ whiteSpace: 'pre', lineHeight: 1.4 }}>
        <OverlayTrigger placement="top" overlay={<Tooltip>{firstHalf}</Tooltip>}>
          <span>{fHalf}</span>
        </OverlayTrigger>
        {separator}
        <OverlayTrigger placement="top" overlay={<Tooltip>{secondHalf}</Tooltip>}>
          <span>{sHalf}</span>
        </OverlayTrigger>
      </div>
    );
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
  const removePlayers = (index) => {
    setRemoved(true);
    setPlayers((players) => {
      const updatedPlayers = [...players];
      updatedPlayers.splice(index, 1);
      return updatedPlayers;
    });
  };
  useEffect(() => {
    // Load nextId from localStorage
    const storedNextId = localStorage.getItem('nextId');
    if (storedNextId) {
      setNextId(parseInt(storedNextId));
    }
  }, []);
  // get queue (persisted)
  useEffect(() => {
    if (players.length === 0) {
      setNextId(0);
    }
    if (players.length > 0) {
      childRef.current.start();
    } else if (players.length <= 0) {
      childRef.current.reset();
    }
    setPLength(players.length);

    if (players.length > 0) {
      childRef.current.start();
    } else if (players.length <= 0) {
      childRef.current.reset();
    }
    setRemoved(false);
    localStorage.setItem(`players-queue-${id}`, JSON.stringify(players));
  }, [players, pLength, removed]);
  const childRef = useRef(null);
  const handleNext = () => {
    setPlayers(players.length > 1 ? players.slice(1, players.length) : []);
    if (players.length <= 1) {
      //console.log(players.length);
      courtCallRef.current.finish();
    } else if (players.length > 1) {
      //console.log(players.length);
      courtCallRef.current.finish();
      courtCallRef.current.play();
      childRef.current.reset();
    }
  };
  const handleDrag = (dragIndex, dropIndex) => {
    if (dragIndex === dropIndex) return;

    const draggedPlayer = players[dragIndex];
    const newPlayers = [...players];

    newPlayers.splice(dragIndex, 1);
    newPlayers.splice(dropIndex, 0, draggedPlayer);

    setPlayers(newPlayers);
  };
  const handleStop = (event, data, dragIndex, dropIndex) => {
    console.log(dragIndex, dropIndex);
    if (dragIndex < dropIndex) {
      const thres = 5;
      const Ydist = Math.sqrt(Math.pow(data.x, 2) + Math.pow(data.y, 2));
      if (Ydist > thres) {
        handleDrag(dragIndex, dropIndex);
      }
    }
  };
  useEffect(() => {
    localStorage.setItem('nextId', nextId);
  }, [nextId]);
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedLoggedIn = JSON.parse(localStorage.getItem('loggedIn')) || false;
      setLoggedIn(updatedLoggedIn);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  return (
    <div>
      <div className="top-items">
        <Timer ref={childRef} title={id} />
        {/*pop queue*/}
        <button
          className="circle-control"
          style={{ marginLeft: 'auto', borderRadius: '1.5vh 1.5vh 0 0' }}
          onClick={() => {
            if (players.length > 0) handleWarning();
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
        <CSSTransition in={players.length > 0} timeout={1000} classNames="fade" unmountOnExit>
          <div className="Cur-Players">
            {players.slice(0, 1).map((player) => (
              <div className="div_in" key={player.id}>
                <div style={{ margin: '5vh', textAlign: 'center' }}>{OnCourtText(player.name)}</div>
              </div>
            ))}
          </div>
        </CSSTransition>
      </div>
      {warning ? (
        <div
          className="dark-overlay"
          style={{
            position: 'absolute',
            zIndex: '5',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '5vh'
          }}
        ></div>
      ) : null}
      <div
        className="controls"
        style={{
          position: 'relative',
          zIndex: '6'
        }}
      >
        <Alert
          variant="light"
          transition={Fade}
          show={warning && players.length > 0}
          style={{
            zIndex: '6',
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
              fontSize: 'clamp(2vh, 1.5vw, 3vh)',
              display: 'flex',
              alignItems: 'center',
              whiteSpace: 'nowrap'
            }}
          >
            Finish game?
            <button
              className="check-control"
              onClick={() => {
                handleNext();
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
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={2000}
          autohide
          style={{
            position: 'absolute',
            zIndex: '9999',
            width: '69.5vh',
            height: '6vh',
            backgroundColor: 'white',
            fontSize: 'clamp(2vh, 2.25vh, 2.5vh)',
            color: 'gray',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {toastText}
        </Toast>
        {/* add to queue */}
        <button
          className="circle-control"
          onClick={handleSignUp}
          style={{
            pointerEvents: 'auto',
            marginRight: 'auto'
          }}
        >
          +
        </button>
        <QueueReserve
          show_modal={showSignUp}
          handle_close={handleClose}
          handle_save={inputPlayers}
        />
        <AddOn show_add={showAdd} close_add={closeAddon} save_add={saveAdd} to_add={toAdd} />
        <strong style={{ color: 'white', fontSize: '2.25vh', margin: 'auto' }}>
          Waiting: {players.length - 1 > 0 ? players.length - 1 : 0}
        </strong>
        {/* clear queue */}
        <button
          className="circle-control"
          onClick={showRemove}
          style={{
            pointerEvents: 'auto',
            marginLeft: 'auto'
          }}
        >
          −
        </button>
        <Unsign
          show_remove={showUnsign}
          close_remove={closeRemove}
          save_removal={withdrawPlayers}
        ></Unsign>
      </div>
      <div className="Queue-Box">
        {/* Display the rest of the queue */}
        {players.slice(1).map((player, index) => {
          if (loggedIn) {
            return (
              <Draggable
                key={player.id}
                axis="y"
                position={{ x: 0, y: index }}
                onStop={(event, data) =>
                  handleStop(event, data, index + 1, Math.round(data.y / ITEM_HEIGHT))
                }
                cancel={['.add-btn', '.remove-btn', '.Queue-Text']}
              >
                <div
                  className="Queue-Item"
                  ref={queueItemRef}
                  style={{ zIndex: '2', cursor: 'grab' }}
                >
                  <button
                    className="add-btn"
                    onClick={() => {
                      handleAddon(index + 1);
                    }}
                    disabled={player.status[0] === player.status[1]}
                    data-tooltip="Full sign-up"
                  >
                    ⊕
                  </button>
                  <span className="Queue-Text">{queueText(player.name)}</span>
                  <button className="remove-btn" onClick={() => removePlayers(index + 1)}>
                    ⊖
                  </button>
                </div>
              </Draggable>
            );
          } else {
            return (
              <div key={player.id} className="Queue-Item" style={{ zIndex: '2' }}>
                <button
                  className="add-btn"
                  onClick={() => {
                    handleAddon(index + 1);
                  }}
                  disabled={player.status[0] === player.status[1]}
                  data-tooltip="Full sign-up"
                >
                  ⊕
                </button>
                <span className="Queue-Text" style={{ marginRight: '1.5vh' }}>
                  {queueText(player.name)}
                </span>
              </div>
            );
          }
        })}
      </div>
      <div
        style={{
          height: 'fit-content',
          width: 'fit-content',
          position: 'absolute',
          bottom: 0,
          left: 0,
          marginBottom: '1.5vh'
        }}
      >
        <CourtCall toCall={id} ref={courtCallRef} />
      </div>
      {loggedIn && (
        <div className="clear-icon" onClick={() => setPlayers([])} data-tooltip="Clear Players">
          <AiOutlineUndo />
        </div>
      )}
    </div>
  );
}
export default CourtQueue;

CourtQueue.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};
