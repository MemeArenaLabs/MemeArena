import React from "react";
import BattleArena from "../../components/battleLayout/BattleArena";
import TopBarGUI from "@/components/battleLayout/TopBarGUI";
import BottomBarGUI from "@/components/battleLayout/BottomBarGUI";

const BattleInterface: React.FC = () => {
  return (
    <main className="relative flex items-center justify-center bg-cover bg-center h-[430px] w-[932px] bg-[url('/assets/battle-layout/bg/flame-bg.png')]">
      <div className="absolute top-0 w-full p-1">
        <TopBarGUI />
      </div>
      <BattleArena />
      <div className="absolute bottom-0 w-full p-1">
        <BottomBarGUI />
      </div>
    </main>
  );
};

export default BattleInterface;