import { useEffect, useState } from 'react';
import './Register.css';
// eslint-disable-next-line no-unused-vars
import { addUser, fetchUsers } from '../Users/Users';
function Register() {
  const [ID, setID] = useState('');
  const [name, setName] = useState('');
  const [IdError, setIdError] = useState(false);
  const [IdEmptyError, setIdEmptyError] = useState(false);
  const [nameEmptyError, setNameEmptyError] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);
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
    if (data) {
      console.log('loaded');
    }
    addUser(ID, name);
  };

  const updateID = (e) => {
    const id = e.target.value;
    setID(id);
    if (id === '') {
      setIdEmptyError(true);
    }
    // check if UCINET is valid
    else if (!UCINETID.test(id)) {
      setIdError(true);
    } else {
      setIdError(false);
      setIdEmptyError(false);
    }
  };
  return (
    <div className="Register">
      <form className="form" onSubmit={handleSubmit}>
        <div className="name-layer">
          <h2>Register</h2>
          <button style={{ width: '30vh' }}>Submit &nbsp;&rarr;</button>
        </div>
        <label className="label">UCINETID</label>
        <div>
          <input
            type="text"
            value={ID}
            className={IdError || IdEmptyError ? 'input error' : 'input'}
            placeholder="UCINETID? e.g. weihc2@uci.edu"
            onChange={(e) => updateID(e)}
          />
          {IdEmptyError && ID === '' && <p className="error-message">This field is required!</p>}
          {IdEmptyError && ID !== '' && !UCINETID.test(ID) && (
            <p className="error-message">Must be valid UCINETID</p>
          )}
        </div>
        <label className="label">Name</label>
        <div>
          <input
            type="text"
            value={name}
            className={nameEmptyError ? 'input error' : 'input'}
            placeholder="What is your first and last name?"
            onChange={(e) => setName(e.target.value)}
          />
          {nameEmptyError && <p className="error-message">This field is required!</p>}
        </div>
      </form>
    </div>
  );
}

export default Register;
