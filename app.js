console.log("app.js loaded");

// CPlanify - main app file (app.js)
//By- Tanishq Pratap Singh (200587638)

//making all the required imports
require('dotenv').config();
const express = require('express');

const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const methodOverride = require('method-override');

const session = require('express-session');
const flash = require('connect-flash');



// passport setup for authentication
const passport = require('passport');
require('./config/passport')(passport);





// connect to MongoDB using Mongoose
require('./config/db');

//Express
const app = express();

const homeRoutes = require('./routes/index');

const authRoutes = require('./routes/auth');

const eventRoutes = require('./routes/events');

// importing handlebars 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));

// reading form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// cookies
app.use(cookieParser());
app.use(methodOverride('_method'));

// public folder for css, js, images
app.use(express.static(path.join(__dirname, 'public')));


// session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'cplanify-secret-key',
    resave: false,
    saveUninitialized: false
  })
);

// flash messages
app.use(flash());

// passport initilization

app.use(passport.initialize());

app.use(passport.session());

// setting global variables for templates
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');

  next();
});

// using the routes
app.use('/', homeRoutes);
app.use('/auth', authRoutes);
app.use('/events', eventRoutes);

// 404 handler= , always at last 
app.use((req, res) => {
  res.status(404).render('error', { message: 'Page not found' });
});

// GLOBAL ERROR HANDLER also at last
app.use((err, req, res, next) => {
  res.status(err.status || 500).render('error', { message: err.message });
});

module.exports = app;
