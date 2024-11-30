import React from "react";

function ControlButton({ commandHandler, command, img, text }) {
    const handleStart = () => {
        commandHandler(command);
    }

    const handleEnd = () => {
        commandHandler(null);
    }

    return (
        <div className='control-button'>
            <img src={img} className='control-button-background' onMouseDown={handleStart} onMouseUp={handleEnd} onTouchStart={handleStart} onTouchUp={handleEnd}/>
            <div className='control-button-text'>{command}</div>
        </div>
    )
}

export default ControlButton;