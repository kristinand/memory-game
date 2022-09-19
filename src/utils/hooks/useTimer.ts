// https://dev.to/emmaadesile/build-a-timer-using-react-hooks-3he2

import { useState, useRef } from 'react';

type IUseTimer = ({ delay, initTimer }: { delay?: number; initTimer?: number }) => {
  timer: number;
  isPaused: boolean;
  handleStart: () => void;
  handlePause: () => void;
  handleReset: () => void;
};

export const useTimer: IUseTimer = ({ delay = 1000, initTimer = 0 }) => {
  const [timer, setTimer] = useState(initTimer);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);

  const handleStart = () => {
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, delay);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(true);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsPaused(false);
    setTimer(0);
  };

  return { timer, isPaused, handleStart, handlePause, handleReset };
};
