// components/Timer.tsx
import React from 'react';

interface TimerProps {
  time: number;
}

const Timer: React.FC<TimerProps> = ({ time }) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-black bg-white opacity-75 p-2 rounded text-2xl font-bold animate-pulse">
      {formatTime(time)}
    </div>
  );
};

export default Timer;
