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
  const [erasing, setErasing] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [colorSelecting, setColorSelecting] = useState(false);
  const [color, setColor] = useState('#FF0000');

  const [canvasStateStack, setCanvasStateStack] = useState([]);
  const [currentStateIndex, setCurrentStateIndex] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.fillStyle = 'rgba(0, 0, 0, 0)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    setCanvasStateStack([
      Array.from({ length: height }, () =>
        Array.from({ length: width }, () => 'rgba(0, 0, 0, 0)'),
      ),
    ]);

    setCurrentStateIndex(0);
  }, [height, width]);

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const cellSize = canvas.width / width;

    const newState = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => 'rgba(0, 0, 0, 0)'),
    );

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const x = col * cellSize;
        const y = row * cellSize;
        const imageData = context.getImageData(x, y, cellSize, cellSize).data;

        const color = `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, ${imageData[3]})`;
        newState[row][col] = color;
      }
    }

    setCanvasStateStack((prevStack) => [
      ...prevStack.slice(0, currentStateIndex + 1),
      newState,
    ]);
    setCurrentStateIndex((prevIndex) => Math.min(prevIndex + 1, 9));
  };

  const restoreCanvasState = (state) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const cellSize = canvas.width / width;

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < state.length; row++) {
      for (let col = 0; col < state[row].length; col++) {
        const color = state[row][col];
        context.fillStyle = color;
        context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  };

  const handleUndo = () => {
    if (currentStateIndex > 0) {
      const newIndex = currentStateIndex - 1;
      setCurrentStateIndex(newIndex);
      restoreCanvasState(canvasStateStack[newIndex]);
    }
  };

  const handleRedo = () => {
    if (currentStateIndex < canvasStateStack.length - 1) {
      const newIndex = currentStateIndex + 1;
      setCurrentStateIndex(newIndex);
      restoreCanvasState(canvasStateStack[newIndex]);
    }
  };

  const handleReset = () => {
    console.log('reset');
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.fillStyle = 'rgba(0, 0, 0, 0)';
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleResize = () => {
    setResizing(!resizing);

    if (colorSelecting) {
      setColorSelecting(false);
    }
  };

  const handleErase = () => {
    setErasing(!erasing);
  };

  const handleResizeSubmit = (newWidth, newHeight) => {
    setResizing(false);
    setWidth(newWidth);
    setHeight(newHeight);

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
    saveCanvasState();
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

    if (erasing) {
      context.clearRect(col * cellSize, row * cellSize, cellSize, cellSize);
    } else {
      context.fillStyle = color;
      context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    }
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

    exportComponentAsPNG(canvasRef, {
      fileName,
      html2CanvasOptions: { backgroundColor: null },
    });
  };

  return (
    <div id="editor">
      <Toolbar
        onResize={handleResize}
        onColorSelect={handleColorSelect}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onReset={handleReset}
        onExport={handleSaveImage}
        onErase={handleErase}
        erasing={erasing}
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

      <div className="canvas-container">
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
