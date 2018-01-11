//Note: This test file is more for a development outline and to help with TDD; hence the use of the throwProxy. Please see .js tests for more testing on smart contracts functionality 

pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

import "test/helpers/ThrowProxy.sol";
import "contracts/OnTheChain.sol";

contract TestContract {

		function testInitalStorage() public {

		OnTheChain chain = new OnTheChain("test");		
		ThrowProxy throwProxy = new ThrowProxy(address(chain));

		OnTheChain(address(throwProxy)).readCreatorWelcome();
		bool result = throwProxy.execute();

		Assert.isTrue(result,"Function Call did not execute");
		
	}

	function testUserMessage() public {

		OnTheChain chain = new OnTheChain("test");		
		ThrowProxy throwProxy = new ThrowProxy(address(chain));

		OnTheChain(address(throwProxy)).setUserMessage('This is my message','James');
		bool result = throwProxy.execute();

		Assert.isTrue(result,"Function Call did not execute");
	}

	function testGetUserMessage() public {

		OnTheChain chain = new OnTheChain("test");		
		ThrowProxy throwProxy = new ThrowProxy(address(chain));

		OnTheChain(address(throwProxy)).getUserMessage(0x1234);
		bool result = throwProxy.execute();

		Assert.isTrue(result,"Function Call did not execute");
	}

	function testMessageCount() public {

		OnTheChain chain = new OnTheChain("test");		
		ThrowProxy throwProxy = new ThrowProxy(address(chain));

		OnTheChain(address(throwProxy)).getMessageCount();
		bool result = throwProxy.execute();

		Assert.isTrue(result,"Function Call did not execute");
	}

}