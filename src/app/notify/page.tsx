"use client";

import { useEffect, useState } from "react";

export default function Notify() {
  const [lastNotification, setLastNotification] = useState<Date | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  const handleEnable = async () => {
    // Play a silent sound to get permission
    const audio = new Audio("/beep.mp3");
    audio.volume = 0;
    try {
      await audio.play();
      setIsEnabled(true);
    } catch (err) {
      console.error("Failed to enable audio", err);
    }
  };

  useEffect(() => {
    if (!isEnabled) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/read");
        const { datetime } = await res.json();
        console.log("Poll result:", datetime);

        const currentDateTime = new Date(datetime);

        if (lastNotification === null) {
          setLastNotification(currentDateTime);
        } else if (currentDateTime > lastNotification) {
          const audio = new Audio("/crush.mp3");
          audio.volume = 0.5;
          audio
            .play()
            .catch((err) => console.error("Failed to play sound", err));
          setLastNotification(currentDateTime);
        }
      } catch (err) {
        console.error("Failed to poll /api/read", err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastNotification, isEnabled]);

  if (!isEnabled) {
    return (
      <div>
        <button onClick={handleEnable}>Enable Notifications</button>
      </div>
    );
  }

  return <div>Notifications enabled - listening...</div>;
}
