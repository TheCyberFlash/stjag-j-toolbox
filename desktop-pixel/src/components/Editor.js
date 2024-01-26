import React, {useState} from "react";
import { CirclePicker, PhotoshopPicker, SketchPicker } from "react-color";
import Drawbox from "./Drawbox";
import PixelArtCanvas from "./PixelArtCanvas";
import Toolbar from "./Toolbar";

const Editor = () => {
    const [height, setHeight] = useState(16);
    const [width, setWidth] = useState(16);
    const [hideOptions, setHideOptions] = useState(false);
    const [hideDrawbox, setHideDrawbox] = useState(true);
    const [buttonText, setButtonText] = useState("Start Drawbox");
    const [color, setColor] = useState("#fff");

    const handleButtonClick = () => {
        setHideOptions(!hideOptions);
        setHideDrawbox(!hideDrawbox);
        setButtonText(buttonText === "Start Drawbox" ? "Reset Drawbox" : "Start Drawbox");
    }

    const handleColorChange = (color) => {
        setColor(color.hex);
    }

    return (
        <div id="editor">
            <h1>Js Toolbox - Pixel Canvas</h1>  
            <Toolbar/>          

            {hideDrawbox && <h2>Choose Panel Dimensions</h2>}
            {hideDrawbox && 
            <div id="options">                
                <div className="option">
                    <input type="number" defaultValue={height} onChange={(e) => {setHeight(e.target.value)}}/>
                    <span>Height</span>
                </div>
                <div className="option">
                    <input type="number" defaultValue={width} onChange={(e) => {setWidth(e.target.value)}}/>
                    <span>Width</span>
                </div>
            </div>
            }

            <button className="button" onClick={handleButtonClick}>{buttonText}</button>

            {hideOptions &&
                <CirclePicker color={color} onChangeComplete={handleColorChange}/>
                // <PhotoshopPicker color={color} onChangeComplete={handleColorChange}/>
                // <SketchPicker color={color} onChangeComplete={handleColorChange}/>
            }

            {hideOptions && 
                <PixelArtCanvas height={height} width={width} color={color}/>
            }
            
            </div>
    )}

export default Editor;