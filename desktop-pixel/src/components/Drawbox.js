import React from "react";
import Row from "./Row";

const Drawbox = (width, height, color) => {
    let rows = [];

    for (let i = 0; i < height; i++) {
        rows.push(<Row key={i} width={width} color={color}/>)
    }
    
    return (
        <div id="drawbox">
            <div id="pixels">
                {rows}
            </div>
        </div>
    )}

export default Drawbox;