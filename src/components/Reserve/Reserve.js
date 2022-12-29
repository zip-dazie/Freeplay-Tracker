import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Reserve.css';

function Reserve({ courtID, closeReserve }) {
  const [type, setType] = useState('doubles');
  const [players, setPlayers] = useState(Array(4).fill(''));
  const numPlayers = type === 'singles' ? 2 : 4;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let id = courtID;
    let court = { id, type, players };

    await fetch('http://localhost:8000/courts/' + courtID, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(court)
    });

    closeReserve();
  };

  useEffect(() => {
    if (!courtID) return;
    async function fetchData() {
      const response = await fetch('http://localhost:8000/courts/' + courtID);
      const data = await response.json();
      if (data.type != '') {
        setType(data.type);
        setPlayers(data.players);
      }
    }
    fetchData();
  }, [courtID]);

  useEffect(() => {
    setPlayers(Array(numPlayers).fill(''));
  }, [type]);

  const updatePlayers = (index) => (e) => {
    let newArr = [...players];
    newArr[index] = e.target.value;
    setPlayers(newArr);
  };

  return courtID ? (
    <div className="Reserve">
      <div onClick={() => closeReserve()} className="overlay"></div>
      <div className="pop-up">
        <h2>{courtID}</h2>
        <form onSubmit={handleSubmit}>
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="doubles">Doubles</option>
            <option value="singles">Singles</option>
          </select>
          <div>
            {players.map((value, index) => (
              <React.Fragment key={index}>
                <label>Player {index + 1}:</label>
                <input
                  type="text"
                  value={value}
                  placeholder="Player Name"
                  onChange={updatePlayers(index)}
                />
              </React.Fragment>
            ))}
          </div>
          <button>Reserve</button>
        </form>
        <button className="close" onClick={() => closeReserve()}>
          x
        </button>
      </div>
    </div>
  ) : (
    ''
  );
}

Reserve.propTypes = {
  courtID: PropTypes.string.isRequired,
  closeReserve: PropTypes.func.isRequired
};

export default Reserve;
