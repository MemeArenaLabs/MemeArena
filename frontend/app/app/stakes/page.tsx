import React from "react";
import { BottomMenu } from "@/components/gui/BottomMenu";
import ProfilePanel from "@/components/ProfilePanel";
import { StakeForm } from "@/components/StakeForm";

export default function Stakes() {
  return (
    <main className="flex flex-col justify-between bg-gray-900 text-white bg-cover bg-center h-[430px] w-[932px] bg-[url('/assets/backgrounds/main-bg.png')]">
      <div className="p-2">
        <ProfilePanel />
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="w-[491px] flex justify-center">
          <StakeForm />
        </div>
      </div>
      <BottomMenu />
    </main>
  );
}
