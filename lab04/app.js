const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// Middleware para servir archivos estáticos desde la carpeta "cliente"
app.use(express.static(__dirname + '/cliente'));

io.on('connection', (socket) => {
    socket.on('chat', (msg) => {
        io.emit('chat', msg);
    });
});

app.get('/', (req, resp) => {
    resp.sendFile(`${__dirname}/cliente/chat_view.html`);
});

server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
