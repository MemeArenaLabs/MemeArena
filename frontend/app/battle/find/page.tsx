"use client";
import React, { useEffect, useState } from "react";
import { formatTime } from "@/utils/utils";
import { ProgressActivity } from "@nine-thirty-five/material-symbols-react/outlined";
import { useWebSocket } from "@/context/WebSocketProvider";
import { useBattle } from "@/context/BattleProvider";
import { getUserData } from "@/utils/api-service";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import { FindOpponentDto, JoinedResponseDto } from "@/types/server-types";

export default function FindBattle() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [time, setTime] = useState<number>(0);
  const [isFinding, setIsFinding] = useState<boolean>(false);
  const { isConnected, lastMessage, findOpponent } = useWebSocket();
  const {
    setInitialUserData,
    setUserData,
    setOpponentData,
    initialUserData,
    setBattleSessionId,
  } = useBattle();
  const router = useRouter();


  useEffect(() => { 
    if (walletAddress) {
      const call = async () => {
        const data = await getUserData(walletAddress);
        console.log(data);
        setInitialUserData(data);
      };
      call();
    }
  }, [walletAddress]);

  useEffect(() => {
    if (lastMessage?.event === "JOINED") {
      const data: JoinedResponseDto = lastMessage?.data;
      setBattleSessionId(data?.battleSessionId);
      setUserData(data?.userData);
      setOpponentData(data?.opponentData);
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
    if (initialUserData) {
      const findOpponentDto: FindOpponentDto = {
        userId: initialUserData.id,
        userMemeIds: initialUserData.userMemes.map((meme) => meme.userMemeId),
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
    <main className="flex flex-col gap-8 items-center">
      <h2>Find a Battle</h2>
      <p>Web socket: {isConnected ? "Connected" : "Disconnected"}</p>
      <section className="layout gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="walletAddress">Set wallet Address:</label>
          <input
            id="walletAddress"
            type="text"
            value={walletAddress}
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
          disabled={!walletAddress || !isConnected || !initialUserData}
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
