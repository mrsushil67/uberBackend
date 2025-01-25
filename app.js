
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectTodb = require('./db/db');
const userRouter = require('./routes/user.routs');
const captainRouter = require('./routes/captain.routs') 

connectTodb();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/users', userRouter);
app.use('/captains', captainRouter);

module.exports = app;