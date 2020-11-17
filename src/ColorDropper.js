import React, { useCallback, useState } from "react";
import dropperStyle from "./dropper.css";
import { getRGBAfromImageData } from "./utils/imageDataToRGBA";
import { RGBToHex } from "./utils/rgbaToHex";

const ColorPad = ({ color }) => {
  return (
    <div className={dropperStyle.colorPad}>
      <span className={dropperStyle.colorTextWrapper}>
        {color && RGBToHex(color).toUpperCase()}
      </span>
    </div>
  );
};

const ColorPixels = ({ imageData, handleHover }) => {
  const rgbColor = getRGBAfromImageData(imageData);

  return (
    <div className={dropperStyle.pixelsWrapper}>
      <div className={dropperStyle.dropperWrapper} onMouseOver={handleHover}>
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
  );
};

const MemoizedColorPixels = React.memo(ColorPixels);

const ColorDropper = ({ imageData, position }) => {
  const [hoveredColor, setHoveredColor] = useState("");

  const handleHover = useCallback((e) => {
    const color = e.target.dataset.color;
    setHoveredColor(color);
  }, []);

  const { x, y } = position;

  return (
    <div
      id="circle_wrapper"
      className={dropperStyle.circleWrapper}
      style={{ top: y, left: x }}
    >
      <ColorPad color={hoveredColor} />
      <div
        id="colored_circle"
        className={dropperStyle.coloredCircle}
        style={{ backgroundColor: hoveredColor }}
      >
        <MemoizedColorPixels imageData={imageData} handleHover={handleHover} />
      </div>
    </div>
  );
};

export default ColorDropper;
