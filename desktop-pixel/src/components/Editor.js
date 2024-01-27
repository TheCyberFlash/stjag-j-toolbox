import React, {useState} from "react";
import { CirclePicker, PhotoshopPicker, SketchPicker } from "react-color";
import PixelArtCanvas from "./PixelArtCanvas";

const Editor = () => {
    const [height, setHeight] = useState(16);
    const [width, setWidth] = useState(16);
    const [color, setColor] = useState("#fff");
    const [colorSelect, setColorSelect] = useState("");

    const handleColorChange = (color) => {
        setColor(color.hex);
    }

    return (
        <div id="editor">
            <h1>Js Toolbox - Pixel Canvas</h1>  

            {colorSelect && (
                <CirclePicker color={color} onChangeComplete={handleColorChange}/>
                // <PhotoshopPicker color={color} onChangeComplete={handleColorChange}/>
                // <SketchPicker color={color} onChangeComplete={handleColorChange}/>
                )}
                
                <PixelArtCanvas height={height} width={width} color={color}/>            
            </div>
    )}

export default Editor;