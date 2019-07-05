var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);



// Static path
app.use(express.static(path.join(__dirname, 'www'))); // top du serveur web

app.get('/', function (req, res) {
    res.sendfile('www/socketio.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.emit('text', 'Je suis le serveur, merci de vous être connecté');

    socket.on('message', function (data) {
        console.log('le client dit : ' + data);
        socket.emit('message', data.toUpperCase());
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});