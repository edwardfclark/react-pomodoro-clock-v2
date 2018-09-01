import React from 'react';

function SessionButtons(props) {
    return (
        <div>
            <h3 id="session-label">Session Length</h3>
            <h4><span id="session-decrement" onClick={props.decSession}>-</span> <span id="session-length">{props.sessionLength}</span> <span id="session-increment" onClick={props.incSession}>+</span></h4>
        </div>
    );
}

export default SessionButtons