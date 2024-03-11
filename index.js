const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// const userRoutes = require("./routes/routes");
const userRoutes = require("./controller/userController");

const PORT = process.env.PORT || 4000;
const app = express();
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://mrkiksycrm.cloud", 
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

// Connect to database
const db = process.env.MONGODB_URL;
mongoose
  .connect(db, {
  })
  .then(() => console.log("Connected successfully to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));


app.get('/', (req, res) => {
  res.send("hello world");
}) 
app.listen(PORT,
  () => {
  console.log(`Server Started at ${PORT}`);
});

app.use("/api/users", userRoutes);
