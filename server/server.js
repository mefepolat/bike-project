const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');
const session = require('express-session');
const LocalStrategy = require('passport-local');

app.use(express.json());

const dbUrl = 'mongodb://localhost:27017/bike-rental';
mongoose.set('strictQuery', false);
mongoose.connect(dbUrl,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('database connection')
});