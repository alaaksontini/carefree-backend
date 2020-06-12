require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')
const utils = require('./utils')
const firebase = require('firebase')

var defaultProject = firebase.initializeApp(utils.loadFirebaseConfig())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

const port = process.env.APP_PORT || 8080;
const host = process.env.APP_HOST || '127.0.0.1';

const authRouter = require('./routes/auth')(firebase);
const doctorRouter = require('./routes/doctor')(firebase);
const appointmentRouter = require('./routes/appointments')(firebase);

app.use('/', authRouter);
app.use('/doctor', doctorRouter);
app.use('/appointments', appointmentRouter);

app.listen(port, host);

console.log(`Server listening at ${host}:${port}`);
