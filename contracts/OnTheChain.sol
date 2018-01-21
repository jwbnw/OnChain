// Specify what version of the compiler we will use
pragma solidity ^0.4.18;

	contract OnTheChain {
		
		struct MessageInfo {

			string userMessage;
			string author;
			uint createTime;
			bool isValue;

		}
		address[] public addressList;

		address creator;
		string welcome;

		mapping(address => MessageInfo) public messageInfoMap;

		function OnTheChain(string creatorMessage) public{

			creator = msg.sender;
			welcome = creatorMessage;

		}

		function readCreatorWelcome() constant returns(string){

			return welcome;
		}

		function setUserMessage(string _userMessage, string _userSig) {

			if(messageInfoMap[msg.sender].isValue) revert();

			var message = messageInfoMap[msg.sender];
			
			message.userMessage = _userMessage;
			message.author = _userSig;
			message.createTime = now;
			message.isValue = true;

			addressList.push(msg.sender); 

		}

		function getUserMessage(address _address) public returns (string, string, uint) {

			return (messageInfoMap[_address].userMessage,messageInfoMap[_address].author,messageInfoMap[_address].createTime);
		}

		function getMessageCount() public returns (uint)  {

			return addressList.length;
		}
	}
