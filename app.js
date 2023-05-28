const express = require('express');
const mongoose = require('mongoose');

const { PORT, DB } = require('./config');
const router = require('./routes/router');

const app = express();

mongoose.connect(DB);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, () => {});
