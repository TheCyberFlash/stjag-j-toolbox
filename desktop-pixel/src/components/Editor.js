import React, {useState} from "react";
import { CirclePicker } from "react-color";

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
        <div>
            <h1>Editor</h1>            

            {hideDrawbox && 
            <div>
                <h2>Choose Panel Dimensions</h2>
                <div>
                    <input type="number" defaultValue={height} onChange={(e) => {setHeight(e.target.value)}}/>
                    <span>Height</span>
                </div>
                <div>
                    <input type="number" defaultValue={width} onChange={(e) => {setWidth(e.target.value)}}/>
                    <span>Width</span>
                </div>
            </div>
            }

            <button onClick={handleButtonClick}>{buttonText}</button>

            {hideOptions &&
                <CirclePicker color={color} onChangeComplete={(color) => {setColor(color.hex)}}/>
            }
            </div>
    )}

export default Editor;