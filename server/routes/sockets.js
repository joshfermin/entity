// sockets.js

exports.socketServer = function (server) {
    var io = require('socket.io')(server);

    io.on('connection', function(socket){
        socket.on('chat message', function(msg){
            io.emit('chat message', msg);
        });
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
    });
    var chat = io
        .of('/chat')
        .on('connection', function (socket) {
            socket.emit('a message', {
                that: 'only'
                , '/chat': 'will get'
            });
            chat.emit('a message', {
                everyone: 'in'
                , '/chat': 'will get'
            });
        });

    var news = io
        .of('/news')
        .on('connection', function (socket) {
            socket.emit('item', { news: 'item' });
        });
};