import React from 'react';

function Joystick({ commandHandler }) {
    const handleStart = (command) => {
        commandHandler(command);
    };

    const handleEnd = () => {
        commandHandler(null);
    };

    return (
        <div className='joystick'>
            <img src="/button.png" className='joystick-background' alt="joystick background" />
            <button
                className="joystick-button top"
                onMouseDown={() => handleStart('rotateUp')}
                onMouseUp={handleEnd}
                onTouchStart={() => handleStart('rotateUp')}
                onTouchEnd={handleEnd}
            >
            </button>
            <button
                className="joystick-button left"
                onMouseDown={() => handleStart('rotateLeft')}
                onMouseUp={handleEnd}
                onTouchStart={() => handleStart('rotateLeft')}
                onTouchEnd={handleEnd}
            >
            </button>
            <button
                className="joystick-button right"
                onMouseDown={() => handleStart('rotateRight')}
                onMouseUp={handleEnd}
                onTouchStart={() => handleStart('rotateRight')}
                onTouchEnd={handleEnd}
            >
            </button>
            <button
                className="joystick-button bottom"
                onMouseDown={() => handleStart('rotateDown')}
                onMouseUp={handleEnd}
                onTouchStart={() => handleStart('rotateDown')}
                onTouchEnd={handleEnd}
            >
            </button>
        </div>
    );
}

export default Joystick;