(function(){
  var app = angular.module('SCImgapp',[]);


  app.controller('keywordsListCtrl', function(){
      this.product = keywordsList;
      this.listk = list;
  });

var  keywordsList= [
  {name: "kela"},
  {name: "kpoij"},
  {name: "poi"}];

  var  list= [
    {name: "kela"},
    {name: "kpoij"},
    {name: "poi"}];


})();
