import React from 'react';

function SessionButtons(props) {
    return (
        <div>
            <h3>Session</h3>
            <h4><span onClick={props.decSession}>-</span> {props.sessionLength} <span onClick={props.incSession}>+</span></h4>
        </div>
    );
}

export default SessionButtons