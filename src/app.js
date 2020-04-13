const express = require('express');
const port = process.env.PORT;
const userRouter = require('./routers/user');
const projectRouter = require('./routers/project');
require('./db/db');

const app = express();

app.use(express.json({ limit: '1mb' }));
// app.use(express.urlencoded({ extended: false }));
app.use('/user', userRouter);
app.use('/project', projectRouter);

module.exports = app;
