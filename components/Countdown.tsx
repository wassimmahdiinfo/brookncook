"use client";

import { useEffect, useState } from "react";

export default function Countdown({ endDate }: { endDate: string }) {
  const calculateTimeLeft = () => {
    const difference = new Date(endDate).getTime() - new Date().getTime();

    if (difference <= 0) return null;

    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return null;

  return (
    <div className="bg-red-500 text-white p-4 rounded-xl text-center shadow-lg animate-pulse">
      <p className="text-sm mb-1">⏳ Offre limitée</p>
      <p className="text-xl font-bold">
        {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </p>
    </div>
  );
}