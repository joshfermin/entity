var express = require('express');
var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');
//
// var encoder = lame.Encoder({
//     channels: 2,
//     bitDepth: 16,
//     sampleRate: 44100
// });
//
// encoder.on("data", function(data) {
//     sendData(data);
// });
//
// var decoder = lame.Decoder();
// decoder.on('format', function(format){
//     decoder.pipe(encoder);
// });

module.exports = function(app) {
  app.get('/sound', function(req,res){
      var filePath = '/Users/joshfermin/IdeaProjects/sound/server/mp3/cliffs.mp3';
      var stat = fs.statSync(filePath);

      // res.writeHead(200, {
      //     'Content-Type': 'audio/mpeg',
      //     'Content-Length': stat.length
      // });

      var readStream = fs.createReadStream(filePath);
      readStream.pipe(new lame.Decoder)
          .on('format', console.log)
          .pipe(new Speaker);
  });
};

// var filePath = 'path_to_file.mp3';
// var stat = fileSystem.statSync(filePath);
//
// response.writeHead(200, {
//     'Content-Type': 'audio/mpeg',
//     'Content-Length': stat.size
// });
//
// var readStream = fileSystem.createReadStream(filePath);
// // We replaced all the event handlers with a simple call to util.pump()
// util.pump(readStream, response);

