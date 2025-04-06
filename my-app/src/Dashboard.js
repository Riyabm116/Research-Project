import React, { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
  const [patientName, PatientName] = useState("John Doe"); // Editable patient name
  const timeLabels = ["1min", "2min", "3min", "4min", "5min"];

  // Graph Data
  const oxygenData = {
    labels: timeLabels,
    datasets: [{ label: "Oxygen Saturation", data: [90, 92, 91, 89, 95], borderColor: "blue", borderWidth: 2, fill: false }],
  };

  const bloodPressureData = {
    labels: timeLabels,
    datasets: [{ label: "Blood Pressure (mmHg)", data: [120, 130, 125, 118, 122], backgroundColor: "gray" }],
  };

  const heartRateData = {
    labels: timeLabels,
    datasets: [{ label: "Heart Rate (BPM)", data: [75, 78, 80, 74, 76], borderColor: "purple", borderWidth: 2, fill: false }],
  };

  return (
    <div className="dashboard-container">
        {/* Top Navigation Bar */}
      <div className="top-nav">
      <div className="patient-info">
        <label className="patient-label">Patient Name: </label>
        <input
          type="text"
          className="patient-name-input"
          value={patientName}
          onChange={(e) => PatientName(e.target.value)}
        />
      </div>
        <input type="text" placeholder="Search" className="search-box" />
        <button className="search-btn">🔍</button>
        <div className="nav-buttons">
          <button className="nav-btn">Dashboard</button>
          <button className="nav-btn">History</button>
          <button className="nav-btn">Settings</button>
        </div>
    </div>

      

      {/* Graphs Section */}
      <div className="graphs-container">
        <div className="graph-box">
          <h3>Oxygen Saturation</h3>
          <Line data={oxygenData} />
        </div>

        <div className="graph-box">
          <h3>Blood Pressure</h3>
          <Bar data={bloodPressureData} />
        </div>

        <div className="graph-box">
          <h3>Heart Rate</h3>
          <Line data={heartRateData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
