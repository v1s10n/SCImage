module.exports.retrieve= function(Keyword,modelInstance, callback){
  var express = require('express');
  var fs = require('fs');
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  const http = require('http');
  var modelkite = require('./storeimages');
  //var Keyword = "Keywords";
  // connect to mongo
  var url = 'mongodb://127.0.0.1:27017/Keywords';
  var db = mongoose.connect(url);

  //var A = modelInstance;//mongoose.model(Keyword,'');

  mongoose.connection.on('open', function () {
    console.error('mongo is open');
    //var a = new A;
    //var list = db.collection;
  var newmodelkite = new modelInstance;
  modelInstance.distinct("keyword", function (err, doc) {
    if (err) return next(err);
    console.log(doc);
    console.log('Connection closed');
    mongoose.connection.close();
    callback(doc);

  //modelkite.store();
    /*mongoose.connection.db.listCollections().toArray(function(err, names) {
    if (err) {
        console.log(err);
    }
    else {
        names.forEach(function(e,i,a) {
            collection = e.name;
            modelInstance.findById(newmodelkite, function (err, doc) {
              if (err) return next(err);
              console.log(doc.img.contentType);
              console.log('Connection closed');
              mongoose.connection.close();
              callback();

              //res.contentType(doc.img.contentType);
              //res.send(doc.img.data);
            });
        //);
        //    console.log("collection name:=>", collection);

        });
    }
});
      //  console.log('list = >',list);
*/
  });
});
};
