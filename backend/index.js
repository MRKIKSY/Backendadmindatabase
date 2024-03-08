const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require("./routes/routes");
const port = process.env.PORT || 4000;

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


// Configure CORS
app.use(
  cors({
    origin: "http://mrkiksycrm.cloud",
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});


app.use("/api/users", userRoutes);


