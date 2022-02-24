var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const fs = require('fs'); 
var code = fs.readFileSync('Voting.sol').toString()
var solc = require('solc');
var compiledCode = solc.compile(code);

var abi = JSON.parse(compiledCode.contracts[':Voting'].interface);
var CoinContract = web3.eth.contract(abi);
var contractAddress = "0x6341D3f5f08B945517Cb2C564E72062DB6506809";
var contractInstance = CoinContract.at(contractAddress);

console.log('accounts[0] balance: ',contractInstance.balances(web3.eth.accounts[0]).plus(21).toString(10));
console.log('accounts[1] balance: ',contractInstance.balances(web3.eth.accounts[1]).plus(21).toString(10));

if(just_check==true)
	return

web3.personal.unlockAccount(_from,_password, (err,res)=>{
	if(err){
		console.log("Error: ",err);
	}else{
		console.log("Result: ",res);
		contractInstance.send(_to, _value, {from:_from},(err,res)=>{
			if(err){
				console.log("Error: ",err);
			}else{
				console.log("Result: ",res);
			}
		});
	}
});
