const OnTheChain = artifacts.require("./OnTheChain.sol")

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(OnTheChain,"test",{gas: 6700000});
};