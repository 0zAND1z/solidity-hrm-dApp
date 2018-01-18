var express = require('express');
var bodyParser = require('body-parser');
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

app.use(express.static('/'));
app.use(express.static('app'));
app.use(express.static('lib'));
app.use(express.static('website'));

//Method to post job parameters to jobpage
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.post("/website/employer/addnewjob.html", function(req,res){
  console.log(req.body);
  //update eth
});

// app.get("/website/employer/applicantlist.html/:jobArray",function(req,res,next){
//   // res.
// }

app.use("/", router);

app.listen(3000, function(){
  console.log("Live at 3000!");
});
