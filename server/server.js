const express = require('express');
const app = express();
const passport = require('passport');
const userRoute = require('./routes/user')
const itemsRoute = require('./routes/items')
const passRoute = require('./routes/fbRoute')

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
app.use(express.urlencoded({ extended: false }))

// initializing passport
app.use(passport.initialize());
require('./config/passport')(passport);


// Routes
app.use('/user' , userRoute)
app.use('/items' , itemsRoute)
app.use('/passport', passRoute); //passport js facebook route

//! listen app with port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
