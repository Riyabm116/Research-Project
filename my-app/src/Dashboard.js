import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState("");
  const [patientData, setPatientData] = useState(null);

  // Labels for the charts
  const timeLabels = ["1min", "2min", "3min", "4min", "5min"];

  const handleSearch = async () => {
    try {
      const response = await fetch(
        "http://localhost:3002/get-patient-by-name?name=" + encodeURIComponent(patientName)
      );
      if (!response.ok) {
        alert("Patient not found");
        setPatientData(null);
        return;
      }
      const data = await response.json();
      console.log("Fetched Data:", data);
      setPatientData(data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
      alert("Failed to fetch patient data");
    }
  };

  // Data for the charts
  const oxygenData = {
    labels: timeLabels,
    datasets: [
      {
        label: "Oxygen Saturation",
        data: patientData?.vitals?.oxygenLevels || [90, 92, 91, 89, 95],
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const bloodPressureData = {
    labels: timeLabels,
    datasets: [
      {
        label: "Blood Pressure (mmHg)",
        data: patientData?.vitals?.bloodPressure || [120, 130, 125, 118, 122],
        backgroundColor: "gray",
      },
    ],
  };

  const heartRateData = {
    labels: timeLabels,
    datasets: [
      {
        label: "Heart Rate (BPM)",
        data: patientData?.vitals?.heartRate || [75, 78, 80, 74, 76],
        borderColor: "purple",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  // Log patient data after it updates
  useEffect(() => {
    if (patientData) {
      console.log("Updated Patient Data:", patientData);
    }
  }, [patientData]);

  return (
    <div className="dashboard-container">
      <div className="top-nav">
        <input
          type="text"
          placeholder="Search"
          className="search-box"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearch}>
          🔍
        </button>
        <button className="nav-btn">History</button>
        <button className="nav-btn">Settings</button>
      </div>

      {patientData ? (
        <div className="graphs-container">
          <div className="graph-box">
            <h3>Oxygen Saturation</h3>
            <Line data={oxygenData} key={JSON.stringify(oxygenData)} />
          </div>
          <div className="graph-box">
            <h3>Blood Pressure</h3>
            <Bar data={bloodPressureData} key={JSON.stringify(bloodPressureData)} />
          </div>
          <div className="graph-box">
            <h3>Heart Rate</h3>
            <Line data={heartRateData} key={JSON.stringify(heartRateData)} />
          </div>
        </div>
      ) : (
        <div className="no-data-message">
          <h2>No Patient Data Found</h2>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
