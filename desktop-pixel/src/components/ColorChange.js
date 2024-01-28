import React from 'react';
import { CirclePicker, PhotoshopPicker, SketchPicker } from 'react-color';

const ColorChange = ({
  color,
  colorSelect,
  setColorSelect,
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
