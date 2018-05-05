const express = require('express')
const auth = require('./auth')
const usersRouter = require('./users');
const costumersRouter = require('./costumers');
const authRouter = require('./auth');

const app = express()

app.use(express.json());

app.use(auth.middleware.secureHeaders)

app.use('/auth', authRouter);
app.use('/users', auth.middleware.authorization, auth.middleware.adminDetector, usersRouter);
app.use('/costumers', auth.middleware.authorization, costumersRouter);

