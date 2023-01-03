import { useEffect, useState } from 'react';
import './SignUp.css';
import { addStudent, checkNumber } from '../Users/Users';

function SignUp() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [phoneEmptyError, setPhoneEmptyError] = useState(false);
  const [nameEmptyError, setNameEmptyError] = useState(false);

  useEffect(() => {
    if (name != '') setNameEmptyError(false);
  }, [name]);

  useEffect(() => {
    if (phoneNumber != '') setPhoneEmptyError(false);
  }, [phoneNumber]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneError) return;

    if (phoneNumber === '' || phoneNumber.length != 10) {
      setPhoneEmptyError(true);
      return;
    }

    if (name === '') {
      setNameEmptyError(true);
      return;
    }

    addStudent(phoneNumber, name);
    window.location.href = '/';
  };

  const updatePhoneNumber = (e) => {
    if (!e.target.value.match('^[0-9]*$') || e.target.value.length > 10) {
      e.target.value = e.target.value.slice(0, -1);
    }

    setPhoneNumber(e.target.value);

    if (e.target.value.length == 10 && checkNumber(e.target.value)) setPhoneError(true);
    else setPhoneError(false);
  };

  return (
    <div className="SignUp">
      <form className="form" onSubmit={handleSubmit}>
        <div className="name-layer">
          <h2>Sign up</h2>
          <button>Sign up &nbsp;&rarr;</button>
        </div>
        <label className="label">Phone Number</label>
        <div>
          <input
            type="text"
            value={phoneNumber}
            className={phoneError || phoneEmptyError ? 'input error' : 'input'}
            placeholder="What is your phone number? e.g. 7463785928"
            onChange={(e) => updatePhoneNumber(e)}
          />
          {phoneError && <p className="error-message">This phone number has been taken!</p>}
          {phoneEmptyError && phoneNumber === '' && (
            <p className="error-message">This field is required!</p>
          )}
          {phoneEmptyError && phoneNumber != '' && (
            <p className="error-message">Phone number must be 10 digits long!</p>
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

export default SignUp;
