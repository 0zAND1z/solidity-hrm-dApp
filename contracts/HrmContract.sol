pragma solidity ^0.4.19;

contract HrmContract {

    mapping (address => JobStruct) employerAddr_jobStruct;
    mapping (address => ApplicantStruct) applicantAddr_applicantStruct;
    mapping (address => uint[]) employerAddr_jobNo;
    mapping (address => uint) applicantAddr_applicantNo;
    mapping (uint => uint[]) jobNo_applicantNo;
    mapping (string => uint) jobID_jobNo;
    mapping (bool => uint[]) isJobActive_jobNo;

    struct JobStruct {
        uint jobNo;
        string jobID;
        string jobTitle;
        string jobJDLink;
        bool isJobActive;
    }

    struct ApplicantStruct {
        uint applicantNo;
        string fname;
        string mname;
        string lname;
        string email;
        string location;
        string mobNo;
        string dob;
    }

    JobStruct[] jobArray;
    ApplicantStruct[] applicantArray;
    uint jobNo;
    uint applicantNo;

    function HrmContract() public {

    }

    function createJob(string _jobID, string _jobTitle, string _jobJDLink)  returns (bool) {
        JobStruct newJob = employerAddr_jobStruct[msg.sender];
        employerAddr_jobNo[msg.sender].push(jobNo);
        isJobActive_jobNo[true].push(jobNo);
        newJob.jobNo = jobNo;
        newJob.jobID = _jobID;
        newJob.jobTitle = _jobTitle;
        newJob.jobJDLink = _jobJDLink;
        newJob.isJobActive = true;
        jobArray.push(newJob);
        jobNo = jobNo + 1;
        return true;
    }

    function updateJob(string _realJobID, string _newJobID, string _newJobTitle, string _newJobJDLink)  returns (bool jobUpdateStatus) {
        uint reqJobNo = jobID_jobNo[_realJobID];
        jobArray[reqJobNo].jobID = _newJobID;
        jobArray[reqJobNo].jobTitle = _newJobTitle;
        jobArray[reqJobNo].jobJDLink = _newJobJDLink;
        return true;
    }

    function getJobs() returns (uint[] jobNoArray) {
        return(employerAddr_jobNo[msg.sender]);
    }

    function getActiveJobs() returns (uint[] jobNoArray) {
        return(isJobActive_jobNo[true]);
    }

    function getJobsFromJobNo(uint _jobNo) returns (uint ret_jobNo, string ret_jobID, string ret_jobTitle, string ret_jobJDLink) {
        if(jobNo != 0){
            return(jobArray[_jobNo].jobNo, jobArray[_jobNo].jobID, jobArray[_jobNo].jobTitle, jobArray[_jobNo].jobJDLink);
        }else{
            return;
        }
    }

    function getApplicants(string _jobID)  returns (uint[] applicantNoArray) {
        uint reqJobNo = jobID_jobNo[_jobID];
        return(jobNo_applicantNo[reqJobNo]);
    }

    function getApplFromApplNo(uint _applicantNo)  returns (string ret_fname, string ret_mname, string ret_lname,
    string ret_email, string ret_location, string ret_mobNo, string ret_dob){
        return(applicantArray[_applicantNo].fname, applicantArray[_applicantNo].mname, applicantArray[_applicantNo].lname,
        applicantArray[_applicantNo].email, applicantArray[_applicantNo].location, applicantArray[_applicantNo].mobNo, applicantArray[_applicantNo].dob);
    }

    function setJobStatus(string _jobID, bool _isJobActive)  returns (bool retSetJobStatus) {
        uint reqJobNo = jobID_jobNo[_jobID];
        jobArray[reqJobNo].isJobActive = _isJobActive;
        isJobActive_jobNo[_isJobActive].push(reqJobNo);
    }

    function setApplicantData(string _fname, string _mname, string _lname,
    string _email, string _location, string _mobNo, string _dob)  returns (bool setApplicantStatus) {
        ApplicantStruct newApplicant = applicantAddr_applicantStruct[msg.sender];
        applicantAddr_applicantNo[msg.sender] = applicantNo;
        newApplicant.applicantNo = applicantNo;
        newApplicant.fname = _fname;
        newApplicant.mname = _mname;
        newApplicant.lname = _lname;
        newApplicant.email = _email;
        newApplicant.location = _location;
        newApplicant.mobNo = _mobNo;
        newApplicant.dob = _dob;
        applicantArray.push(newApplicant);
        applicantNo = applicantNo + 1;
        return true;
    }

    function viewJobDetails(string _jobID)  returns (uint ret_jobNo, string ret_jobID, string ret_jobTitle, string ret_jobJDLink) {
        uint reqJobNo = jobID_jobNo[_jobID];
        ret_jobID = jobArray[reqJobNo].jobID;
        ret_jobTitle = jobArray[reqJobNo].jobTitle;
        ret_jobJDLink = jobArray[reqJobNo].jobJDLink;
        ret_jobNo = reqJobNo;
        return(ret_jobNo, ret_jobID, ret_jobTitle, ret_jobJDLink);
    }

    function applyJob(string _jobID)  returns (bool applyJobStatus) {
        uint reqJobNo = jobID_jobNo[_jobID];
        jobNo_applicantNo[reqJobNo].push(applicantAddr_applicantNo[msg.sender]);
        return true;
    }

}
