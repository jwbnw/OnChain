//Set our contract def
var OnChain  = artifacts.require("./OnTheChain.sol");

//open our contract in order to interact 
contract('OnChain .js Tests', function(interaction) {
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
	it("should call the user's message and time of message sent correctly",function(){

		return OnChain.deployed().then(function(instance){
			return instance.getUserMessage.call(interaction[0]);
		}).then(function(result){

			var result1 = result[0].toString();
			var result2 = result[1].toString();
			var result3 = new Date(result[2]*1000);

			assert.equal(result1,"Test Message 1", "Message is not equal to user message");
			assert.equal(result2,"Test User 1", "Message is not equal to user message");
			assert.isNotNull(result3,"the timestamp did not register see stack trace or use tuffle debugger");
		});
	});
	it("should get the count of total messages stored", function(){

		return OnChain.deployed().then(function(instance){
			return instance.getMessageCount.call();

		}).then(function(result){
			assert.equal(result, 1, "Message count is inccorect see stack trace or use tuffle debugger")
		});
	});
	it("should deploy a new message from a different address");
	it("should return the correct new count");
	it("should not allow the same address to send another message");

});