const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http= require('http');

const app = express();
const server = http.Server(app);
const io = socketio(server);


mongoose.connect('mongodb+srv://rui:ruirui@clusterrui-btesr.mongodb.net/semana09?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
})


const connectedUsers = {};

io.on('connection', socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
})

// req.query = acessar query params

// req.params = acessar route params (para edicao, delete)
// app.put('/users/:id') e return res.json({ id: req.params.id })

// req.body = acessar corpo da requisicao (criar e editar) e jah eh json
// app.post('/users') e return res.json(req.body)
// e adicionar:    app.use(express.json()) senao nao reconhece

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

// trocar app por server apos socket.io 
// app.listen(3333);
server.listen(3333);