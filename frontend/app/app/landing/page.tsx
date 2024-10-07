"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SvgIcon from '@/utils/SvgIcon';

const GladiatorsPage: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const router = useRouter();

  const connectWallet = () => {
    setWalletConnected(true);
    setWalletAddress('0x1234...5678');
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress('');
  };

  const handleLaunchApp = () => {
    if (walletConnected) {
      router.push('/app/gladiators');
    }
  };

  return (
    <div className="relative h-[430px] w-[932px] bg-blue-900 overflow-hidden">
      {/* Background image */}
      <Image
        src="/assets/landing/bg.jpg"
        layout="fill"
        objectFit="cover"
        alt="Gladiator BG"
        className="opacity-50"
      />
      <div className="relative z-10 h-full flex flex-col">
        {/* Logo */}
        <div className="px-2 py-2">
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
            <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
              FIGHT WITH YOUR<br />FAVORITE <span className="text-yellow">MEMECOINS</span>
            </h1>
            <p className="w-3/4 font-medium mb-8 text-white">
              Face off in battles by choosing your best memes and <span className="text-yellow">win</span> your opponent's tokens!
            </p>
          </div>
          {/* Gladiator characters */}
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
            onClick={walletConnected ? disconnectWallet : connectWallet}
            className={`${walletConnected ? 'bg-dark-blue text-white ' : 'bg-yellow text-black'} font-bold py-2 px-4 w-full flex items-center gap-2 justify-center clip-path-polygon-left pr-[30px] mr-[-35px]`}
          >
            {walletConnected ? (
              <>
                {walletAddress}
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
            disabled={!walletConnected}
          >
            <SvgIcon name="play" className="text-dark h-5 w-5" /> LAUNCH APP
          </button>
        </div>
      </div>
    </div>
  );
};

export default GladiatorsPage;