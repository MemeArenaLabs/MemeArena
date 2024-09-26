import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <div className="w-full flex  justify-center items-center">{children}</div>;
}
