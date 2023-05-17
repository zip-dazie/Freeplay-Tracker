import { useEffect, useState } from 'react';
import './Register.css';
import { addUser } from '../Users/Users';
function Register() {
  const [ID, setID] = useState('');
  const [name, setName] = useState('');
  const [IdError, setIdError] = useState(false);
  const [IdEmptyError, setIdEmptyError] = useState(false);
  const [nameEmptyError, setNameEmptyError] = useState(false);
  const UCINETID = /^[a-zA-Z0-9._%+-]+@uci\.edu$/;

  useEffect(() => {
    if (name !== '') setNameEmptyError(false);
  }, [name]);
  useEffect(() => {
    if (ID !== '') setIdEmptyError(false);
  }, [ID]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (IdError) return;

    if (ID === '') {
      setIdEmptyError(true);
      return;
    }

    if (name === '') {
      setNameEmptyError(true);
      return;
    }
    addUser(ID, name);
    setID('');
    setName('');
    setIdEmptyError(false);
  };

  const updateID = (e) => {
    const id = e.target.value;
    setID(id);
    if (id === '') {
      setIdEmptyError(true);
    } else if (!UCINETID.test(id)) {
      setIdError(true);
    } else {
      setIdError(false);
      setIdEmptyError(false);
    }
  };

  return (
    <div className="Register" style={{ textAlign: 'left' }}>
      <h3>
        <strong>Register</strong>
      </h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="id-input">
          <input
            type="text"
            value={ID}
            className={IdError || IdEmptyError ? 'input error' : 'input'}
            placeholder="UCINETID@uci.edu"
            onChange={(e) => updateID(e)}
          />
          {IdEmptyError && <p className="error-message">This field is required!</p>}
        </div>
        <div className="name-input">
          <input
            type="text"
            value={name}
            className={nameEmptyError ? 'input error' : 'input'}
            placeholder="First LastName"
            onChange={(e) => setName(e.target.value)}
          />
          {nameEmptyError && <p className="error-message">This field is required!</p>}
        </div>
        <button>Submit &nbsp;&rarr;</button>
      </form>
    </div>
  );
}

export default Register;
