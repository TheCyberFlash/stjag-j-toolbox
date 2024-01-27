import React, { useState, useRef, useEffect } from 'react';
import { exportComponentAsPNG } from 'react-component-export-image';
import Toolbar from './Toolbar';
import ResizeCanvas from './ResizeCanvas';
import ColorChange from './ColorChange';

const PixelArtCanvas = () => {
  const canvasRef = useRef(null);
  const [width, setWidth] = useState(16);
  const [height, setHeight] = useState(16);
  const [drawing, setDrawing] = useState(false);
  const [canvasStateStack, setCanvasStateStack] = useState([]);
  const [currentCanvasState, setCurrentCanvasState] = useState(null);
  const [resizing, setResizing] = useState(false);
  const [colorSelecting, setColorSelecting] = useState(false);
  const [color, setColor] = useState('#fff');

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    saveCanvasState();
  }, [height, width]);

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    const snapshot = canvas.toDataURL('image/png');
    setCanvasStateStack((prevStack) => [...prevStack, snapshot]);
    setCurrentCanvasState(snapshot);
  };

  const restoreCanvasState = (state) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
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
      restoreCanvasState(prevState[prevState.length - 2]);
    }
  };

  const handleRedo = () => {
    if (currentCanvasState && canvasStateStack.length > 1) {
      const nextState = canvasStateStack.slice(1);
      setCanvasStateStack([currentCanvasState, ...nextState]);
      restoreCanvasState(nextState[1]);
    }
  };

  const handleReset = () => {
    setCanvasStateStack([]);
    restoreCanvasState(canvasStateStack[0]);
  };

  const handleResize = () => {
    setResizing(!resizing);

    if (colorSelecting) {
      setColorSelecting(false);
    }
  };

  const handleResizeSubmit = (newWidth, newHeight) => {
    setResizing(false);

    const canvas = canvasRef.current;
    canvas.width = newWidth * 20;
    canvas.height = newHeight * 20;
    saveCanvasState();
  };

  const handleResizeCancel = () => {
    setResizing(false);
  };

  const handleColorSelect = () => {
    setColorSelecting(!colorSelecting);

    if (resizing) {
      setResizing(false);
    }
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
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
    const context = canvas.getContext('2d');

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
        onResize={handleResize}
        onColorSelect={handleColorSelect}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onReset={handleReset}
        onExport={handleSaveImage}
      />
      {resizing && (
        <ResizeCanvas
          onCancel={handleResizeCancel}
          onSubmit={handleResizeSubmit}
        />
      )}

      {colorSelecting && (
        <ColorChange
          color={color}
          colorSelect={colorSelecting}
          setColorSelect={setColorSelecting}
          handleColorChange={handleColorChange}
        />
      )}

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
