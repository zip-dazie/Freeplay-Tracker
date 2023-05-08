import { React, useState } from 'react';
import PropTypes from 'prop-types';
import './Unsign.css';
import { Modal, Button, Form, Row, CloseButton } from 'react-bootstrap';
function Unsign(props) {
  const { show_modal, close_remove, save_removal } = props;
  const [players, setPlayers] = useState(Array(1).fill(''));
  const handleInput = (event, i) => {
    const newPlayers = [...players];
    newPlayers[i] = event.target.value;
    setPlayers(newPlayers);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    save_removal(players);
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
        show={show_modal}
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
    </div>
  );
}

export default Unsign;

Unsign.propTypes = {
  close_remove: PropTypes.string,
  show_modal: PropTypes.bool,
  save_removal: PropTypes.string
};
