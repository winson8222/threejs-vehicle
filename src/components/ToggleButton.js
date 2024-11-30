import React, { useState } from "react";

function CameraButton({ commandHandler, img, text }) {
    const [isDefault, setDefault] = useState(true);

    const handleToggle = () => {
        setDefault(!isDefault);
        commandHandler();
    };

    return (
        <div className="control-button">
            <img
                src={img}
                className="control-button-background"
                onClick={handleToggle} 
            />
            <div className="control-button-text">
                {isDefault ? text[0] : text[1]}
            </div>
        </div>
    );
}

export default CameraButton;