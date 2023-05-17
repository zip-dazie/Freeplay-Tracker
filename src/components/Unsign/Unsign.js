// eslint-disable-next-line
import { React, useState } from 'react';
import PropTypes from 'prop-types';
import './Unsign.css';
import { Modal, Button, Form, Row, CloseButton, Toast } from 'react-bootstrap';
function Unsign(props) {
  const { show_remove, close_remove, save_removal } = props;
  // eslint-disable-next-line
  const [toastText, setToastText] = useState('');
  // eslint-disable-next-line
  const [showToast, setShowToast] = useState(false);
  const [players, setPlayers] = useState(Array(1).fill(''));
  const handleInput = (event, i) => {
    const newPlayers = [...players];
    newPlayers[i] = event.target.value;
    setPlayers(newPlayers);
  };
  const handleSubmit = (e) => {
    const empty = players.every((name) => name === '');
    if (empty) {
      setToastText('No input');
      setShowToast(true);
    }
    e.preventDefault();
    if (Array.isArray(players) && players.length > 0 && players.some((player) => player !== '')) {
      save_removal(players);
    }
    resetModal();

    close_remove();
  };
  const resetModal = () => {
    setPlayers(Array(1).fill(''));
  };
  const handleKeyPressed = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };
  const inputBoxes = Array.from({ length: players.length }, (_, i) => (
    <Form.Group as={Row} controlId={`player${i}`} key={`player${i}`}>
      <Form.Control
        type="text"
        maxLength={14}
        placeholder={'UCINETID'}
        onChange={(e) => handleInput(e, i)}
        value={players[i]}
        onKeyUp={handleKeyPressed}
        style={{
          width: '45%',
          margin: '10px',
          fontSize: '12px',
          outlineColor: 'black'
        }}
      />
    </Form.Group>
  ));
  return (
    <div
      {...props}
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
        show={show_remove}
        onHide={close_remove}
      >
        <Modal.Header>
          <Modal.Title>Withdraw</Modal.Title>
          <CloseButton
            variant="white"
            onClick={() => {
              close_remove();
              resetModal();
            }}
          />
        </Modal.Header>
        <Modal.Body>
          <Row style={{ justifyContent: 'center' }}>{inputBoxes}</Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: 'skyblue', borderColor: 'skyblue' }}
            type="submit"
            variant="primary"
            onClick={handleSubmit}
          >
            Submit
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
        <Toast.Body style={{ fontSize: '0.7rem', color: 'gray' }}>{toastText}</Toast.Body>
      </Toast>
    </div>
  );
}

export default Unsign;

Unsign.propTypes = {
  close_remove: PropTypes.func,
  show_remove: PropTypes.bool,
  save_removal: PropTypes.func
};
