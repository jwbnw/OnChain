var OnChain  = artifacts.require("./OnTheChain.sol");

contract('OnChain', function(interaction) {
	it('should read the creator message',function(){

		var creatorMessage;
		
		return	OnChain.deployed().then(function(instance){
			return instance.readCreatorWelcome.call();
		}).then(function(result) {
			creatorMessage = result.toString();
			assert.equal(creatorMessage,"test","Contract is returning incorrect creator welcomw");
		});
	});
});