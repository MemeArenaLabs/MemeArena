"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SvgIcon from "@/utils/SvgIcon";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { truncateSolanaAddress } from "@/utils/utilFunctions";

type WalletState = {
  connected: boolean;
  address: string;
};

export default function Landing() {
  const router = useRouter();
  const { setVisible: setModalVisible } = useWalletModal();
  const { disconnect, connect, connected, publicKey } = useWallet();

  function handleConnectWallet(): void {
    setModalVisible(true);
  }

  function handleDisconnectWallet(): void {
    disconnect();
  }

  function handleLaunchApp(): void {
    if (connected) {
      router.push("/app/gladiators");
    }
  }

  return (
    <main className="relative h-[430px] w-[932px] bg-blue-900 overflow-hidden">
      <Image
        src="/assets/landing/bg.jpg"
        layout="fill"
        objectFit="cover"
        alt="Gladiator BG"
        className="opacity-50"
      />
      <div className="relative z-10 h-full flex flex-col">
        <div className="px-2 py-2 pt-4 flex flex-col gap-2">
          <Image
            src="/assets/landing/logo.svg"
            width={200}
            height={48}
            objectFit="contain"
            alt="Gladiators Logo"
          />
        </div>
        <div className="flex-grow flex items-center px-2">
          <div className="w-3/5">
            <h2 className="text-5xl font-bold text-white mb-4 leading-[50px]">
              FIGHT WITH YOUR
              <br />
              FAVORITE <br />
              <span className="text-yellow">MEMECOINS</span>
            </h2>
            <p className="w-3/4 font-medium mb-8 text-white">
              Face off in battles by choosing your best memes
              <br /> and <span className="text-yellow">win</span> your
              opponent's tokens!
            </p>
          </div>
          <div className="absolute right-8 bottom-12 w-[455px] h-[342px]">
            <Image
              src="/assets/landing/gladiators.png"
              layout="fill"
              objectFit="contain"
              alt="Gladiator characters"
            />
          </div>
        </div>
        <div className="flex justify-between px-2 py-2">
          <button
            onClick={connected ? handleDisconnectWallet : handleConnectWallet}
            className={`${connected ? "bg-dark-blue text-white " : "bg-yellow text-black"} font-bold py-2 px-4 w-full flex items-center gap-2 justify-center clip-path-polygon-left pr-[30px] mr-[-35px]`}
          >
            {publicKey ? (
              <>
                {truncateSolanaAddress(publicKey)}
                <SvgIcon name="exit" className="text-dark h-5 w-5" />
              </>
            ) : (
              <>
                <SvgIcon name="wallet" className="text-dark h-5 w-5" />
                CONNECT WALLET
              </>
            )}
          </button>
          <button
            onClick={handleLaunchApp}
            className="bg-yellow text-black disabled:bg-[#868686] disabled:text-[#555555] font-bold py-2 px-4 w-full flex items-center gap-2 justify-center clip-path-polygon-right pl-[30px] ml-[-35px]"
            disabled={!connected}
          >
            <SvgIcon name="play" className="text-dark h-5 w-5" /> LAUNCH APP
          </button>
        </div>
      </div>
    </main>
  );
}
