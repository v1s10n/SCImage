(function(){
  var app = angular.module('SCImgapp',[]);


  app.controller('keywordsListCtrl', function(){
      this.product = keywordsList;
  });

var  keywordsList= [
  {name: "kela"},
  {name: "kpoij"},
  {name: "poi"}];


})();
