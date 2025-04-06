import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./Login";
import PatientSelectionPage from "./PatientSelection";
import Dashboard from "./Dashboard"; 

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Login Page at root ("/") */}
          <Route path="/" element={<Login />} />
          {/* Patient Selection Page at "/patient-selection" */}
          <Route path="/patient-selection" element={<PatientSelectionPage />} />
          {/* Dashboard Page at "/dashboard" */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
