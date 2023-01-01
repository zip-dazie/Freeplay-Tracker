import { useState } from 'react';
import './HowItWorks.css';

function HowItWorks() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    alert('how it work form was submitted');
  };

  return (
    <div className="HowItWorks">
      <form className="form" onSubmit={handleSubmit}>
        <div className="name-layer">
          <h2>How it works</h2>
          <button>Try it out! &nbsp;&rarr;</button>
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

export default HowItWorks;
