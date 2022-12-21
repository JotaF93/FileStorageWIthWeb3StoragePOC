// eslint-disable-next-line no-undef
const fileStorage = artifacts.require('FileStorage');

module.exports = function (deployer) {
	deployer.deploy(fileStorage);
};
