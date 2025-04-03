const express = require('express');
const cors = require('cors');
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();


//Initialize express app
const app = express();

//Enable the CORS
app.use (cors());

//middleware for incoming json data 
app.use(express.json());

//server port
const PORT = process.env.PORT || 5000;


app.get("/", (req, res) => {
    res.send("NRFC - Your Closest Booking Site");
});

//
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use("/api/auth", authRoutes);




