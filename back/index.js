

const express = require("express");

const cors = require("cors");


const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require("./src/routes/index");
routes(app);

const port = process.env.SERVER_PORT || 3002;
const db = require('./src/config/db.connect');
db.connect();

app.listen(port, () => {
    console.log(`Server start at http://localhost:${port}`);
})


//test
module.exports = app;