// server.js
const http = require("http");
const { MongoClient } = require("mongodb");

// MongoDB URI
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

// Database and Collection
const dbName = "admin";
const collectionName = "patients";

// Create Server
const server = http.createServer(async (req, res) => {
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
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// Run Server on port 5000
server.listen(3000, () => {
  console.log("🚀 Backend server running at http://localhost:3000");
});