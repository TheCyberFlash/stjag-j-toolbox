import React from "react";
import Pixel from "./Pixel";

const Row = (width, color) => {

    let pixels = [];

    for (let i = 0; i < width; i++) {
        pixels.push(<Pixel key={i} color={color}/>)
    }
    return (
        <div className="row">
            {pixels}
        </div>
    )};

export default Row;