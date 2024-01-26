import React from "react";

const Toolbar = () => {

    return (
        <div className="toolbar">
            <button className="toolbar-button">Resize Canvas</button>
            <button className="toolbar-button">Change Color</button>
            <button className="toolbar-button">Undo</button>
            <button className="toolbar-button">Redo</button>
            <button className="toolbar-button">Clear Canvas</button>
            <button className="toolbar-button">Export as PNG</button>
        </div>
    )
}

export default Toolbar;