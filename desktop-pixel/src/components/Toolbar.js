import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faExpand, // - Resize Canvas
    faPalette, // - Change Color
    faUndo, // - Undo
    faRedo, // - Redo
    faTrash, // - Clear Canvas
    faImage // - Export as PNG
} from "@fortawesome/free-solid-svg-icons";

const Toolbar = () => {

    return (
        <div className="toolbar">
            <button className="toolbar-button" id="resize-canvas">
                <FontAwesomeIcon icon={faExpand} />
            </button>
            <button className="toolbar-button" id="change-color">
                <FontAwesomeIcon icon={faPalette} />
            </button>
            <button className="toolbar-button" id="undo">
                <FontAwesomeIcon icon={faUndo} />
            </button>
            <button className="toolbar-button" id="redo">
                <FontAwesomeIcon icon={faRedo} />
            </button>
            <button className="toolbar-button" id="clear-canvas">
                <FontAwesomeIcon icon={faTrash} />
            </button>
            <button className="toolbar-button" id="export-png">
                <FontAwesomeIcon icon={faImage} />
            </button>
        </div>
    )
}

export default Toolbar;