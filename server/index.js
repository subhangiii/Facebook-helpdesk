const express = require('express');
require('dotenv').config();
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const router = require('./Routes');

mongoose
  .connect(
    'mongodb+srv://subhangi:subhangi@cluster0.h336o.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Database Connection Established'))
  .catch((err) => console.log(err));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.use('/api', router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:5000`);
});
