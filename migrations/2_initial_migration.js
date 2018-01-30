var HrmContract = artifacts.require("./HrmContract.sol");

module.exports = function(deployer) {
  deployer.deploy(HrmContract);
};
