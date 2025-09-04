import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup, signInAnonymously } from "firebase/auth";
import Footer from "../components/Footer";

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Google sign-in error:", err);
      alert("Failed to sign in with Google. Check console for details.");
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      const result = await signInAnonymously(auth);
      if (result.user) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Anonymous sign-in error:", err);
      alert("Failed to sign in anonymously. Check console for details.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="poll-title primary-font">Would You Rather?</h2>
        <p className="login-description">
          Craving answers to life’s silliest questions, like pineapple or
          ketchup on pizza? With Would You Rather? (by JF), you can create
          unlimited polls, vote on others, and see where the crowd stands. It’s
          fast, fun, and totally anonymous, so don’t hold back!
        </p>

        <h2 className="login-title">Welcome! Please log in to continue.</h2>

        <div className="login-buttons">
          <button className="btn google-btn" onClick={handleGoogleLogin}>
            Sign in with Google
          </button>
          <button className="btn anon-btn" onClick={handleAnonymousLogin}>
            Sign in Anonymously
          </button>
        </div>
        <p className="signin-desc tertiary-font">
          Sign in with your Google Account to start creating your own polls.
          Voting is always open to everyone!
        </p>
      </div>
      <Footer />
    </div>
  );
}
