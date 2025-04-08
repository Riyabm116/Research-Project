const http = require("http");
const { MongoClient, ObjectId } = require("mongodb");
const url = require("url"); // Add this to handle URL parsing
const cors = require("cors"); // Import the CORS package

// MongoDB URI
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

// Database and Collection
const dbName = "admin";
const collectionName = "patients";

// Create Server
const server = http.createServer(async (req, res) => {
  // Enable CORS for all requests
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (you can restrict this to only allow your React app's origin)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specific methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow the content type header

  // Handle POST request to add a new patient
  if (req.method === "POST" && req.url === "/add-patient") {
    let body = "";

    // Read incoming data
    req.on("data", (chunk) => {
      body += chunk;
    });

    // Once data is fully received
    req.on("end", async () => {
      try {
        const patientData = JSON.parse(body);

        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        await collection.insertOne(patientData);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "✅ Patient saved successfully" }));
      } catch (err) {
        console.error("❌ Error saving patient:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server Error");
      } finally {
        await client.close(); // Close connection after every request
      }
    });
  }
  // Handle GET request to retrieve patient details by name
  else if (req.method === "GET" && req.url.startsWith("/get-patient-by-name")) {
    const parsedUrl = url.parse(req.url, true);
    const patientName = parsedUrl.query.name; // Get the patient name from the query parameters
    
    
    if (!patientName) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Patient name is required");
      return;
    }

    // Trim and clean up the name parameter
    patientName = patientName.trim(); // Remove any unwanted spaces or newlines

    console.log("Looking for patient with name:", patientName); // Debugging log


    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      // Retrieve the patient details using the provided name
      const patient = await collection.findOne({ name: patientName });

      if (patient) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(patient));
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Patient not found");
      }
    } catch (error) {
      console.error("❌ Error retrieving patient:", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server error");
    } finally {
      await client.close(); // Close connection after every request
    }
  }
  // Handle undefined routes
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// Run Server on port 3001
server.listen(3001, () => {
  console.log("🚀 Backend server running at http://localhost:3001");
});
