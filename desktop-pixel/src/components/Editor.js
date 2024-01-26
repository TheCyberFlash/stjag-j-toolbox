import React, {useState} from "react";
import { CirclePicker, PhotoshopPicker, SketchPicker } from "react-color";
import Drawbox from "./Drawbox";
import PixelArtCanvas from "./PixelArtCanvas";

const Editor = () => {
    const [height, setHeight] = useState(16);
    const [width, setWidth] = useState(16);
    const [hideOptions, setHideOptions] = useState(false);
    const [hideDrawbox, setHideDrawbox] = useState(true);
    const [buttonText, setButtonText] = useState("Start Drawbox");
    const [color, setColor] = useState("#fff");

    const handleColorChange = (color) => {
        setColor(color.hex);
    }

    return (
        <div id="editor">
            <h1>Js Toolbox - Pixel Canvas</h1>  
                <CirclePicker color={color} onChangeComplete={handleColorChange}/>
                {/* // <PhotoshopPicker color={color} onChangeComplete={handleColorChange}/>
                // <SketchPicker color={color} onChangeComplete={handleColorChange}/> */}

                <PixelArtCanvas height={height} width={width} color={color}/>            
            </div>
    )}

export default Editor;