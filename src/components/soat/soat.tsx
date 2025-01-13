"use client";

import { useState, useEffect } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 60,
    hours: 7,
    minutes: 11,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        clearInterval(timer);
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-0.5 sm:gap-1">
      <div className="bg-gray-100 rounded px-1.5 sm:px-2 py-0.5 sm:py-1 min-w-[2.2rem] sm:min-w-[3rem] text-center">
        <span className="text-sm sm:text-base lg:text-xl font-mono">
          {timeLeft.days.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-sm sm:text-base lg:text-xl">:</span>
      <div className="bg-gray-100 rounded px-1.5 sm:px-2 py-0.5 sm:py-1 min-w-[2.2rem] sm:min-w-[3rem] text-center">
        <span className="text-sm sm:text-base lg:text-xl font-mono">
          {timeLeft.hours.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-sm sm:text-base lg:text-xl">:</span>
      <div className="bg-gray-100 rounded px-1.5 sm:px-2 py-0.5 sm:py-1 min-w-[2.2rem] sm:min-w-[3rem] text-center">
        <span className="text-sm sm:text-base lg:text-xl font-mono">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-sm sm:text-base lg:text-xl">:</span>
      <div className="bg-gray-100 rounded px-1.5 sm:px-2 py-0.5 sm:py-1 min-w-[2.2rem] sm:min-w-[3rem] text-center">
        <span className="text-sm sm:text-base lg:text-xl font-mono">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
