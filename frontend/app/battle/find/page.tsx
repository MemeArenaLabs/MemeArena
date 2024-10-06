"use client";
import React, { useEffect, useState } from "react";
import { formatTime } from "@/utils/utilFunctions";
import { ProgressActivity } from "@nine-thirty-five/material-symbols-react/outlined";
import { useWebSocket } from "@/context/WebSocketProvider";
import { transformUserMeme, useBattle } from "@/context/BattleProvider";
import { getUserData } from "@/utils/api-service";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import { FindOpponentDto } from "@/types/serverDTOs";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import SolanaConnectButton from "@/components/SolanaConnectButton";

export default function FindBattle() {
  const [walletAddress, setWalletAddress] = useState<string | PublicKey>("");
  const [time, setTime] = useState<number>(0);
  const [isFinding, setIsFinding] = useState<boolean>(false);
  const { isConnected, lastMessage, findOpponent } = useWebSocket();
  const { setUserData, userData, userMemes, setUserMemes } = useBattle();
  const router = useRouter();
  const { publicKey } = useWallet();

  useEffect(() => {
    let addr: string | PublicKey = "";
    if (publicKey) {
      addr = publicKey;
      setWalletAddress(publicKey);
    }
    if (addr) {
      const call = async () => {
        const data = await getUserData(addr);
        setUserData({
          id: data.id,
          walletAddress: data.walletAddress,
          username: data.username,
        });
        setUserMemes(
          data.userMemes.map((memeDto) => transformUserMeme(memeDto))
        );
      };
      call();
    }
  }, [walletAddress, publicKey]);

  useEffect(() => {
    if (lastMessage?.event === "JOINED") {
      router.push("/battle/preparation");
      handleCloseModal();
    }
  }, [lastMessage]);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    if (isFinding) {
      timerInterval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timerInterval);
    };
  }, [isFinding]);

  const handleFindBattle = () => {
    setIsFinding(true);
    setTime(0);
    if (userData) {
      const findOpponentDto: FindOpponentDto = {
        userId: userData.id,
        userMemeIds: userMemes.map((meme) => meme.userMemeId),
      };
      findOpponent(findOpponentDto);
    } else {
      console.log("No userData");
    }
  };

  const handleCloseModal = () => {
    setIsFinding(false);
    setTime(0);
    // handle cancel find battle
  };

  return (
    <main className="flex flex-col gap-6 items-center">
      <h2>Find a Battle</h2>
      <p>Web socket: {isConnected ? "Connected" : "Disconnected"}</p>
      <section className="layout gap-4">
        <SolanaConnectButton />
        <p>Or</p>
        <div className="flex flex-col gap-2">
          <label htmlFor="walletAddress">Set wallet Address:</label>
          <input
            id="walletAddress"
            type="text"
            value={walletAddress.toString()}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="Enter your wallet address"
            className="p-2 border rounded-md w-96"
          />
        </div>
        <div>
          <p>Choose team to play with Component</p>
        </div>
        <Button
          onClick={handleFindBattle}
          disabled={!walletAddress || !isConnected || !userData}
        >
          Find battle
        </Button>
      </section>
      <Modal
        isOpen={isFinding}
        onClose={handleCloseModal}
        title="Finding Battle"
      >
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg">{formatTime(time)}</p>
          <ProgressActivity className="animate-spin" />
        </div>
      </Modal>
    </main>
  );
}
