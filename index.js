const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require("./routes/routes");

const app = express();
dotenv.config();


app.use(express.json());
app.use(cors());



// Connect to database
const db = process.env.MONGODB_URL;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected successfully to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));



app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});


app.use("/api/users", userRoutes);

