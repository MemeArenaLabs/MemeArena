"use client";

import React from "react";

type ButtonProps = {
  onClick?: React.DOMAttributes<HTMLButtonElement>["onClick"];
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  isLoading?: boolean;
  icon?: React.ReactNode;
};

export function Button({
  onClick,
  className: styles,
  disabled = false,
  children,
  isLoading = false,
  icon,
}: ButtonProps) {
  return (
    <button
      className={`btn flex relative cursor-pointer justify-center transition-all ease-out disabled:cursor-not-allowed ${styles}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      <div
        className={`${isLoading ? "invisible" : "visible"} flex gap-2 items-center`}
      >
        {icon && icon} {children}
      </div>
      <span
        className={`loading loading-spinner absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${isLoading ? "block" : "hidden"}`}
      />
    </button>
  );
}
