import React, { useEffect, useRef, useState } from "react";
import img from "./autumn.jpg";
import ColorDropper from "./ColorDropper";

const CHUNK_SIZE = 8;

const App = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [canvasContext, setCanvasContext] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const { current } = canvasRef;
    const context = current.getContext("2d");
    setCanvas(current);
    setCanvasContext(context);

    const base_image = new Image();
    base_image.src = img;

    base_image.onload = function () {
      const { width, height } = base_image;
      current.width = width;
      current.height = height;
      context.drawImage(base_image, 0, 0);
    };
  }, []);

  const handleCanvasClick = (e) => {
    const rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    setImageData(canvasContext.getImageData(x, y, CHUNK_SIZE, CHUNK_SIZE).data);
    setPosition({ x, y });
  };

  return (
    <>
      <canvas onClick={handleCanvasClick} ref={canvasRef} id="app_canvas" />
      {imageData && <ColorDropper imageData={imageData} position={position} />}
    </>
  );
};

export default App;
