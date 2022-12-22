import React, { useState } from 'react';
import './SignUp.css';

function SignUp({ id, trigger, setTrigger }) {
    const [type, setType] = useState('doubles');
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const [player3, setPlayer3] = useState('');
    const [player4, setPlayer4] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        let court = { id, type, player1, player2, player3, player4 };

        const response = await fetch('http://localhost:8000/courts/' + id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(court)
        });
        
        window.location.reload();
    }

    return (trigger) ? (
        <div className="Sign-Up">
            <div onClick={() => setTrigger()} className="overlay"></div>
            <div className="pop-up">
                <h2>{ id }</h2>
                <form onSubmit={handleSubmit}>
                    <label>Type:</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="doubles">Doubles</option>
                        <option value="singles">Singles</option>
                    </select> 

                    {type === 'doubles' && (
                    <div>
                        <label>Player 1:</label>
                        <input 
                            type="text" 
                            value={player1}
                            onChange={(e) => setPlayer1(e.target.value)}
                        />
                        <label>Player 2:</label>
                        <input 
                            type="text" 
                            value={player2}
                            onChange={(e) => setPlayer2(e.target.value)}
                        />
                        <label>Player 3:</label>
                        <input 
                            type="text" 
                            value={player3}
                            onChange={(e) => setPlayer3(e.target.value)}
                        />
                        <label>Player 4:</label>
                        <input 
                            type="text" 
                            value={player4}
                            onChange={(e) => setPlayer4(e.target.value)}
                        />
                    </div>
                    )}

                    {type === 'singles' && (
                        <div>
                            <label>Player 1:</label>
                            <input 
                                type="text" 
                                value={player1}
                                onChange={(e) => setPlayer1(e.target.value)}
                            />
                            <label>Player 2:</label>
                            <input 
                                type="text" 
                                value={player2}
                                onChange={(e) => setPlayer2(e.target.value)}
                            />
                        </div>
                    )}

                    <button>Sign Up</button>
                </form>
                <button className="close" onClick={() => setTrigger()}>
                    x
                </button>
            </div>
        </div>
    ) : "";
}

export default SignUp;
