"use client";
import React from "react";
import { ReactSVG } from "react-svg";

interface IconProps {
  name: string;
  className: string;
}

const SvgIcon: React.FC<IconProps> = ({ name, className }) => {
  return (
    <div className={`inline-block ${className || ""}`}>
      <ReactSVG
        src={`/icons/${name}.svg`}
        beforeInjection={(svg) => {
          svg.setAttribute("width", "100%");
          svg.setAttribute("height", "100%");
          svg.setAttribute("fill", "currentColor");
        }}
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
