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
    superagent.get("http://www.weather.com.cn/weather/101200101.shtml").end(function(error, data){
        var $ = cheerio.load(data.text);
        var weatherItems = [];
        $("ul[class='t clearfix'] li").each(function(index, element){
            var $element = $(element);
            var item = {
                "date":$element.children("h1").eq(0).text(),
                "hightemp":$element.children(".tem").eq(0).children("span").eq(0).text(),
                "lowTemop":$element.children(".tem").eq(0).children("i").eq(0).text()
            }

            // 数据清洗
            for(var attr in item){
                var newValue = item[attr];
                if(attr == "date"){
                    newValue = "2019-08-" + parseInt(item[attr]);
                }else {
                    newValue = parseInt(item[attr]);
                }
                item[attr] = newValue;
            }
            weatherItems.push(item);
            console.log(weatherItems);
        })

        // 添加到mongodb数据库
        MongoClient.connect(url, {useNewUrlParser:true}, function(err, db){
            if(err) console.log("数据库连接失败...");
            var dbo = db.db("weather");
            dbo.collection("wuhan").insertMany(weatherItems, function(err,res){
                if(err) console.log("数据写入失败...");
                console.log("插入的文档数量为："+res.insertedCount);
                db.close();
            })
        })
    })
})

app.get("/wuhan", function(req,res){
    res.render("report");
})

app.get("/report", function(req,res){
    MongoClient.connect(url,{useNewUrlParser:true}, function(err,db){
        if(err) console.log("数据库连接失败...");
        var dbo = db.db("weather");
        dbo.collection("wuhan").find({}).toArray(function(err,result){
            if(err) console.log("数据库查询失败...");
            console.log(result);
            db.close();
            res.write(JSON.stringify(result));
            res.end("");
        })
    })
})

app.use("/public", express.static("static"));
app.listen(8000,function(){
    console.log("http://127.0.0.1:8000");
})