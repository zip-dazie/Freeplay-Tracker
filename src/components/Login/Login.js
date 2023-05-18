import React from 'react';
import PropTypes from 'prop-types';
import { Modal, CloseButton } from 'react-bootstrap';

const Login = ({ show_login, close_login, save_login }) => (
  <Modal show={show_login} onHide={close_login}>
    <Modal.Header>
      <Modal.Title>Admin Login</Modal.Title>
      <CloseButton onClick={close_login} />
    </Modal.Header>
    <Modal.Body>
      <p>Test</p>
    </Modal.Body>
    <Modal.Footer>
      <button onClick={save_login}>Login</button>
    </Modal.Footer>
  </Modal>
);

Login.propTypes = {
  show_login: PropTypes.bool.isRequired,
  close_login: PropTypes.func.isRequired,
  save_login: PropTypes.func.isRequired
};

export default Login;
