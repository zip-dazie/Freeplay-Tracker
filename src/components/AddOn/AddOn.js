import './AddOn.css';
import { Modal, CloseButton, Form, Row, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { checkUser } from '../Users/Users';

function AddOn(props) {
  const { show_add, close_add, save_add, to_add } = props;
  const [players, setPlayers] = useState(to_add.map((p) => (p === '?' ? '' : p)));
  const [isEditable, setIsEditable] = useState(to_add.map((val) => val === '?'));
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(players);
    const nonEmptyInputs = players.filter((name, index) => name !== '' && isEditable[index]);
    const promises = nonEmptyInputs.map((name) => checkUser(name.toLowerCase()));
    try {
      const results = await Promise.all(promises);
      const uniquePlayers = new Set(nonEmptyInputs.map((name) => name.toLowerCase()));
      const isUnique = uniquePlayers.size === nonEmptyInputs.length;
      if (nonEmptyInputs.length > 0 && results.every((result) => !result.allow) && isUnique) {
        let resultIndex = 0;
        const addPlayers = players.map((player, index) => {
          if (player === '') {
            return player;
          }
          if (isEditable[index]) {
            const result = results[resultIndex];
            resultIndex++;
            return result?.name || '';
          }
          return player;
        });
        //console.log(addPlayers);
        save_add(addPlayers);
        setPlayers(to_add.map((p) => (p === '?' ? '' : p)));
        close_add();
      } else {
        alert('Not all players are registered.');
        setPlayers(to_add.map((p) => (p === '?' ? '' : p)));
        close_add();
      }
    } catch (error) {
      alert('Error occurred while checking user.');
      setPlayers(to_add.map((p) => (p === '?' ? '' : p)));
      close_add();
    }
  };

  const handleInput = (event, pos) => {
    const newInputs = [...players];
    newInputs[pos] = event.target.value;
    setPlayers(newInputs);
  };

  const renderInputs = () => {
    const inputs = players.map((inputValue, i) => {
      const placeholder = isEditable[i] ? `UCINetID ${i + 1}` : '';
      return (
        <Form.Control
          key={i}
          type="text"
          maxLength={14}
          placeholder={placeholder}
          onChange={(e) => handleInput(e, i)}
          value={inputValue === '?' ? '' : inputValue}
          onKeyUp={handleKeyPressed}
          className="input"
          style={{
            width: '35%',
            margin: '10px',
            fontSize: '12px',
            outlineColor: 'black',
            pointerEvents: isEditable[i] ? 'auto' : 'none',
            backgroundColor: isEditable[i] ? 'white' : 'lightgray'
          }}
          readOnly={!isEditable}
        />
      );
    });

    return inputs;
  };

  const handleKeyPressed = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };
  useEffect(() => {
    setPlayers(to_add.map((p) => (p === '?' ? '' : p)));
    setIsEditable(to_add.map((val) => val === '?'));
  }, [to_add]);

  return (
    <div>
      <Modal
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show_add}
        onHide={close_add}
      >
        <Modal.Header>
          <Modal.Title>Add-On</Modal.Title>
          <CloseButton variant="white" onClick={close_add} />
        </Modal.Header>
        <Modal.Body>
          <Row style={{ justifyContent: 'center' }}>{renderInputs()}</Row>
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

AddOn.propTypes = {
  show_add: PropTypes.bool,
  close_add: PropTypes.func,
  save_add: PropTypes.func,
  to_add: PropTypes.array
};

export default AddOn;
