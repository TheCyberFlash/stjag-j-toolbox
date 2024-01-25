import React, { useRef } from "react";
import Row from "./Row";
import { exportComponentAsPNG } from "react-component-export-image";

const Drawbox = (props) => {
    const { width, height, color } = props;
    const pixelRef = useRef();
    let rows = [];

    for (let i = 0; i < height; i++) {
        rows.push(<Row key={i} width={width} color={color}/>)
    }
    
    return (
        <div id="drawbox">
            <div id="pixels" ref={pixelRef}>
                {rows}
            </div>

            <button className="button" onClick={() => exportComponentAsPNG(pixelRef)}>Export as PNG</button>
        </div>
    )}

export default Drawbox;