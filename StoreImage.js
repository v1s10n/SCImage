var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const http = require('http');
// img path
const folder = './images/';
var imgPath ;

// connect to mongo
mongoose.connect('mongodb://127.0.0.1:27017/Keywords');

// example schema
var schema = new Schema({
    img: { data: Buffer, contentType: String }
},{collection: 'koll'});

// our model
var A = mongoose.model('', schema);

mongoose.connection.on('open', function () {
  console.error('mongo is open');
  var count = 1;
  fs.readdirSync(folder).forEach(file => {
    imgPath = folder+file;
    var a = new A;
    a.img.data = fs.readFileSync(imgPath);
    a.img.contentType = 'image/jpeg';
    a.save(function (err, a){
      if (err) throw err;
      console.error('saved img to mongo');
    count++;
    if (count == 15){
      console.log('Connection closed');
        mongoose.connection.close();

    }

    });
  });
});
