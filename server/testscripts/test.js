var http = require('http'),
    fileSystem = require('fs'),
    path = require('path'),
    util = require('util');

http.createServer(function(request, response) {
    var filePath = '/Users/joshfermin/IdeaProjects/sound/server/mp3/Adele.mp3';
    var stat = fileSystem.statSync(filePath);

    response.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size
    });

    var readStream = fileSystem.createReadStream(filePath);
    readStream.pipe(response);
})
    .listen(2000);


// /**
//  * Created by joshfermin on 9/6/16.
//  */
// var fs = require('fs');
// var lame = require('lame');
// var Speaker = require('speaker');
//
// fs.createReadStream(process.argv[2])
//     .pipe(new lame.Decoder)
//     .on('format', console.log)
//     .pipe(new Speaker);
