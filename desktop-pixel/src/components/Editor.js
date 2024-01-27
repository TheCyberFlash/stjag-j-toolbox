import React, { useState } from 'react';
import PixelArtCanvas from './PixelArtCanvas';

const Editor = () => {
  return (
    <div id="editor">
      <h1>Js Toolbox - Pixel Canvas</h1>
      <PixelArtCanvas />
    </div>
  );
};

export default Editor;
