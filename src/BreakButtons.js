import React from 'react';

function BreakButtons(props) {
    return (
        <div>
            <h3>Break</h3>
            <h4><span onClick={props.decBreak}>-</span> {props.breakLength} <span onClick={props.incBreak}>+</span></h4>
        </div>
    );
}

export default BreakButtons