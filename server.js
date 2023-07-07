// server.js
const passport=require('passport');
const flash=require('connect-flash')
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');
const centerRoutes = require('./app/routes/centerRoutes');
const bookingRoutes = require('./app/routes/bookingRoutes');
const authroutes=require('./app/routes/authRoutes');

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.set('views', path.join(__dirname, 'app/views'));
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    extname: '.handlebars',
  })
);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, '/public'), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
    }
  }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
      secret: 'ajay1234',
      resave: false,
      saveUninitialized: false,
    })
    );
    app.use('/',authroutes);
    app.use('/centers', centerRoutes);
    app.use('/booking', bookingRoutes);   
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 

