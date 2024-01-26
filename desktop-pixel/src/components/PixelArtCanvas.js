import React, { useState, useRef, useEffect } from "react";
import { exportComponentAsPNG } from "react-component-export-image";
import Toolbar from "./Toolbar";

const PixelArtCanvas = ({ height, width, color }) => {
    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState(false);
    const [canvasStateStack, setCanvasStateStack] = useState([]);
    const [currentCanvasState, setCurrentCanvasState] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        saveCanvasState();
    }, [height, width]);

    const saveCanvasState = () => {
        const canvas = canvasRef.current;
        const snapshot = canvas.toDataURL("image/png");
        setCanvasStateStack((prevStack) => [...prevStack, snapshot]);
        setCurrentCanvasState(snapshot);
    };

    const restoreCanvasState = (state) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const img = new Image();

        img.src = state;
        img.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0);
        };
    };

    const handleUndo = () => {
        if (canvasStateStack.length > 1) {
            const prevState = canvasStateStack.slice(0, -1);
            setCanvasStateStack(prevState);
            restoreCanvasState(prevState[prevState.length - 1]);
        }
    };

    const handleRedo = () => {
        if (currentCanvasState && canvasStateStack.length > 1) {
            const nextState = canvasStateStack.slice(1);
            setCanvasStateStack([currentCanvasState, ...nextState]);
            restoreCanvasState(nextState[0]);
        }
    };

    const handleReset = () => {
        if (currentCanvasState && canvasStateStack.length > 1) {
            const nextState = canvasStateStack.slice(1);
            setCanvasStateStack([currentCanvasState, ...nextState]);
            restoreCanvasState(nextState[0]);
        }
    };

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
            <Toolbar
                onUndo={handleUndo}
                onRedo={handleRedo}
                onReset={handleReset}
                onExport={handleSaveImage}
            />

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
        </div>
    );
};

export default PixelArtCanvas;
