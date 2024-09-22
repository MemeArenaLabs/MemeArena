import React from "react";
import { ReactSVG } from "react-svg";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

const SvgIcon: React.FC<IconProps> = ({ name, size = 24, className }) => {
  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`inline-block ${className || ""}`}
    >
      <ReactSVG
        src={`/icons/${name}.svg`}
        beforeInjection={(svg) => {
          svg.setAttribute("width", "100%");
          svg.setAttribute("height", "100%");
          svg.setAttribute("fill", "currentColor");
        }}
        wrapper="span"
        loading={() => (
          <span className="flex items-center justify-center w-full h-full bg-gray-200 animate-pulse"></span>
        )}
        fallback={() => (
          <span className="flex items-center justify-center w-full h-full bg-gray-200">
            ?
          </span>
        )}
      />
    </div>
  );
};

export default SvgIcon;
