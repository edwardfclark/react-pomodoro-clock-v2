import React from 'react';

function BreakButtons(props) {
    return (
        <div>
            <h3 id="break-label">Break Length:</h3>
            <h4><span id="break-decrement" onClick={() => props.alterLength("break", -1)}>-</span> <span id="break-length">{props.breakLength}</span> <span id="break-increment" onClick={() => props.alterLength("break", 1)}>+</span></h4>
        </div>
    );
}

export default BreakButtons