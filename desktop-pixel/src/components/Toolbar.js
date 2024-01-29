import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExpand, // - Resize Canvas
  faPalette, // - Change Color
  faEraser, // - Eraser
  faUndo, // - Undo
  faRedo, // - Redo
  faTrash, // - Clear Canvas
  faImage, // - Export as PNG
} from '@fortawesome/free-solid-svg-icons';

const Toolbar = ({
  onResize,
  onColorSelect,
  onErase,
  onUndo,
  onRedo,
  onReset,
  onExport,
  erasing,
}) => {

  const eraserActiveClass = erasing ? "toolbar-button tb-active" : "toolbar-button";
  return (
    <div className="toolbar">
      <button className="toolbar-button" id="resize-canvas" onClick={onResize}>
        <FontAwesomeIcon icon={faExpand} />
      </button>
      <button className="toolbar-button" id="change-color" onClick={onColorSelect}>
        <FontAwesomeIcon icon={faPalette} />
      </button>
      <button className={eraserActiveClass} id="eraser" onClick={onErase}>
        <FontAwesomeIcon icon={faEraser} />
      </button>
      <button className="toolbar-button" id="undo" onClick={onUndo}>
        <FontAwesomeIcon icon={faUndo} />
      </button>
      <button className="toolbar-button" id="redo" onClick={onRedo}>
        <FontAwesomeIcon icon={faRedo} />
      </button>
      <button className="toolbar-button" id="clear-canvas" onClick={onReset}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <button className="toolbar-button" id="export-png" onClick={onExport}>
        <FontAwesomeIcon icon={faImage} />
      </button>
    </div>
  );
};

export default Toolbar;
