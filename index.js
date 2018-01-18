var express = require('express');
var app = express();
var router = express.Router();
var path = __dirname + '/app/';

router.use(function(req,res,next){
  console.log("/" + req.method);
  console.log("Path: " + path);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/website/employer/dashboard.html",function(req,res){
  res.sendFile(path + "website/employer/dashboard.html");
});

router.get("/website/applicant/dashboard.html",function(req,res){
  res.sendFile(path + "website/applicant/dashboard.html");
});

app.use("/", router);

app.listen(3000, function(){
  console.log("Live at 3000!");
});
