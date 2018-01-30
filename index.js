
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var path = __dirname + '/app/';
var url = require('url');
var fs = require("fs");

router.use(function(req,res,next){
  console.log("/" + req.method);
  console.log("Path: " + path);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/viewapplicants.html",function(req,res){
  res.sendFile(path + "/website/employer/viewapplicants.html");
});

router.get("/editJob.html", function(req,res){
  res.sendFile(path + "/website/employer/editJob.html");
});

router.get("/jobpage.html",function(req,res){
  res.sendFile(path + "/website/applicant/jobpage.html");
});

router.get("/addapplicant.html", function(req,res){
  res.sendFile(path + "/website/applicant/addapplicant.html");
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
app.get('/initializeWeb3',function(req,res){
  Web3 = require('web3');
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
});

Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var TruffleContract = require('truffle-contract');

var file = 'build/contracts/HrmContract.json';
var contents = fs.readFileSync("build/contracts/HrmContract.json");

var HrmArtifact = JSON.parse(contents);

console.log(HrmArtifact);

HrmContract = TruffleContract(HrmArtifact);
HrmContract.setProvider(web3);

contractInstance = HrmContract.deployed().then(function(instance) {
  adoptionInstance = instance;
  return instace;
});

console.log(contractInstance);

//Employer actions
app.post('/createJob',function(req,res){
  console.log(req.body.jobID);
  var returnVal = contractInstance.createJob(req.body.jobID, req.body.jobTitle, req.body.jobJDLink, {from: web3.eth.accounts[5], gas:100000});
  console.log(returnVal);
  res.send(returnVal);
  // res.send(true);
});

app.post('/getJobs',function(req,res){
  var returnVal = contractInstance.getJobs.call({from: web3.eth.accounts[5]});
  console.log(returnVal);
  // res.send(returnVal);
  res.send(returnVal);
});

app.post('/getJobsFromJobNo', function(req,res){
  var returnVal = contractInstance.getJobsFromJobNo.call(req.body.jobNo, {from: web3.eth.accounts[5]});
  console.log(returnVal);
  res.send(returnVal);
});

app.post('/getApplicants', function(req,res){
  _jobID = req.body.jobID;
  console.log("_jobID: "+ _jobID);
  // var returnVal = contractInstance.getApplicants.call("ID1", {from: web3.eth.accounts[5]});
  var retAppNo = contractInstance.getApplicants.call(_jobID);
  console.log(retAppNo);
  res.send(retAppNo);
});

app.post('/getActiveJobs',function(req,res){
  var returnVal = contractInstance.getActiveJobs.call({from: web3.eth.accounts[3]});
  // console.log(returnVal);app.post('/getJobs',function(req,res){
  console.log(returnVal);
  // res.send(returnVal);
  res.send(returnVal);
});

app.post('/getJobsFromJobNo', function(req,res){
  var returnVal = contractInstance.getJobsFromJobNo.call(req.body.jobNo, {from: web3.eth.accounts[5]});
  console.log(returnVal);
  res.send(true);
});

app.post('/setJobStatus',function(req,res){
  console.log(req.body.jobID);
  // var returnVal = contractInstance.setJobStatus.call(req.body.jobID, req.body.newJobStatus, {from: web3.eth.accounts[addressEmployer]});
  // console.log(returnVal);
  // res.send(returnVal);
  res.send(true);
});

app.post('/getApplFromApplNo', function(req,res){
  var returnVal = contractInstance.getApplFromApplNo.call(req.body.applicantNo, {from: web3.eth.accounts[5]});
  console.log(returnVal);
  res.send(returnVal);
});

app.post('/viewJobDetails',function(req,res){
  console.log(req.body.jobID);
  var returnVal = contractInstance.viewJobDetails.call(req.body.jobID, {from: web3.eth.accounts[3]});
  console.log(returnVal);
  res.send(returnVal);
  // res.send(true);
});

app.post('/applyJob',function(req,res){
  console.log(req.body.jobID);
  var returnVal = contractInstance.applyJob.call(req.body.jobID, {from: web3.eth.accounts[3]});
  // var returnVal = contractInstance.getJobs.call({from: web3.eth.accounts[5]});
  console.log(returnVal);
  res.send(returnVal);
  // res.send(true);
});

app.post('/setApplicantData',function(req,res){
  var returnVal = contractInstance.setApplicantData.call(req.body.fName,req.body.mName, req.body.lName, req.body.email, req.body.location, req.body.mobNo, req.body.dob, {from: web3.eth.accounts[3]});
  console.log(returnVal);
  res.send(returnVal);
});

app.post('/updateJob',function(req,res){
  console.log(req.body);
  var returnVal = contractInstance.updateJob.call(req.body.jobID, req.body.newJobID, req.body.newJobTitle, req.body.newJobJDLink, {from: web3.eth.accounts[5]});
  console.log(returnVal);
  // res.send(returnVal);
  res.send(returnVal);
});

//Candidate actions
// function setApplicantData(var address, var firstName, var middleName,var lastName,
// var emailID, var location, string _mobNo, uint8 _age)
