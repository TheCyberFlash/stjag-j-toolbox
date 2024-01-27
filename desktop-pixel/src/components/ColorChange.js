import React from "react";
import { CirclePicker, PhotoshopPicker, SketchPicker } from "react-color";

const ColorChange = ({ color, colorSelect, setColorSelect, handleColorChange }) => {
    return (
        <div className="color-select">
            {colorSelect && (
                // <CirclePicker color={color} onChangeComplete={handleColorChange}/>
                // <PhotoshopPicker color={color} onChangeComplete={handleColorChange}/>
                <SketchPicker color={color} onChangeComplete={handleColorChange}/>
            )}
        </div>
    )
}

export default ColorChange;