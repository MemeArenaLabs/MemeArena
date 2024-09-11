"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { Loader2 } from "lucide-react";

export default function MainApp() {
  const [isFinding, setIsFinding] = useState<boolean>(false);
  const [dots, setDots] = useState<string>("");
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let dotsInterval: NodeJS.Timeout;
    let timerInterval: NodeJS.Timeout;

    if (isFinding) {
      dotsInterval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500);

      timerInterval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      clearInterval(dotsInterval);
      clearInterval(timerInterval);
    };
  }, [isFinding]);

  const handleFindBattle = () => {
    setIsFinding(true);
    setTime(0);
  };

  const handleCloseModal = () => {
    setIsFinding(false);
    setTime(0);
    setDots("");
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <main>
      <section className="layout">
        <h2>MainApp</h2>
        <Button onClick={handleFindBattle}>Find battle</Button>

        <Modal
          isOpen={isFinding}
          onClose={handleCloseModal}
          title="Finding Battle"
        >
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg">{formatTime(time)}</p>
            <Loader2 className="animate-spin" />
          </div>
        </Modal>
      </section>
    </main>
  );
}
