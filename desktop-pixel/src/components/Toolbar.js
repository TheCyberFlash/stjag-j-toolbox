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
  faFill, // - Fill
} from '@fortawesome/free-solid-svg-icons';

const Toolbar = ({
  onResize,
  onColorSelect,
  onErase,
  onUndo,
  onRedo,
  onFill,
  onReset,
  onExport,
  erasing,
}) => {
  const eraserActiveClass = erasing
    ? 'toolbar-button tb-active'
    : 'toolbar-button';
  return (
    <div className="toolbar">
      <button
        className="toolbar-button"
        id="resize-canvas"
        onClick={onResize}
        title="Resize Canvas">
        <FontAwesomeIcon icon={faExpand} />
      </button>
      <button
        className="toolbar-button"
        id="change-color"
        onClick={onColorSelect}
        title="Change Color">
        <FontAwesomeIcon icon={faPalette} />
      </button>
      <button
        className={eraserActiveClass}
        id="eraser"
        onClick={onErase}
        title="Eraser">
        <FontAwesomeIcon icon={faEraser} />
      </button>
      <button
        className="toolbar-button"
        id="undo"
        onClick={onUndo}
        title="Undo">
        <FontAwesomeIcon icon={faUndo} />
      </button>
      <button
        className="toolbar-button"
        id="redo"
        onClick={onRedo}
        title="Redo">
        <FontAwesomeIcon icon={faRedo} />
      </button>
      <button
        className="toolbar-button"
        id="fill"
        onClick={onFill}
        title="Fill">
        <FontAwesomeIcon icon={faFill} />
      </button>
      <button
        className="toolbar-button"
        id="clear-canvas"
        onClick={onReset}
        title="Clear Canvas">
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <button
        className="toolbar-button"
        id="export-png"
        onClick={onExport}
        title="Export as PNG">
        <FontAwesomeIcon icon={faImage} />
      </button>
    </div>
  );
};

export default Toolbar;
