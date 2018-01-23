module.exports.store= function(Keyword, callback){
  var express = require('express');
//  var Grid = require('gridfs-stream');
  var fs = require('fs');
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  const http = require('http');
  // img path
  const folder = './images/';
  var imgPath ;

  // connect to mongo
  mongoose.connect('mongodb://127.0.0.1:27017/Keywords');
  /*var conn = mongoose.connection;
  Grid.mongo = mongoose.mongo;
  conn.once('open', function () {
    console.error('mongo is open');
    var gfs = Grid(conn.db);
    var count = 1;
    fs.readdirSync(folder).forEach(file => {
      imgPath = folder+file;
      var writestream = gfs.createWriteStream({
        filename: file
      }).on('close',function(file){
      console.log("Written to DB!...");
      });;
      fs.createReadStream(imgPath).pipe(writestream);
      callback();

    });
    //writestream.
  });

*/



  // example schema
  var schema = new Schema({
      keyword: String,
      filename: String,
      img: { data: Buffer, contentType: String }
  },{collection: "Keywords"});

  // our model
  var A = mongoose.model(Keyword, schema);

  mongoose.connection.on('open', function () {
    console.error('mongo is open');
    var count = 1;
    fs.readdirSync(folder).forEach(file => {
      imgPath = folder+file;
      var a = new A;
      a.keyword = Keyword;
      a.filename = file;
      a.img.data = fs.readFileSync(imgPath);
      a.img.contentType = 'image/jpeg';
      a.save(function (err, a){
        if (err) throw err;
        console.error('saved img to mongo');
      count++;
      if (count == 15){
        console.log('Connection closed');

        mongoose.connection.close();
          callback(A);
      }

      });
    });

  });

};
