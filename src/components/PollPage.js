import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "../App.css";

export default function PollPage() {
  const [polls, setPolls] = useState([]);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pollsPerPage = 15;

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // ✅ Order polls by createdAt descending
    const q = query(collection(db, "polls"), orderBy("createdAt", "desc"));
    const unsubscribePolls = onSnapshot(q, (snapshot) => {
      const pollData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPolls(pollData);
    });

    return () => {
      unsubscribeAuth();
      unsubscribePolls();
    };
  }, []);

  const handleVote = async (pollId, option) => {
    if (!user) {
      alert("You need to log in to vote.");
      return;
    }

    const poll = polls.find((p) => p.id === pollId);

    if (poll.votedBy?.includes(user.uid)) {
      alert("You already voted in this poll.");
      return;
    }

    try {
      const pollRef = doc(db, "polls", pollId);

      await updateDoc(pollRef, {
        [`options.${option}`]: poll.options[option] + 1,
        votedBy: [...(poll.votedBy || []), user.uid],
      });
    } catch (err) {
      console.error("Error voting: ", err);
      alert("Failed to submit vote.");
    }
  };

  // ✅ Pagination logic
  const indexOfLastPoll = currentPage * pollsPerPage;
  const indexOfFirstPoll = indexOfLastPoll - pollsPerPage;
  const currentPolls = polls.slice(indexOfFirstPoll, indexOfLastPoll);
  const totalPages = Math.ceil(polls.length / pollsPerPage);

  return (
    <div className="poll-container">
      <h2 className="poll-title primary-font">Would You Rather?</h2>
      {polls.length === 0 ? (
        <p className="no-polls">No polls available yet.</p>
      ) : (
        <>
          {currentPolls.map((poll) => {
            const userVoted = poll.votedBy?.includes(user?.uid);

            return (
              <div key={poll.id} className="poll-card">
                <div className="poll-options">
                  {Object.keys(poll.options).map((option, index) => (
                    <React.Fragment key={option}>
                      <button
                        onClick={() => handleVote(poll.id, option)}
                        disabled={userVoted}
                        className={`poll-button ${userVoted ? "disabled" : ""}`}
                      >
                        {option}
                        {userVoted && (
                          <span className="vote-count">
                            {poll.options[option]}{" "}
                            {poll.options[option] === 1 ? "VOTE" : "VOTES"}
                          </span>
                        )}
                      </button>

                      {index === 0 && (
                        <h2 className="or-text primary-font">or</h2>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}

          {/* ✅ Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination">
              {currentPage > 1 && (
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  ← Prev
                </button>
              )}

              <span className="page-number">
                Page {currentPage} of {totalPages}
              </span>

              {currentPage < totalPages && (
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next →
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
