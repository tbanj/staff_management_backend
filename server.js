const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserRoute = require('./routes/UserRoute');
const StaffRoute = require('./routes/StaffRoute');
const port = process.env.PORT || 6004; 
const app = express();
const env = require('./env');
const path = require('path');
// Connect to MongoDB
mongoose
  .connect(env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('✌🏾 Successfully connected to MongoDB');
  })
  .catch(err => {
    console.log('An error occured while conencting to MongoDB', err);
  });

app.use(cors());

// Add middlewares for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + './uploads')))

app.use(express.json());

app.use('/user', UserRoute);
app.use('/staff', StaffRoute)
app.listen(port).on('listening', () => {
  console.log('We are live on ' + port);
});