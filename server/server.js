const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');
const ExpressError = require('./utils/ExpressError');
const session = require('express-session');
const LocalStrategy = require('passport-local');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const path = require('path');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const bikeRoutes = require('./routes/bike');
app.use(cors());

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');


const dbUrl = 'mongodb://127.0.0.1:27017/bike-rental';

app.use(bodyParser.json());
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
  });


const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret: 'justasecret'
  }
});

store.on('error', (err) => {
  console.log('session store error', err);
});

const sessionConfig = {
  store: store,
  name:'session',
  secret: 'justasecret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}

app.use(express.static(path.join(__dirname, '../client/public')));


app.use(express.urlencoded({extended: true}))
app.use(mongoSanitize());
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
  res.locals.currentUser = req.user;

  next();
});

app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', bikeRoutes);





app.get('*', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.all('*', (req,res,next) => {
  next(new ExpressError('Page Not Found', 404));
})

app.use((err,req,res,next) => {
  const {statusCode = 500} = err;
  if(!err.message) err.message = 'Something went wrong.'
  res.status(statusCode).send({error: err.message})
  
})

mongoose.set('strictQuery', false);
mongoose.connect(dbUrl,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('database connection');
});

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.log(__dirname);
});

