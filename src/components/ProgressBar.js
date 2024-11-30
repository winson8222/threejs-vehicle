import React, { useState, useRef } from "react"
import Draggable from "react-draggable"


function ProgressBar({history, progressHandler}) {

    const button = useRef()
    const progressBarRef = useRef()

    const handleDrag = (e, data) => {
        if (!progressBarRef.current || history.length === 0) return;
        const buttonWidth = button.current.offsetWidth;
        const progressBarWidth = progressBarRef.current.offsetWidth;
    
        const offsetX = Math.min(Math.max(data.x, 0), progressBarWidth - buttonWidth);
        const index = Math.floor((offsetX / (progressBarWidth - buttonWidth)) * (history.length));
    
        progressHandler(index);
      };
    



    return (
        <div className='progress-bar' ref={progressBarRef}>
        <Draggable bounds="parent" onDrag={handleDrag}>
            <div
            ref={button}
            style={{position: "absolute", height: "100%"}}>
                Drag me
            </div>
        </Draggable>
    </div>
    )
    
}

export default ProgressBar