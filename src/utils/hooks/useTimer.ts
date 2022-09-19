// https://dev.to/emmaadesile/build-a-timer-using-react-hooks-3he2

import { useState, useRef } from 'react';

type IUseTimer = ({ delay, initTimer }: { delay?: number; initTimer?: number }) => {
  timer: number;
  isActive: boolean;
  isPaused: boolean;
  handleStart: () => void;
  handlePause: () => void;
  handleResume: () => void;
  handleReset: () => void;
};

export const useTimer: IUseTimer = ({ delay = 1000, initTimer = 0 }) => {
  const [timer, setTimer] = useState(initTimer);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, delay);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, delay);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };

  return { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset };
};
