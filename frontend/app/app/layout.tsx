import NavBar from "@/components/NavBar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center w-full flex-grow">
      {children}
    </div>
  );
}
