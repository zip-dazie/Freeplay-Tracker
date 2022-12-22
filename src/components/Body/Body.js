import React, { useState, useEffect } from "react";
import SignUp from '../SignUp/SignUp.js'
import CourtList from "../CourtList/CourtList.js";
import './Body.css';

let time = [
    '6:00 pm - 6:15 pm',
    '6:15 pm - 6:30 pm',
    '6:30 pm - 6:45 pm',
    '6:45 pm - 7:00 pm',
    '7:00 pm - 7:15 pm',
    '7:15 pm - 7:30 pm',
    '7:30 pm - 7:45 pm',
    '7:45 pm - 8:00 pm',
    '8:00 pm - 8:15 pm',
    '8:15 pm - 8:30 pm',
    '8:30 pm - 8:45 pm',
    '8:45 pm - 9:00 pm',
]

function Body() {
    const [signUpState, setSignUpState] = useState({ signUp: false, court: ' ' });
    const signUp = signUpState.signUp;
    const court = signUpState.court;
    const [courts, setCourts] = useState([]);

    function togglePopUp() {
        setSignUpState(prevState => {
            return { ...prevState, signUp: !signUp }
        });
    };

    function toggleCourtSignUp(id) {
        setSignUpState(() => {
            return { signUp: !signUp, court: id }
        });
    };

    useEffect(() => {
        console.log('ran use effect');
        fetch('http://localhost:8000/courts')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setCourts(data);
            })
    }, []);

    return (
        <div className="Body">
            <div className="column times">
                <p className="label">Time</p>
                <div className="time-slots">
                    {time.map(i => {
                        return (
                            <p key={i}>{i}</p>
                        );
                    })}
                </div>
            </div>
            
            {courts && <CourtList courts={courts.slice(0, 12)} title="Court 1" signUp={toggleCourtSignUp} /> }
            {courts && <CourtList courts={courts.slice(12, 24)} title="Court 1" signUp={toggleCourtSignUp} /> }
            {courts && <CourtList courts={courts.slice(24, 36)} title="Court 1" signUp={toggleCourtSignUp} /> }


            <SignUp courtID={court} trigger={signUp} setTrigger={togglePopUp} />
        </div>
    );
}

export default Body;
