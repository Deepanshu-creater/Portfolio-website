require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const Enquirymodel = require('./schema');

const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());
const insert = async (req, res) => {
    try {
        let { name, email, message } = req.body;
        let enquirymodels = new Enquirymodel({
            name: name,
            email: email,
            message: message
        });

        await enquirymodels.save();
        res.status(201).json({ msg: "Saved successfully" });

        console.log({ name, email, message });
    } catch (err) {
        console.error("Error saving data:", err);
        res.status(500).json({ msg: "Error while capturing", error: err.message });
    }
};

// Proper use of POST route
app.post('/api/users', insert);

// Connect to MongoDB
mongoose.connect(process.env.DBURL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(8000, () => {
            console.log("Server is running on port 8000");
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
