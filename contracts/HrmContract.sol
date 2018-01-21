pragma solidity ^0.4.18;


contract HrmContract {
    mapping(string => uint) jobID_Pointers;
    mapping(string => address[]) jobID_ApplicantAddress;
    mapping(address => ApplicantStruct) address_ApplicantStruct;

    struct JobStruct {
        string jobID;
        string jobTitle;
        string jobJDLink;
        bool isJobActive;
    }

    struct ApplicantStruct {
        string firstName;
        string middleName;
        string lastName;
        string emailID;
        string location;
        string mobNo;
        uint8 age;
    }

    JobStruct[] jobsArray;
    uint jobpointer = 0;

    ApplicantStruct[] applicantsArray;

    function HrmContract() {

    }

    //EMPLOYER FUNCTIONS
    function getJobs() returns(JobStruct[] jobArray) {
        return jobsArray;
    }

    function createJob(string _jobID, string _jobTitle, string _jobJDLink) returns(bool jobCreationStatus) {
        jobsArray[jobpointer].jobID = _jobID;
        jobsArray[jobpointer].jobTitle = _jobTitle;
        jobsArray[jobpointer].jobJDLink = _jobJDLink;
        jobsArray[jobpointer].isJobActive = true;
        jobID_Pointers[_jobID] = jobpointer;
        jobpointer = jobpointer + 1;
        return true;
    }

    function updateJob(string _realJobID, string _newJobID, string _newJobTitle, string _newJobJDLink)
    returns(bool jobUpdateStatus) {
        uint editJobPointer = jobID_Pointers[_realJobID];
        bytes memory jobIDTestString = bytes(_newJobID);
        bytes memory jobTitleTestString = bytes(_newJobID);
        bytes memory jobJDTestString = bytes(_newJobID);
        if (jobIDTestString.length != 0) {
            jobsArray[editJobPointer].jobID = _newJobID;
        }
        if (jobTitleTestString.length != 0) {
            jobsArray[editJobPointer].jobTitle = _newJobTitle;
        }
        if (jobJDTestString.length != 0) {
            jobsArray[editJobPointer].jobJDLink = _newJobJDLink;
        }
    }

    function setJobStatus(string _jobID, bool _newStatus) returns(bool newJobStatus) {
        uint statusJobPointer = jobID_Pointers[_jobID];
        jobsArray[statusJobPointer].isJobActive = _newStatus;
        assert(jobsArray[statusJobPointer].isJobActive == _newStatus);
        return jobsArray[statusJobPointer].isJobActive;
    }

    function getApplicants(string _jobID) returns(ApplicantStruct[] applicantArray) {
        address[] jobApplicantsArray = jobID_ApplicantAddress[_jobID];
        ApplicantStruct[] applicantStructArray;
        for (uint i = 0; i < jobApplicantsArray.length; i++) {
            ApplicantStruct applicant = address_ApplicantStruct[jobApplicantsArray[i]];
            applicantStructArray.push(applicant);
        }
        return applicantStructArray;
    }


    //APPLICANT FUNCTIONS
    //getActiveJobs() returns an array of active jobs
    function getActiveJobs() returns(JobStruct[] activeJobArray) {
        return getActiveJobArray();
    }

    function getActiveJobArray() returns(JobStruct[] activeJobArray) {
        JobStruct[] activeJobsArray;
        for (uint i = 0; i < jobsArray.length; i++) {
            if (jobsArray[i].isJobActive == true) {
                activeJobsArray.push(jobsArray[i]);
            }
        }
        return activeJobsArray;
    }

    function viewJobDetails(string _jobID) returns(string jobID, string jobTitle, string jobJDLink) {
        uint viewJobPointer = jobID_Pointers[_jobID];

        return (jobsArray[viewJobPointer].jobID,
        jobsArray[viewJobPointer].jobTitle,
        jobsArray[viewJobPointer].jobJDLink);
    }

    function applyJob(string _jobID) returns(bool applyStatus) {
        jobID_ApplicantAddress[_jobID].push(msg.sender);
        return true;
    }

    function setApplicantData(string _firstName, string _middleName, string _lastName,
    string _emailID, string _location, string _mobNo, uint8 _age) returns(bool setStatus) {
        var applicant = address_ApplicantStruct[msg.sender];
        applicant.firstName = _firstName;
        applicant.middleName = _middleName;
        applicant.lastName = _lastName;
        applicant.emailID = _emailID;
        applicant.location = _location;
        applicant.mobNo = _mobNo;
        applicant.age = _age;
        applicantsArray.push(applicant);
        return true;
    }
}
