import NavBar from "@/components/NavBar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <NavBar />
      {children}
    </div>
  );
}
