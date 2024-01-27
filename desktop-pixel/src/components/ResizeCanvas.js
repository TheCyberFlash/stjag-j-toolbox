import React, { useState } from "react";

const ResizeCanvas = ({ onCancel, onSubmit }) => {
    const [newWidth, setNewWidth] = useState("");
    const [newHeight, setNewHeight] = useState("");

    const handleResizeSubmit = (e) => {
        e.preventDefault();
        onSubmit(newWidth, newHeight);
    };

    const handleResizeCancel = () => {
        onCancel();
    };

    return (
        <div className="resize-canvas-container">
            <label>
                W
                <input 
                    type="number" 
                    value={newWidth}
                    onChange={(event) => setNewWidth(event.target.value)}
                />
            </label>

            <label>
                H
                <input 
                    type="number" 
                    value={newHeight}
                    onChange={(event) => setNewHeight(event.target.value)}
                />
            </label>
            <button onClick={handleResizeSubmit} className="emoji-button">✅</button>
            <button onClick={handleResizeCancel} className="emoji-button">❌</button>    
        </div>
    )
};

export default ResizeCanvas;