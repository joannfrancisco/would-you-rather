import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import PollPage from "../components/PollPage";
import SidebarNavbar from "../components/SidebarNavbar";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsAnonymous(currentUser.isAnonymous);
      } else {
        setUser(null);
        setIsAnonymous(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!user && !loading) {
    return <PollPage />;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <SidebarNavbar
            user={user}
            isAnonymous={isAnonymous}
            handleLogout={handleLogout}
          />

          <div className="main-content" style={{ marginTop: "2rem" }}>
            {/* PollPage should always be visible */}
            <PollPage />
          </div>
        </>
      )}
    </div>
  );
}
