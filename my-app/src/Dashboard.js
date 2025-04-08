import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";  // For navigation after search

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState("");
  const [patientData, setPatientData] = useState(null);

  const timeLabels = ["1min", "2min", "3min", "4min", "5min"];

  const oxygenData = {
    labels: timeLabels,
    datasets: [{ label: "Oxygen Saturation", data: patientData?.oxygenLevels || [90, 92, 91, 89, 95], borderColor: "blue", borderWidth: 2, fill: false }],
  };

  const bloodPressureData = {
    labels: timeLabels,
    datasets: [{ label: "Blood Pressure (mmHg)", data: patientData?.bloodPressure || [120, 130, 125, 118, 122], backgroundColor: "gray" }],
  };

  const heartRateData = {
    labels: timeLabels,
    datasets: [{ label: "Heart Rate (BPM)", data: patientData?.heartRate || [75, 78, 80, 74, 76], borderColor: "purple", borderWidth: 2, fill: false }],
  };

  const handleSearch = async () => {
    try {
        const response = await fetch(`http://localhost:3001/get-patient-by-name?name=${patientName}`);
        const data = await response.json();

      if (response.ok) {
        setPatientData(data); // Set patient data from the backend response
      } else {
        alert("Patient not found");
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
      alert("Failed to fetch patient data");
    }
  };

  useEffect(() => {
    if (patientData) {
      // Navigate to a detailed dashboard view if needed
      navigate("/dashboard", { state: { patientData } });
    }
  }, [patientData, navigate]);

  return (
    <div className="dashboard-container">
      <div className="top-nav">
        <div className="patient-info">
          <label className="patient-label">Patient Name: </label>
          <input
            type="text"
            className="patient-name-input"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
        </div>
        <input type="text" placeholder="Search" className="search-box" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
        <button className="search-btn" onClick={handleSearch}>🔍</button>
      </div>

      {patientData && (
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
      )}
    </div>
  );
}

export default Dashboard;
