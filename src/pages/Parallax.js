import React from "react";
import "./parallax.css";

export default function Parallax() {
  return (
    <div className="bubbles-container">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            animationDuration: `${20 + Math.random() * 30}s`, // slower
            animationDelay: `${Math.random() * 20}s`,
          }}
        />
      ))}
    </div>
  );
}
