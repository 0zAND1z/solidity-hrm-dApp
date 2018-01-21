var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var path = __dirname + '/app/';
var url = require('url');

router.use(function(req,res,next){
  console.log("/" + req.method);
  console.log("Path: " + path);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/jobpage.html",function(req,res){
  console.log(req.query.jobID);
  res.sendFile(path + "/website/applicant/jobpage.html");
});

router.get("/viewapplicants.html",function(req,res){
  console.log(req.query.jobID);
  res.sendFile(path + "/website/employer/viewapplicants.html");
});

app.use(express.static('.'));
app.use(express.static('app'));
app.use(express.static('lib'));
app.use(express.static('js'));
app.use(express.static('website'));
app.use(express.static('employer'));
app.use(express.static('applicant'));

//Method to post job parameters to jobpage
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.post("/parseMyUrl", function(req,res){
  console.log(req.body.url);
  var url_parts = url.parse(req.body.url, true);
  var query = url_parts.query;
  console.log(query.jobID);
  res.send(query.jobID);
})

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


//web3js interface code
Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[],"name":"getActiveJobs","outputs":[{"components":[{"name":"jobID","type":"string"},{"name":"jobTitle","type":"string"},{"name":"jobJDLink","type":"string"},{"name":"isJobActive","type":"bool"}],"name":"activeJobArray","type":"tuple[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_firstName","type":"string"},{"name":"_middleName","type":"string"},{"name":"_lastName","type":"string"},{"name":"_emailID","type":"string"},{"name":"_location","type":"string"},{"name":"_mobNo","type":"string"},{"name":"_age","type":"uint8"}],"name":"setApplicantData","outputs":[{"name":"setStatus","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_jobID","type":"string"}],"name":"applyJob","outputs":[{"name":"applyStatus","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getJobs","outputs":[{"components":[{"name":"jobID","type":"string"},{"name":"jobTitle","type":"string"},{"name":"jobJDLink","type":"string"},{"name":"isJobActive","type":"bool"}],"name":"jobArray","type":"tuple[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getActiveJobArray","outputs":[{"components":[{"name":"jobID","type":"string"},{"name":"jobTitle","type":"string"},{"name":"jobJDLink","type":"string"},{"name":"isJobActive","type":"bool"}],"name":"activeJobArray","type":"tuple[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_jobID","type":"string"}],"name":"viewJobDetails","outputs":[{"name":"jobID","type":"string"},{"name":"jobTitle","type":"string"},{"name":"jobJDLink","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_jobID","type":"string"},{"name":"_jobTitle","type":"string"},{"name":"_jobJDLink","type":"string"}],"name":"createJob","outputs":[{"name":"jobCreationStatus","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_realJobID","type":"string"},{"name":"_newJobID","type":"string"},{"name":"_newJobTitle","type":"string"},{"name":"_newJobJDLink","type":"string"}],"name":"updateJob","outputs":[{"name":"jobUpdateStatus","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_jobID","type":"string"},{"name":"_newStatus","type":"bool"}],"name":"setJobStatus","outputs":[{"name":"newJobStatus","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_jobID","type":"string"}],"name":"getApplicants","outputs":[{"components":[{"name":"firstName","type":"string"},{"name":"middleName","type":"string"},{"name":"lastName","type":"string"},{"name":"emailID","type":"string"},{"name":"location","type":"string"},{"name":"mobNo","type":"string"},{"name":"age","type":"uint8"}],"name":"applicantArray","type":"tuple[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');

HrmContract = web3.eth.contract(abi);
contractInstance = HrmContract.at('0xcab5a7a2f85beebff5207fc9c1b53320d81d33f5');
var addressEmployer = Math.floor(Math.random() * 5);
var addressCandidate = Math.floor(Math.random() * 5) + 5;

//Employer actions
app.post('/createJob',function(req,res){
  console.log(req.body.jobID);
  var returnVal = contractInstance.createJob(req.body.jobID, req.body.jobTitle, req.body.jobJDLink, {from: web3.eth.accounts[addressEmployer]}).toString();
  console.log(returnVal);
  res.send(returnVal);
  // res.send(true);
});

app.post('/getJobs',function(req,res){
  console.log(req.body.jobID);
  var returnVal = contractInstance.getJobs({from: web3.eth.accounts[addressEmployer]}).toString();
  console.log(returnVal);
  res.send(returnVal);
});

app.post('/setJobStatus',function(req,res){
  console.log(req.body.jobID);
  var returnVal = contractInstance.setJobStatus(req.body.jobID, req.body.newJobStatus, {from: web3.eth.accounts[addressEmployer]});
  console.log(returnVal);
  res.send(returnVal);
});

app.post('/getApplicants',function(req,res){
  console.log(req.body.jobID);
  // return contractInstance.getApplicants(req.body.jobID, {from: web3.eth.accounts[addressEmployer]});
  res.send(true);
});

app.post('/getActiveJobs',function(req,res){
  console.log(req.body.jobID);
  // return contractInstance.getActiveJobs({from: web3.eth.accounts[addressEmployer]});
  res.send(true);
});

app.post('/viewJobDetails',function(req,res){
  console.log(req.body.jobID);
  // return contractInstance.viewJobDetails(req.body.jobID, {from: web3.eth.accounts[addressEmployer]});
  res.send(true);
});

app.post('/applyJob',function(req,res){
  console.log(req.body.jobID);
  // return contractInstance.applyJob(req.body.jobID, {from: web3.eth.accounts[addressEmployer]});
  res.send(true);
});

app.post('/setApplicantData',function(req,res){
  console.log(req.body.jobID);
  // return contractInstance.setApplicantData(req.body.firstName,req.body.middleName, req.body.lastName, req.body.emailID, req.body.location, req.body.mobNo, req.body.age {from: web3.eth.accounts[addressEmployer]});
  res.send(true);
});


app.post('/updateJob',function(req,res){
  console.log(req.body.jobID);
  // return contractInstance.updateJob(req.body.realJobID, req.body.newJobID, req.body.newJobTitle, req.body.newJobJDLink, {from: web3.eth.accounts[addressEmployer]});
  res.send(true);
});

//Candidate actions
// function setApplicantData(var address, var firstName, var middleName,var lastName,
// var emailID, var location, string _mobNo, uint8 _age)
