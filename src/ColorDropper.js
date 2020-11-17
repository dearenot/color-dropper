import React, { useCallback, useState } from "react";
import dropperStyle from "./dropper.css";

const PIXEL_SIZE = 4;

function hexFrom(arr) {
  const result = [];
  for (let i = 0; i < arr.length - PIXEL_SIZE + 1; i += PIXEL_SIZE) {
    result.push(`rgba(${arr[i]},${arr[i + 1]},${arr[i + 2]},${arr[i + 3]})`);
  }

  return result;
}

const ColorPad = ({ color }) => {
  return <div className={dropperStyle.colorPad}>{color}</div>;
};

const ColorDropper = ({ imageData, position }) => {
  const rgbColor = hexFrom(imageData);

  const [hoveredColor, setHoveredColor] = useState(null);

  const handleHover = useCallback((e) => {
    const color = e.target.dataset.color;
    // setHoveredColor(color);
  }, []);
  console.log("rend");
  const { x, y } = position;

  return (
    <div
      id="circle_wrapper"
      className={dropperStyle.circleWrapper}
      style={{ top: y, left: x }}
    >
      <ColorPad color={hoveredColor} />
      <div id="colored_circle" className={dropperStyle.coloredCircle}>
        <div className={dropperStyle.pixelsWrapper}>
          <div
            className={dropperStyle.dropperWrapper}
            onMouseOver={handleHover}
          >
            {rgbColor.map((color, i) => (
              <div
                data-color={color}
                className={dropperStyle.dropperPixelContainer}
                key={`${color}_${i}`}
                style={{
                  backgroundColor: color,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorDropper;
