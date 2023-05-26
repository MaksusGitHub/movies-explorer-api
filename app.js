const express = require('express');
const mongoose = require('mongoose');

const { PORT, DB } = require('./config');

const app = express();

mongoose.connect(DB);

app.listen(PORT, () => {});
