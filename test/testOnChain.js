//Set our contract def
var OnChain  = artifacts.require("./OnTheChain.sol");

//open our contract in order to interact 
contract('OnChain', function(interaction) {
	it('should read the creator message',function(){

		var creatorMessage;
		
		return	OnChain.deployed().then(function(instance){
			return instance.readCreatorWelcome.call();
		}).then(function(result) {
			creatorMessage = result.toString();
			assert.equal(creatorMessage,"test","Contract is returning incorrect creator welcome see stack trace or use tuffle debugger");
		});
	});
	
	it("should allow user to send a message and author to the contract",function(){

		return OnChain.deployed().then(function(instance){
			return instance.setUserMessage("Test Message 1","Test User 1");
		}).then(function(result){
			assert.isOk(result,"User Message was not set see stack trace or use tuffle debugger")
		});
	});
});