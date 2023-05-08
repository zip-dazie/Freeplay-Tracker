import { React, useState } from 'react';
import PropTypes from 'prop-types';
import './QueueReserve.css';
import { BsFillPersonFill, BsFillPeopleFill } from 'react-icons/bs';
import { checkUser } from '../Users/Users';

import {
  Modal,
  Button,
  Form,
  Row,
  ToggleButton,
  ButtonGroup,
  CloseButton,
  Toast
} from 'react-bootstrap';
function QueueReserve({ show_modal, handle_close, handle_save, ...rest }) {
  const [numPlayers, setNumPlayers] = useState(4);
  const [radioValue, setRadioValue] = useState('4');
  const [toastText, setToastText] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [merge, setMerge] = useState(false);
  const [players, setPlayers] = useState(Array(numPlayers).fill(''));
  const DOUBLES = 4;
  const radios = [
    { name: 'Singles', value: '2' },
    { name: 'Doubles', value: '4' }
  ];
  const HandleChangeMode = (event) => {
    setNumPlayers(parseInt(event));
  };
  const handleInput = (event, pos) => {
    const newInputs = [...players];
    newInputs[pos] = event.target.value;
    setPlayers(newInputs);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const promises = players.map((name) => {
      if (name === '') {
        return Promise.resolve('');
      } else {
        return checkUser(name.toLowerCase());
      }
    });
    const results = await Promise.all(promises);
    const empty = players.every((name) => name === '');
    const filteredPlayers = players.filter((name) => name.trim() !== '');
    const uniquePlayers = new Set(filteredPlayers.map((name) => name.toLowerCase()));
    const isUnique = uniquePlayers.size >= filteredPlayers.length;
    if (!empty && results.every((result) => !result.allow) && isUnique) {
      // create an array of appropriate size depending on amount of palyers, and add the names of the players
      let toFill = Array(numPlayers)
        .fill('')
        .map((_, i) => {
          const name = results[i]?.name;
          return name ? name : '';
        });
      handle_save(toFill, merge);
    } else {
      if (empty) {
        setToastText('No input');
      } else if (!isUnique) {
        setToastText('No double sign-up!');
      } else {
        setToastText('All players must be registered!');
      }
      setShowToast(true);
    }
    resetModal();
    handle_close();
  };
  const resetModal = () => {
    setRadioValue(radios.find((option) => option.name === 'Doubles').value);
    setNumPlayers(DOUBLES);
    const defaultPlayers = Array(DOUBLES).fill('');
    setPlayers(defaultPlayers);
    setMerge(false);
  };
  const handleKeyPressed = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };
  const renderInputs = () => {
    let inputs = [];
    for (let i = 0; i < numPlayers; i++) {
      inputs.push(
        <Form.Control
          key={i}
          type="text"
          maxLength={14}
          placeholder={'UCINetID ' + (i + 1)}
          onChange={(e) => handleInput(e, i)}
          value={inputs[i]}
          onKeyUp={handleKeyPressed}
          className="input"
          style={{ width: '35%', margin: '10px', fontSize: '12px', outlineColor: 'black' }}
        />
      );
    }
    return inputs;
  };
  return (
    <div
      {...rest}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '102.5%'
      }}
    >
      <Modal
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show_modal}
        onHide={handle_close}
      >
        <Modal.Header>
          <Modal.Title>Court Sign-up</Modal.Title>
          <CloseButton variant="white" onClick={handle_close}></CloseButton>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <ButtonGroup>
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={idx % 2 ? 'outline-primary' : 'outline-secondary'}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => {
                    setRadioValue(e.currentTarget.value);
                    HandleChangeMode(e.currentTarget.value);
                  }}
                  style={{
                    backgroundColor: radioValue === radio.value ? 'skyblue' : 'white',
                    borderColor: 'skyblue',
                    color: radioValue === radio.value ? 'white' : 'skyblue'
                  }}
                >
                  {radio.name === 'Doubles' ? (
                    <BsFillPeopleFill></BsFillPeopleFill>
                  ) : (
                    <BsFillPersonFill></BsFillPersonFill>
                  )}
                </ToggleButton>
              ))}
            </ButtonGroup>
            <Form.Check
              type="switch"
              label="Merge"
              checked={merge}
              onChange={(event) => setMerge(event.target.checked)}
              style={{
                float: 'right',
                marginTop: '1.25vh'
              }}
            />
            <Row style={{ justifyContent: 'center' }}>{numPlayers > 0 && renderInputs()}</Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: 'skyblue', borderColor: 'skyblue' }}
            type="submit"
            variant="primary"
            onClick={handleSubmit}
          >
            Sign-up
          </Button>
        </Modal.Footer>
      </Modal>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={2000}
        autohide
        style={{
          width: '300%',
          height: '80%',
          color: 'black',
          backgroundColor: 'white'
        }}
      >
        <Toast.Body>{toastText}</Toast.Body>
      </Toast>
    </div>
  );
}

export default QueueReserve;

QueueReserve.propTypes = {
  handle_close: PropTypes.func,
  show_modal: PropTypes.bool,
  handle_save: PropTypes.func
};
