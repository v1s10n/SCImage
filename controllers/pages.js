var express = require('express');
var router = express.Router();
var Scraper = require('./scraper');
var StoreImages = require('./storeimages');
var RetrieveCollections = require('./retrievecollections')
var dir = './images';
var fs = require('fs');
var sendJsonResponse = function (res, status, content){
  res.status(status);
  res.json(content);
};
var keyword;
var Sync = require('sync');
var Promise = require('promise');
var len = 0;
var Model;
function myFunc(findKey){
    fs.readdir(dir, (err, files) => {

        len = files.length;
        console.log(len);
        if (len == 15){
          files.length = 0;
          console.log(len);
          StoreImages.store(findKey, function(modelInstance){
            console.log("db");
            Model = modelInstance;
          });

        }
    });

}
/*Get 'Home' page*/
module.exports.search= function(req,res){
  res.render('index', {title: "Search Image"});
};

/*POST Search */
module.exports.scrapSearch= function(req, res){
    keyword = req.body.keyword;
    var key;
    if (keyword) {
      Scraper.scrap(keyword, function(){
        myFunc(keyword);
      });

      sendJsonResponse(res, 200, 'Sucess');
    }
    else{
      sendJsonResponse(res, 404, 'not found');
    }


};
/*Get 'History Keywords' page*/
module.exports.historyKeywords = function(req,res){
  var dbKeywords;
  RetrieveCollections.retrieve(keyword,Model,function(dbwords){
    dbKeywords = dbwords;
    console.log("out from retrieve keywords");
  });
  res.render('history', {dbkey:dbKeywords});
};

/*Get 'Images for a keyword' page*/
module.exports.showImages = function(req,res){
  res.render('index', {title: "Display Images"});
};
