module.exports.scrap = function(Keyword, callback){
  var express = require('express');
  var app = express();
  var fs = require('fs'),
      request = require('request');
  var dir = './images';
  var Jimp = require("jimp");
  var Promise = require('promise');
  var Scraper = require ('images-scraper')
    , google = new Scraper.Google();
  var key = Keyword;
  var searchKey = Keyword;// + " images,"+Keyword + ".jpg, " + Keyword+".png";
  var count = 0;
    var download = function(uri,[url]){

      request.head(uri, function(err, res, body){
        try{
          var resHeaders = res.headers['content-type'];
          if (count<15 && (resHeaders == "image/png" || resHeaders == "image/jpeg") ){

          Jimp.read(uri, function (err, lenna) {
            if (err) throw err;
            lenna.resize(100, 100)            // resize
                  .quality(60)                 // set JPEG quality
                  .greyscale()                 // set greyscale
                  .write('./images/'+ key+[url]+".jpg"); // save
            console.log("downloaded"+(key+[url]));
            callback();
            }).catch(function(error){
              console.log('ERROR',error);
            });
          count++;

        }
      }
      catch(errorr){

      }

    //request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      }).on('exit', function(){
        console.log('Done!!!');
      });
    };

  google.list({
      keyword: searchKey,
      num: 60,
      detail: true,
      nightmare: {
          show: false
      }
  })
  .then(function (res) {
      for (let url in res){//var i=0; i<res.length; i++){
        download(res[url].url,[url]);
      }
      console.log('first 15 results from google saved');

  })

  .catch(function(error) {
      console.log('ERROR', error);
  });
  // you can also watch on events
};
