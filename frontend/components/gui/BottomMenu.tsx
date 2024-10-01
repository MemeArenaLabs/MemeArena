"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import SvgIcon from "@/utils/SvgIcon";

export function BottomMenu() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Gladiators", icon: "barbute", path: "/app/gladiators" },
    { name: "Teams", icon: "all-for-one", path: "/app/teams" },
    { name: "Stake", icon: "hand-money", path: "/app/stakes" },
  ];

  const isActive = (path: string) => pathname === path;

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="px-2 pb-2">
      <div className="flex">
        {menuItems.map((item, index) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`
              ${index === 0 ? "clip-path-polygon-left" : "clip-path-polygon-center"}
              min-w-[200px] h-[40px] font-bold py-2 flex uppercase ${index === 0 ? "pl-4" : "justify-center"} items-center mr-[-20px]
              ${isActive(item.path)
                ? "bg-dark-blue text-yellow"
                : "bg-dark-blue-50 text-white hover:bg-dark-blue group"
              }
            `}
          >
            <span className={`mr-2 ${isActive(item.path) ? "text-yellow" : "text-white group-hover:text-yellow transition-colors duration-200"}`}>
              <SvgIcon 
                name={item.icon} 
                className={`h-5 w-5 ${isActive(item.path) ? "text-yellow" : "group-hover:text-yellow transition-colors duration-200"}`} 
              />
            </span>
            <span className={`${isActive(item.path) ? "" : "group-hover:text-yellow transition-colors duration-200"}`}>
              {item.name}
            </span>
          </button>
        ))}
        <button
          onClick={() => navigate("/app/battle-preparation")}
          className="clip-path-buttom-bar-right w-full h-[40px] bg-yellow hover:bg-yellow-600 text-black flex justify-center hover:opacity-85 font-bold py-2 transition-colors duration-200"
        >
          <span className="mr-2">
            <SvgIcon name="crossed-swords" className="text-black h-5 w-5" />
          </span>
          FIGHT!
        </button>
      </div>
    </div>
  );
}