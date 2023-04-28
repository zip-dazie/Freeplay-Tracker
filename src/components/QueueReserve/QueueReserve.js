import { React, useState } from 'react';
import PropTypes from 'prop-types';
import './QueueReserve.css';
import { BsFillPersonFill, BsFillPeopleFill } from 'react-icons/bs';
import { Modal, Button, Form, Row, ToggleButton, ButtonGroup, CloseButton } from 'react-bootstrap';
function QueueReserve(props) {
  const { showModal, handleClose, handleSave } = props;
  const [numPlayers, setNumPlayers] = useState(2);
  const [radioValue, setRadioValue] = useState('2');
  // eslint-disable-next-line no-unused-vars
  const [merge, setMerge] = useState(false);
  const [players, setPlayers] = useState(Array(numPlayers).fill(''));
  const singles = 2;
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
  const playersOutput = () => {
    const full = Array(numPlayers).fill('');
    const fullPlayers = full.map((value, index) => {
      return players[index] || '';
    });
    return fullPlayers;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!players.every((name) => name === '')) {
      handleSave(playersOutput(), merge);
    }
    resetModal();
    handleClose();
  };
  const resetModal = () => {
    setRadioValue(radios.find((option) => option.name === 'Singles').value);
    setNumPlayers(singles);
    const defaultPlayers = Array(singles).fill('');
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
          type="text"
          maxLength={12}
          placeholder={'UCINetID ' + (i + 1)}
          onChange={(e) => handleInput(e, i)}
          value={inputs[i]}
          onKeyUp={handleKeyPressed}
          style={{ width: '35%', margin: '10px', fontSize: '12px' }}
        />
      );
    }
    return inputs;
  };
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showModal}
      onHide={handleClose}
    >
      <Modal.Header>
        <Modal.Title>Court Sign-up</Modal.Title>
        <CloseButton variant="white" onClick={handleClose}></CloseButton>
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
                {radio.name === 'Singles' ? (
                  <BsFillPersonFill></BsFillPersonFill>
                ) : (
                  <BsFillPeopleFill></BsFillPeopleFill>
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
              position: 'relative',
              display: 'inline-block',
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
  );
}

export default QueueReserve;

QueueReserve.propTypes = {
  handleClose: PropTypes.string,
  showModal: PropTypes.string,
  handleSave: PropTypes.string
};
