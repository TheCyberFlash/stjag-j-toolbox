import React, {useState} from "react";

const Editor = () => {
    const [height, setHeight] = useState(16);
    const [width, setWidth] = useState(16);
    const [hideOptions, setHideOptions] = useState(false);
    const [hideDrawbox, setHideDrawbox] = useState(true);
    const [buttonText, setButtonText] = useState("Start Drawbox");

    const handleButtonClick = () => {
        setHideOptions(!hideOptions);
        setHideDrawbox(!hideDrawbox);
        setButtonText(buttonText === "Start Drawbox" ? "Reset Drawbox" : "Start Drawbox");
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
        </div>
    )}

export default Editor;