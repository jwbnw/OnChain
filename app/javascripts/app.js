import "../stylesheets/app.css";

import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract';

import onTheChainArtifacts from '../../build/contracts/OnTheChain.json'

//Create instance from contract ABI
var onTheChain = contract(onTheChainArtifacts);

var accounts;
var account;

window.App = {
    start: function() {
        var self = this;

        // Bootstrap the onTheChain abstraction for Use.
        onTheChain.setProvider(web3.currentProvider);

        // Get user account info
        web3.eth.getAccounts(function(err, accs) {

            if (err != null) {
                alert("There was an error fetching your accounts.");
                return;
            }
            if (accs.length == 0) {
                alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }
            accounts = accs;
            account = accounts[0];

            //For Testing

        });
    },


    setStatus: function(message) {

        var status = document.getElementById("status");
        status.innerHTML = message;
    },


    getCreatorMessage: function() {

        var self = this;
        var chain;

        onTheChain.deployed().then(function(instance) {
            chain = instance;
            return chain.readCreatorWelcome.call();
        }).then(function(value) {
            var balance_element = document.getElementById("message");
            balance_element.innerHTML = value.valueOf();
        }).catch(function(e) {
            console.log(e);
            self.setStatus("Error getting balance; see log.");
        });
    },



    setUserMessage: function() {

        var self = this;
        var chain;

        var userMessage = document.getElementById("userMessage").value;
        var userSignature = document.getElementById('userSignature').value;
        this.setStatus("Initiating transaction... (please wait)");
        onTheChain.deployed().then(function(instance) {

            chain = instance;
            return chain.setUserMessage(userMessage, userSignature, { from: account, gas: 1000000 });

        }).then(function(value) {
            var outputInformation = value;
            var outputTransactionReceipt = outputInformation.receipt.transactionHash;
            var outputTransactionBlockNumber = outputInformation.receipt.blockNumber;
            var outputTransactionGasUsed = outputInformation.receipt.gasUsed;

            self.setStatus("Transaction complete!");

            var transactionReceipt = document.getElementById("transactionReceipt");
            var blockNumber = document.getElementById("blockNumber");
            var gasUsed = document.getElementById("gasUsed");

            transactionReceipt.innerHTML = outputTransactionReceipt;
            blockNumber.innerHTML = outputTransactionBlockNumber;
            gasUsed.innerHTML = outputTransactionGasUsed;
        }).catch(function(e) {
            console.log(e);
            var errMsg = e.toString();

            if (errMsg == 'Error: VM Exception while processing transaction: revert') {
                alert("Error, you have already sent a message from that address! If this is not the case please check the console log for more details");
            }
            self.setStatus("Error sending data; see log.");
        });
    },


    getUserMessage: function() {

        var self = this;
        var userGetMessageAddress = document.getElementById("userAddress").value;
        var chain;
        onTheChain.deployed().then(function(instance) {
            chain = instance;
            return chain.getUserMessage.call(userGetMessageAddress);
        }).then(function(result) {

            var userMessage = result[0].toString();
            var userName = result[1].toString();
            var userDateTime = new Date(result[2] * 1000);

            var userReturnMessage = document.getElementById("returnMessage");
            var userReturnAuthor = document.getElementById("returnAuthor");
            var userReturnTimeStamp = document.getElementById("returnTime");

            userReturnMessage.innerHTML = userMessage;
            userReturnAuthor.innerHTML = userName;
            userReturnTimeStamp.innerHTML = userDateTime;
        }).catch(function(e) {
            console.log(e);
            self.setStatus("Error getting data; see log");
        });
    },

    getTotalMessageCount: function() {

        var self = this;
        var chain;
        onTheChain.deployed().then(function(instance) {
            chain = instance;
            return chain.getMessageCount.call();
        }).then(function(result) {

            var messageCount = result.valueOf();
            var userReturnMessageCount = document.getElementById("messageCount");

            userReturnMessageCount.innerHTML = messageCount;
        }).catch(function(e) {
            console.log(e);
            self.setStatus("Error getting messageCount; see log");
        });
    }
};

window.addEventListener('load', function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. Remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
        // fallback - use fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
    }

    App.start();
});