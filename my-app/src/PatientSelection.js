import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PatientSelectionPage = () => {
  const navigate = useNavigate();

  // State to store input values
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [checkupDate, setCheckupDate] = useState("");

  // State to store saved details for UI display
  const [savedDetails, setSavedDetails] = useState(null);

  // Handle Save Action: Sends a POST request to your backend to save data in MongoDB
  const handleSave = async () => {
    if (patientName && age && checkupDate) {
      const patientData = { patientName, age, checkupDate };

      try {
        const response = await fetch("http://localhost:3000/add-patient", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patientData),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("✅ Saved to MongoDB:", result);
          setSavedDetails(patientData);

          // Clear form fields after saving
          setPatientName("");
          setAge("");
          setCheckupDate("");

          alert("✅ Patient saved successfully!");
        } else {
          console.error("❌ Failed to save to database");
          alert("❌ Failed to save patient. Please try again.");
        }
      } catch (error) {
        console.error("❌ Error while sending data:", error);
        alert("❌ Server error. Please try again.");
      }
    } else {
      alert("⚠ Please fill in all the fields before saving.");
    }
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container">
      {/* Navigation Buttons */}
      <div className="top-nav">
        <input type="text" placeholder="Search" className="search-input" />
        <button className="search-btn">
          <FaSearch />
        </button>
        <button className="nav-btn" onClick={goToDashboard}>
          Dashboard
        </button>
        <button className="nav-btn">History</button>
        <button className="nav-btn">Settings</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h2 className="title">Patient Selection Page</h2>

        {/* Patient Name */}
        <div className="input-group">
          <label>Patient Name</label>
          <input
            type="text"
            className="input-field"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
        </div>

        {/* Age */}
        <div className="input-group">
          <label>Age</label>
          <input
            type="number"
            className="input-field"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        {/* Last Check-up Date */}
        <div className="input-group">
          <label>Last Check-up Date</label>
          <input
            type="date"
            className="input-field"
            value={checkupDate}
            onChange={(e) => setCheckupDate(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button className="save-btn" onClick={handleSave}>
            Save Details
          </button>
          <button className="dashboard-btn" onClick={goToDashboard}>
            View Dashboard
          </button>
        </div>

        {/* Display Saved Details */}
        {savedDetails && (
          <div className="saved-details">
            <h3>Saved Patient Details:</h3>
            <p>
              <strong>Name:</strong> {savedDetails.patientName}
            </p>
            <p>
              <strong>Age:</strong> {savedDetails.age}
            </p>
            <p>
              <strong>Last Check-up:</strong> {savedDetails.checkupDate}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientSelectionPage;