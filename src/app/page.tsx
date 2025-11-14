"use client";

import { useState } from "react";

export default function Home() {
  const [isPressed, setIsPressed] = useState(false);
  const [datetime, setDatetime] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // send empty body
      });
      const result = await res.json();
      // Optionally handle result (e.g., show a message)
      console.log(result);

      // Display datetime for 1 second
      if (result.datetime) {
        setDatetime(result.datetime);
        setTimeout(() => {
          setDatetime(null);
        }, 1000);
      }
    } catch (err) {
      console.error("Failed to send notification", err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        gap: "20px",
      }}
    >
      <button
        onClick={handleClick}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        onTouchCancel={() => setIsPressed(false)}
        style={{
          minWidth: "200px",
          minHeight: "200px",
          fontSize: "2rem",
          fontWeight: "bold",
          cursor: "pointer",
          borderRadius: "24px",
          backgroundImage: "url(/crush.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: isPressed ? "scale(0.9)" : "scale(1)",
          boxShadow: isPressed
            ? "inset 0 8px 16px rgba(0, 0, 0, 0.4)"
            : "0 4px 8px rgba(0, 0, 0, 0.2)",
          transition: "all 0.1s ease",
          filter: isPressed ? "brightness(0.8)" : "brightness(1)",
          color: "#fff",
        }}
      >
        duuude
      </button>
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#333",
          minHeight: "2.25rem",
          display: "flex",
          alignItems: "center",
          fontFamily: "sans-serif",
        }}
      >
        {datetime || ""}
      </div>
    </div>
  );
}
