const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const path = require('path');

require('dotenv').config();
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.use(cookieParser());
app.set('layout', 'layout');
app.set('view engine', 'ejs');

//Routes
app.use('/', require('./routes/frontend'));

app.use('/admin', (req, res, next) => {
    res.locals.layout = 'admin/layout';
    next();
});

app.use('/admin', require('./routes/backend'));

mongoose.connect(process.env.MONGODB_URI);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});


