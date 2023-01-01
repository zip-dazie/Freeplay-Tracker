import { useState } from 'react';
import './SignUp.css';

function SignUp() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    alert('sign up form was submitted');
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
          onChange={(e) => setPhoneNumber(e.target.value)}
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
