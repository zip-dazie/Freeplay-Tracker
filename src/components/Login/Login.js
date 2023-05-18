import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, CloseButton, Form, Button, InputGroup } from 'react-bootstrap';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import './Login.css';

const Login = ({ show_login, close_login, save_login }) => {
  const [passwordView, setPasswordView] = useState(false);
  const [input, setInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const PW = 'baddy';

  const toggleView = () => {
    setPasswordView(!passwordView);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    setErrorMessage('');
  };

  const handleLogin = () => {
    if (input === PW) {
      save_login();
      close_login();
      setInput('');
    } else {
      setErrorMessage('Incorrect password');
    }
  };

  const isPasswordValid = input === PW;
  const passwordInput = isPasswordValid ? 'password-input' : 'password-input invalid';

  return (
    <Modal show={show_login} onHide={close_login} size="sm">
      <Modal.Header>
        <Modal.Title>Admin Login</Modal.Title>
        <CloseButton variant="white" onClick={close_login} />
      </Modal.Header>
      <Modal.Body>
        <InputGroup>
          <Form.Group>
            <div style={{ position: 'relative' }}>
              <Form.Control
                type={passwordView ? 'text' : 'password'}
                placeholder="Password"
                className={passwordInput}
                value={input}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          <div>
            <div className="password-toggle" onClick={toggleView}>
              {passwordView ? <RiEyeOffFill /> : <RiEyeFill />}
            </div>
          </div>
        </InputGroup>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleLogin}
          style={{ backgroundColor: 'skyblue', borderColor: 'skyblue' }}
        >
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

Login.propTypes = {
  show_login: PropTypes.bool.isRequired,
  close_login: PropTypes.func.isRequired,
  save_login: PropTypes.func.isRequired
};

export default Login;
