import React, { useState } from "react";
import CreatePoll from "./CreatePoll";
import "./SidebarNavbar.css";
import Footer from "./Footer";

export default function SidebarNavbar({ user, isAnonymous, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCreatePoll, setShowCreatePoll] = useState(false);

  return (
    <>
      {/* Hamburger */}
      <div
        className={`hamburger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Sidebar */}
      <nav className={`sidebar ${isOpen ? "show" : ""}`}>
        {/* Welcome Message */}
        {user && (
          <div className="welcome">
            Welcome, {isAnonymous ? "Guest" : user.displayName || "User"}!
          </div>
        )}

        {/* ✅ Show CreatePoll button only for signed-in (non-anonymous) users */}
        {!isAnonymous && user && (
          <>
            {!showCreatePoll ? (
              <button
                className="nav-btn"
                onClick={() => setShowCreatePoll(true)}
              >
                Create a Poll
              </button>
            ) : (
              <div className="create-poll-section">
                <CreatePoll onClose={() => setShowCreatePoll(false)} />
              </div>
            )}
          </>
        )}

        {/* Logout */}
        {user && (
          <button className="nav-btn" onClick={handleLogout}>
            Log Out
          </button>
        )}

        <Footer />
      </nav>
    </>
  );
}
