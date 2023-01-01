import { useState } from 'react';
import './SignUp.css';
import { addStudent } from '../Users/Users';

function SignUp() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    alert('sign up form was submitted');
    addStudent(phoneNumber, name);
  };

  const checkPhoneNumber = (e) => {
    if (!e.target.value.match('^[0-9]*$') || e.target.value.length > 10) {
      e.target.value = e.target.value.slice(0, -1);
    }
    setPhoneNumber(e.target.value);
  };

  return (
    <div className="SignUp">
      <form className="form" onSubmit={handleSubmit}>
        <div className="name-layer">
          <h2>Sign up</h2>
          <button>Sign up &nbsp;&rarr;</button>
        </div>
        <label className="label">Phone Number</label>
        <input
          type="text"
          value={phoneNumber}
          placeholder="What is your phone number? e.g. 7463785928"
          onChange={(e) => checkPhoneNumber(e)}
        />
        <label className="label">Name</label>
        <input
          type="text"
          value={name}
          placeholder="What is your name?"
          onChange={(e) => setName(e.target.value)}
        />
      </form>
    </div>
  );
}

export default SignUp;
