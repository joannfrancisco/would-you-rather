import { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function CreatePoll({ onClose }) {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const navigate = useNavigate();

  const handleCreatePoll = async (e) => {
    e.preventDefault();

    if (!optionOne || !optionTwo) {
      setFormMessage("⚠️ Please fill in both options.");
      setMessageType("error");
      return;
    }

    try {
      await addDoc(collection(db, "polls"), {
        options: {
          [optionOne]: 0,
          [optionTwo]: 0,
        },
        createdBy: auth.currentUser?.uid || "anonymous",
        createdAt: serverTimestamp(),
      });

      setFormMessage("✅ Poll created successfully!");
      setMessageType("success");
      setOptionOne("");
      setOptionTwo("");
      setTimeout(() => {
        onClose?.(); // close poll form after success
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Error adding poll: ", err);
      setFormMessage("❌ Failed to create poll.");
      setMessageType("error");
    }
  };

  return (
    <div className="create-poll-container">
      <h3 className="create-poll-title">Would You Rather?</h3>
      <form onSubmit={handleCreatePoll} className="create-poll-form">
        <div className="input-group">
          <input
            type="text"
            placeholder="Add Option 1"
            value={optionOne}
            onChange={(e) => setOptionOne(e.target.value)}
            className="poll-input"
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Add Option 2"
            value={optionTwo}
            onChange={(e) => setOptionTwo(e.target.value)}
            className="poll-input"
          />
        </div>
        <button type="submit" className="submit-btn">
          Create Poll
        </button>
        <button type="button" onClick={onClose} className="submit-btn">
          Cancel
        </button>

        {/* Inline message */}
        {formMessage && (
          <p
            className={`form-message ${
              messageType === "success" ? "success" : "error"
            }`}
          >
            {formMessage}
          </p>
        )}
      </form>
    </div>
  );
}
