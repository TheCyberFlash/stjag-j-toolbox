import React, { useState, useRef, useEffect } from "react";
import { exportComponentAsPNG } from "react-component-export-image";

const PixelArtCanvas = ({ height, width, color }) => {
    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }, [height, width]);

    const startDrawing = (event) => {
        setDrawing(true);
        draw(event);
    };

    const endDrawing = () => {
        setDrawing(false);
    };

    const draw = (event) => {
        if (!drawing) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const cellSize = canvas.width / width;

        const col = Math.floor(x / cellSize);
        const row = Math.floor(y / cellSize);

        context.fillStyle = color;
        context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    };

    const handleTouchStart = (event) => {
        startDrawing(event.touches[0]);
      };
    
      const handleTouchMove = (event) => {
        draw(event.touches[0]);
      };
    
      const handleTouchEnd = () => {
        endDrawing();
      };

    const handleSaveImage = () => {

        const today = new Date().toISOString().replace(/[-:.]/g, '');
        const fileName = `${today}JsTExport.png`;
      
        exportComponentAsPNG(canvasRef, { fileName });
      };
      

    return (
        <div>
            <div>
                <canvas
                ref={canvasRef}
                width={width * 20}
                height={height * 20}
                onMouseDown={startDrawing}
                onMouseUp={endDrawing}
                onMouseMove={draw}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                />
            </div>

            <div>
                <button className="button" onClick={handleSaveImage}>Save Image</button>
            </div>
        </div>
    );
};

export default PixelArtCanvas;
