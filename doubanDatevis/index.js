var express = require("express");
var cheerio = require("cheerio");
var superagent = require("superagent");
var mongo = require("mongodb");
var app = express();
app.set("view engine","ejs");
var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/";

app.get("/", function(req,res){

    // 爬虫开发
    superagent.get("https://movie.douban.com/j/new_search_subjects?sort=R&range=0,10&tags=%E7%94%B5%E5%BD%B1&start=0&year_range=2000,2009").end(function(error,data){
        var data1 = JSON.parse(data.text);
        var $ = cheerio.load(data1);
        var movieItems = [];
    //    console.log(data1);
        for(var i in data1) {
            var item1 = data1[i];
            // console.log(item1);
            for(var j in item1) {
                // console.log(item1[j]);
               movieItems.push(item1);
            }
        }
        superagent.get()
    })
})

app.listen(8080,function(){
    console.log("http://127.0.0.1:8080");
})