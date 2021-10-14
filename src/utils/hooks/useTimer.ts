// https://dev.to/emmaadesile/build-a-timer-using-react-hooks-3he2

import { useState, useRef } from 'react';

type IUseTimer = (initialState?: number) => {
  timer: number;
  isActive: boolean;
  isPaused: boolean;
  handleStart: () => void;
  handlePause: () => void;
  handleResume: () => void;
  handleReset: () => void;
};

export const useTimer: IUseTimer = (initialState = 0) => {
  const [timer, setTimer] = useState(initialState);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };

  return { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset };
};
