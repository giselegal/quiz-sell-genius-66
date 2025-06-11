
import { useState, useEffect } from 'react';

interface TimerState {
  hours: number;
  minutes: number;
  seconds: number;
}

export const useTimer = (initialHours = 2, initialMinutes = 59, initialSeconds = 59) => {
  const [timer, setTimer] = useState<TimerState>({
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds,
  });

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer.seconds > 0) {
          return { ...prevTimer, seconds: prevTimer.seconds - 1 };
        } else if (prevTimer.minutes > 0) {
          return { ...prevTimer, minutes: prevTimer.minutes - 1, seconds: 59 };
        } else if (prevTimer.hours > 0) {
          return { hours: prevTimer.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: initialHours, minutes: initialMinutes, seconds: initialSeconds };
        }
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [initialHours, initialMinutes, initialSeconds]);

  return timer;
};
