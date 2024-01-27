import React, { useState } from 'react';
import PixelArtCanvas from './PixelArtCanvas';

const Editor = () => {
  const [height, setHeight] = useState(16);
  const [width, setWidth] = useState(16);

  return (
    <div id="editor">
      <h1>Js Toolbox - Pixel Canvas</h1>
      <PixelArtCanvas height={height} width={width} />
    </div>
  );
};

export default Editor;
