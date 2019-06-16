/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

// key = 'mongodb+srv://<User>:<Password>@cluster0-eu4z1.mongodb.net/test?retryWrites=true&w=majority'
const key = require('./mongodbkeys');

mongoose.connect(
  key.mongoURI,
  { useNewUrlParser: true },
);

app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(cors());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
app.use(require('./routes'));

server.listen(3333);
