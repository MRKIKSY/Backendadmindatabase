const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/routes");

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const db = process.env.MONGODB_URL;

app.use(express.json());
app.use(
  cors({
    origin: "http://mrkiksycrm.cloud", 
  })
);

// Connect to MongoDB
mongoose
  .connect(db, {
  })
  .then(() => console.log("Connected successfully to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});



// User routes
app.use("/api/users", userRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
