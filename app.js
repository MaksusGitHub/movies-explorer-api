const express = require('express');
const mongoose = require('mongoose');

const { PORT, DB } = require('./config');
const router = require('./routes/router');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();

mongoose.connect(DB);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use('/', router);

app.listen(PORT, () => {});
