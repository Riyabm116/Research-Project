import React from "react";

const Header = ({ onLoginClick }) => {
  return (
    <header className="header">
      <div className="logo">🩺 Health App</div>
      <button className="login-btn" onClick={onLoginClick}>
        Login
      </button>
    </header>
  );
};

export default Header;
