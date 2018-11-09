const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config');

mongoose.connect(
  config.mongo.url,
  { useNewUrlParser: true },
);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

require('./modules/trades')(app);

app.listen(port, () => console.log(`App is running at port ${port}`));
