import React, { useState } from "react";
import SignUp from '../SignUp/SignUp.js'
import './Body.css';

let slots = [
    'Slot1', 
    'Slot2', 
    'Slot3', 
    'Slot4', 
    'Slot5', 
    'Slot6', 
    'Slot7', 
    'Slot8', 
    'Slot9', 
    'Slot10', 
    'Slot11', 
    'Slot12',
]

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

    return (
        <div className="Body">
            <div className="column times">
                <p className="label">Time</p>
                <div className="time-slots">
                    {time.map(i => {
                        return (
                            <p>{i}</p>
                        );
                    })}
                </div>
            </div>
            <div className="column">
                <p className="label">Court 1</p>
                <div className="courts">
                    {slots.map(i => {
                        return (
                            <button id={i} className="slots" onClick={(event) => toggleCourtSignUp('Court1' + event.target.id)}  />
                        );
                    })}
                </div>
            </div>
            <div className="column">
                <p className="label">Court 2</p>
                <div className="courts">
                    {slots.map(i => {
                        return (
                            <button id={i} className="slots" onClick={(event) => toggleCourtSignUp('Court2' + event.target.id)}  />
                        );
                    })}
                </div>
            </div>
            <div className="column">
                <p className="label">Court 3</p>
                <div className="courts">
                    {slots.map(i => {
                        return (
                            <button id={i} className="slots" onClick={(event) => toggleCourtSignUp('Court3' + event.target.id)}  />
                        );
                    })}
                </div>
            </div>

            <SignUp trigger={signUp} setTrigger={togglePopUp}>
                <p>{court}</p>
            </SignUp>
        </div>
    );
}

export default Body;
