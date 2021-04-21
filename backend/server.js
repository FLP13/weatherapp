const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const weatherRouter = require('./routes/weather.js');

app.use('/weather', weatherRouter);

app.listen(port, () => {
	console.log('Server is running on port: ' + port);
});
