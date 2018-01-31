
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
});


app.use("/", router);

app.listen(3000, function(){
  console.log("Live at 3000!");
});


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

const HrmContract = TruffleContract(HrmArtifact);
HrmContract.setProvider(web3.currentProvider);

app.post('/createJob',function(req,res){
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
    var account = accounts[1];
    HrmContract.deployed().then(function(instance) {
      return instance.createJob(req.body.jobID, req.body.jobTitle, req.body.jobJDLink, {from: account, gas:59999999});
    }).then(function(result) {
      if(result.receipt.status ==1){
        res.send(true);
      }
    }).catch(function(err) {
      console.log(err.message);
      res.send(false);
    });
  });
});

app.post('/getJobs', function(req,res){
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
    var account = accounts[1];
    HrmContract.deployed().then(function(instance) {
      return instance.getJobs.call({from: account});
    }).then(function(result) {
      console.log(result);
      res.send(result);
    }).catch(function(err) {
      console.log(err.message);
    });
  });
});

app.post('/getJobsFromJobNo', function(req,res){
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
    var account = accounts[1];
    HrmContract.deployed().then(function(instance) {
      return instance.getJobsFromJobNo.call(req.body.jobNo, {from: account});
    }).then(function(result) {
      console.log(result);
      res.send(result);
    }).catch(function(err) {
      console.log(err.message);
    });
  });
});app.post('/getApplicants', function(req,res){
  _jobID = req.body.jobID;
  console.log("_jobID: "+ _jobID);  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
    var account = accounts[1];
    HrmContract.deployed().then(function(instance) {
      return instance.getApplicants.call(req.body.jobID, {from: account});
    }).then(function(result) {
      console.log(result);
      res.send(result);
    }).catch(function(err) {
      console.log(err.message);
    });
  });
});

app.post('/getActiveJobs',function(req,res){
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
    var account = accounts[2];
    HrmContract.deployed().then(function(instance) {
      return instance.getActiveJobs.call({from: account});
    }).then(function(result) {
      console.log(result);
      res.send(result);
    }).catch(function(err) {
      console.log(err.message);
    });
  });
});


app.post('/setJobStatus',function(req,res){
  console.log(req.body);
  if(req.body.newStatus == 'true'){
    newStatus=true;
  }else{
    newStatus=false;
  }
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
    var account = accounts[1];
    HrmContract.deployed().then(function(instance) {
      return instance.setJobStatus(req.body.jobID, newStatus, {from: account, gas:59999999});
    }).then(function(result) {
      console.log(result.receipt);
      if(result.receipt.status ==1){
        res.send(true);
      }
    }).catch(function(err) {
      console.log(err.message);
      res.send(false);
    });
  });});
app.post('/getApplFromApplNo', function(req,res){
  console.log(req.body.applicantNo);
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
    var account = accounts[7];
    HrmContract.deployed().then(function(instance) {
      return instance.getApplFromApplNo.call(req.body.applicantNo, {from: account});
    }).then(function(result) {
      console.log(result);
      res.send(result);
    }).catch(function(err) {
      console.log(err.message);
    });
  });
});

app.post('/viewJobDetails',function(req,res){
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
    var account = accounts[1];
    HrmContract.deployed().then(function(instance) {
      return instance.viewJobDetails.call(req.body.jobID, {from: account});
    }).then(function(result) {
      console.log(result);
      res.send(result);
    }).catch(function(err) {
      console.log(err.message);
    });
  });});

app.post('/applyJob',function(req,res){
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }web3.eth.accounts[7]
    var account = accounts[7];
    HrmContract.deployed().then(function(instance) {
      return instance.applyJob(req.body.jobID, {from: account});
    }).then(function(result) {
      if(result.receipt.status == 1){
        res.send(true);
      }
    }).catch(function(err) {
      console.log(err.message);
      res.send(false);
    });
  });
});

app.post('/setApplicantData',function(req,res){
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
    var account = accounts[6];
    HrmContract.deployed().then(function(instance) {
      return instance.setApplicantData(req.body.fName,req.body.mName, req.body.lName, req.body.email, req.body.location, req.body.mobNo, req.body.dob, {from: account, gas:59999999});
    }).then(function(result) {
      if(result.receipt.status ==1){
        res.send(true);
      }
    }).catch(function(err) {
      console.log(err.message);
      res.send(false);
    });
  });
});

app.post('/updateJob',function(req,res){
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
    var account = accounts[1];
    HrmContract.deployed().then(function(instance) {
      return instance.updateJob(req.body.jobID, req.body.newJobID, req.body.newJobTitle, req.body.newJobJDLink, {from: account, gas:5999999});
    }).then(function(result) {
      console.log(result);
      res.send(result);
    }).catch(function(err) {
      console.log(err.message);
    });
  });
});
