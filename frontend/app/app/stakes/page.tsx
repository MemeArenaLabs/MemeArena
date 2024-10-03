import React from "react";
import { BottomMenu } from "@/components/gui/BottomMenu";
import ProfilePanel from "@/components/ProfilePanel";
import { StakeForm } from "@/components/StakeForm";

export const userAvailableTokens: { [key: string]: string } = {
  "DOG WIF HAT": "150,000,000.00",
  POPCAT: "100,000,000.00",
  BONK: "2,000,000.00",
  GIGACHAD: "750,000.00",
  PONKE: "1,000,000.00",
};

export const userStakedTokens: { [key: string]: string } = {
  "DOG WIF HAT": "132,235,253.00",
  POPCAT: "132,235,253.00",
  BONK: "2000.00",
  GIGACHAD: "0.00",
  PONKE: "0.00",
};

export const coinPrices: { [key: string]: number } = {
  "DOG WIF HAT": 2.32,
  POPCAT: 0.9051,
  BONK: 0.00002376,
  GIGACHAD: 0.084401,
  PONKE: 0.3403,
};

export default function Stakes() {
  return (
    <main className="flex flex-col justify-between bg-gray-900 text-white bg-cover bg-center h-[430px] w-[932px] bg-[url('/assets/team-selection/bg/bg.png')]">
      <ProfilePanel />
      <div className="w-full flex justify-center items-center">
        <div className="w-[491px] flex justify-center">
          <StakeForm
            userAvailableTokens={userAvailableTokens}
            userStakedTokens={userStakedTokens}
            coinPrices={coinPrices}
          />
        </div>
      </div>
      <BottomMenu />
    </main>
  );
}
