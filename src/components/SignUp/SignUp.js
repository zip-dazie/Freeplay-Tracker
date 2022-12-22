import React, { useState } from 'react';
import './SignUp.css';

function SignUp({ courtID, trigger, setTrigger }) {
    const [player, setPlayer] = useState('');
    const [type, setType] = useState('doubles');
    const [other, setOther] = useState('');
    const [other1, setOther1] = useState('');
    const [other2, setOther2] = useState('');
    const [other3, setOther3] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        let court = {type, player};

        // fetch('http://localhost:8000/courts', {
        //     method: 'PUT',
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(court)
        // })
    }

    return (trigger) ? (
        <div className="Sign-Up">
            <div onClick={() => setTrigger()} className="overlay"></div>
            <div className="pop-up">
                <h2>{ courtID }</h2>
                <form onSubmit={handleSubmit}>
                    <label>Player:</label>
                    <input 
                        type="text" 
                        required
                        value={player}
                        onChange={(e) => setPlayer(e.target.value)}
                    />
                    
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
                        <label>Other 1:</label>
                        <input 
                            type="text" 
                            value={other1}
                            onChange={(e) => setOther1(e.target.value)}
                        />
                        <label>Other 2:</label>
                        <input 
                            type="text" 
                            value={other2}
                            onChange={(e) => setOther2(e.target.value)}
                        />
                        <label>Other 3:</label>
                        <input 
                            type="text" 
                            value={other3}
                            onChange={(e) => setOther3(e.target.value)}
                        />
                    </div>
                    )}

                    {type === 'singles' && (
                        <div>
                            <label>Other:</label>
                            <input 
                                type="text" 
                                value={other}
                                onChange={(e) => setOther(e.target.value)}
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
