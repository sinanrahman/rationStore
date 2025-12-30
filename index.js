require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());


app.set('view engine', 'ejs');

// ROUTES
app.use('/', require('./routes/authRoute'));
app.use('/',require('./middleware/auth'), require('./routes/rationRoute'));
app.use('/',require('./middleware/auth'), require('./routes/memberRoute'));
app.use('/',require('./middleware/auth'), require('./routes/dealRoute'));


app.listen(port, async () => {
    console.log(`App started on ${port}`);
    await connectDB();
});
