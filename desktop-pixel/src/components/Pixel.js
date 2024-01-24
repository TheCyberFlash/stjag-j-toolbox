import React, { useState } from "react";

const Pixel = (color) => {

    const [pixelColor, setPixelColor] = useState(color);
    const [prevColor, setPrevColor] = useState(pixelColor);
    const [canChange, setCanChange] = useState(true);

    const applyColor = () => {
            setPixelColor(color);
            setCanChange(false);        
    }

    const resetColor = () => {
        if (canChange) {
            setPixelColor(prevColor);
        }

        setCanChange(true);
    }

    const handleMouseEnter = () => {
        setPrevColor(pixelColor);
        setPixelColor(color);
    }
    return (
        <div 
            className="pixel" 
            style={{ backgroundColor: pixelColor}} 
            onClick={applyColor} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={resetColor}>
        </div>
    )}

export default Pixel;