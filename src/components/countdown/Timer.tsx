// components/CountdownTimer.tsx
import { userState } from '@/zustand/state';
import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  endTime: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endTime }) => {
  const {updateUserState} = userState()

  const calculateTimeLeft = (endTime: number) => {
    const now = new Date().getTime();
    const distance = endTime - now;

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return {
      hours,
      minutes,
      seconds,
      distance,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime));

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(endTime);
      if (newTimeLeft.distance <= 0) {
        clearInterval(timer);
      }
      setTimeLeft(newTimeLeft);
      newTimeLeft.seconds < 0 && updateUserState("claimable", true)
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div>
      <div>
        {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </div>
    </div>
  );
};

export const CountdownTimerFren: React.FC<CountdownTimerProps> = ({ endTime }) => {
  const {updateUserState} = userState()

  const calculateTimeLeft = (endTime: number) => {
    const now = new Date().getTime();
    const distance = endTime - now;

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return {
      hours,
      minutes,
      seconds,
      distance,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime));

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(endTime);
      if (newTimeLeft.distance <= 0) {
        clearInterval(timer);
      }
      setTimeLeft(newTimeLeft);
      newTimeLeft.seconds < 0 && updateUserState("claimableFren", true)
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div>
      <div>
        {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </div>
    </div>
  );
};


export const calculateSecondsDifference = (time1:number, time2:number) => {
  const differenceInMilliseconds = time1 - time2;
  const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
  return differenceInSeconds;
};

export default CountdownTimer;
