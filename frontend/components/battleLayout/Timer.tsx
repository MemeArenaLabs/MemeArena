import { formatTime } from "@/utils/utilFunctions";
import React from "react";

interface TimerProps {
  time: number;
}

const Timer: React.FC<TimerProps> = ({ time }) => {
  return (
    <div className=" bg-[#05345A] bg-opacity-[44%] p-2 rounded text-2xl font-bold text-white">
      {formatTime(time)}
    </div>
  );
};

export default Timer;
