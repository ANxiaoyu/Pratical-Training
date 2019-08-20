var express = require("express");
var model = require("./model/model.js");
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});
var app = express();
app.set("view engine","ejs");

app.get("/", model.mainpage);
app.get("/student/add", model.addStudent);
app.get("/student/save", model.saveStudent);
app.get("/student/edit/:stuId", model.editStudent);
app.get("/student/delete/:stuId", model.deleteStudent);
app.post("/student/save", urlencodedParser, model.saveStudent);
app.post("/student/editsave", urlencodedParser, model.editSaveStudent);

app.listen(8000,function(){
    console.log("服务已经启动:http://127.0.0.1:8000/");
})