// sockets.js
exports.socketServer = function (server) {
    var io = require('socket.io')(server);
    var ss = require('socket.io-stream');
    var fs = require('fs');

    var lame = require('lame');
    var Speaker = require('speaker');

    io.on('connection', function(socket){

        ss(socket).on('file', function(stream){
            var filePath = '/Users/joshfermin/IdeaProjects/sound/server/mp3/cliffs.mp3';
            var readStream = fs.createReadStream(filePath);

            readStream.pipe(new lame.Decoder)
                .on('format', console.log)
                .pipe(new Speaker)
                .pipe(stream);
        });


        socket.on('chat message', function(msg){
            io.emit('chat message', msg);
        });
        socket.on('disconnect', function(){
            io.emit('chat message', 'User Disconnected');
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