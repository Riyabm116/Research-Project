import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // Initially hidden
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const dummyEmail = "user@example.com";
    const dummyPassword = "password123";

    if (email === dummyEmail && pass === dummyPassword) {
      if (rememberMe) {
        localStorage.setItem("email", email);
      }
      navigate("/patient-selection");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your registered email.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    alert("Your password has been reset successfully! Please log in.");
    setShowForgotPassword(false);
    setShowLogin(true);
  };

  return (
    <div className="app-container">
      {/* Pass the login toggle function to Header */}
      <Header onLoginClick={() => setShowLogin(true)} />

      {/* LOGIN FORM */}
      {showLogin && !showForgotPassword && (
        <div className="form-container">
          <form className="login-form" onSubmit={handleLogin}>
            <h2>Login</h2>

            <div className="input-group">
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                type="password"
                required
              />
            </div>

            {error && <p className="error">{error}</p>}

            <div className="remember-forgot">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember Me
              </label>
              <button
                type="button"
                className="forgot-password"
                onClick={() => {
                  setShowLogin(false);
                  setShowForgotPassword(true);
                }}
              >
                Forgot Password?
              </button>
            </div>

            <button type="submit">Login</button>
          </form>
        </div>
      )}

      {/* FORGOT PASSWORD FORM */}
      {showForgotPassword && (
        <div className="form-container">
          <form className="forgot-password-form" onSubmit={handleForgotPassword}>
            <h2>Reset Password</h2>

            <div className="input-group">
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </div>

            <div className="input-group">
              <label>New Password</label>
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                required
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                required
              />
            </div>

            {error && <p className="error">{error}</p>}

            <button type="submit">Reset Password</button>

            <button
              type="button"
              className="back-to-login"
              onClick={() => {
                setShowForgotPassword(false);
                setShowLogin(true);
              }}
            >
              Back to Login
            </button>
          </form>
        </div>
      )}

      <Footer />
    </div>
  );
};
