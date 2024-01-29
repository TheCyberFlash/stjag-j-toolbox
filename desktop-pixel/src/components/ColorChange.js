import React from 'react';
import { SketchPicker } from 'react-color';

const ColorChange = ({
  color,
  colorSelect,
  handleColorChange,
}) => {
  return (
    <div className="color-select">
      {colorSelect && (
        <SketchPicker color={color} onChangeComplete={handleColorChange} />
      )}
    </div>
  );
};

export default ColorChange;
