import React from "react";
import Pixel from "./Pixel";

const Row = (props) => {
    const { width, color } = props;
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