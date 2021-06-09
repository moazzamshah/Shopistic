const express = require('express');
const app = express();

// client connection
const cors = require('cors')
//! MongoDB and dotenv
require('dotenv').config()
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8000;

//! database name and url
const DB_URL = process.env.MongoDB_Link
mongoose.connect(DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log('MongoDB is successfully connected'))
    .catch(() => console.log('Database connection failed!'))


app.use(cors());

app.use(express.json())




//! listen app with port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})