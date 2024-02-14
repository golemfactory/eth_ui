var HelloWorld = artifacts.require("./ifElse.sol");
module.exports = function (deployer) {
  deployer.deploy(HelloWorld);
};
