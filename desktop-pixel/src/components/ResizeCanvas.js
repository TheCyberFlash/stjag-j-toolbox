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
        <div>
            <label>
                Width:
                <input 
                    type="number" 
                    value={newWidth}
                    onChange={(event) => setNewWidth(event.target.value)}
                />
            </label>

            <label>
                Height:
                <input 
                    type="number" 
                    value={newHeight}
                    onChange={(event) => setNewHeight(event.target.value)}
                />
            </label>
            <button onClick={handleResizeSubmit}>Submit</button>
            <button onClick={handleResizeCancel}>Cancel</button>    
        </div>
    )
};

export default ResizeCanvas;