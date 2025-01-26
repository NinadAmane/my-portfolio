const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors"); // Added for CORS support

const app = express();
const PORT = 5000;

// Middleware to parse JSON data and handle CORS
app.use(cors());
app.use(bodyParser.json());

// Route to handle contact form submission
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (name && email && message) {
    // Save data to a JSON file
    const data = { name, email, message, timestamp: new Date() };
    fs.appendFileSync("contact-messages.json", JSON.stringify(data) + "\n");

    res.status(200).send("Message received!");
  } else {
    res.status(400).send("Invalid data!");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
