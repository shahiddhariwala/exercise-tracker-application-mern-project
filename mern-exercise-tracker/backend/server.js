const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
//mongoose lets us connect with MongoDB database
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const excercisesRouter = require('./routes/excercises');
const usersRouter = require('./routes/users');

app.use('/exercises', excercisesRouter);
app.use('/users', usersRouter);


app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});