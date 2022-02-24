//0x75Ff5F62085E14713FFFA2E13a1B8Ddd455a1eC3
//0xbb4e3e33b7dfd4b1c44173638546941ed1bb611e

var CONTRACT = "0x38801Fea804E25f63d97Bd91788856cFF10C4800";

//var Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

function getInstance(){
	var abi = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"clearVoting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operaterAddress","type":"address"}],"name":"clearVotingMan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"voteAddress","type":"address"}],"name":"getLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMyLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"_id","type":"uint8"},{"internalType":"address","name":"voteSetter","type":"address"}],"name":"getName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"_id","type":"uint8"}],"name":"getNameSelf","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"number","type":"uint8"}],"name":"getVotingsAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVotingsNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"_id","type":"uint8"},{"internalType":"string","name":"_name","type":"string"}],"name":"setName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_id","type":"uint8"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"address","name":"opAddress","type":"address"}],"name":"setNameMan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_number","type":"uint8"}],"name":"setVoting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"candidate","type":"uint8"},{"internalType":"address","name":"opAddress","type":"address"}],"name":"totalVoteInfo","outputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"candidate","type":"uint8"},{"internalType":"address","name":"opAddress","type":"address"}],"name":"totalVotesFor","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"candidate","type":"uint8"},{"internalType":"address","name":"opAddress","type":"address"}],"name":"voteForCandidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"votings","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]';
	var CoinContract = new web3.eth.Contract(JSON.parse(abi),CONTRACT);
	return CoinContract;
}

function initiate(){
	if(web3.eth.net.isListening()==false){
		alert("网络连接失败");
		return;
	}

	// 获取投票人,投票名单
	var address = document.getElementById('UserAddress').value;
	//0x75Ff5F62085E14713FFFA2E13a1B8Ddd455a1eC3
	var nameList = document.getElementById('NameList').value.split(',');
	//Charles Shan, Kim Shan, Hongtian Shan
	for (var i=0;i<nameList.length;i++){ 
		nameList[i] = nameList[i].replace(/^\s*|\s*$/g,"");
	}
	// 密码
	var password = document.getElementById('UserPassword').value;
	
	// 发起新投票
	var contractInstance=getInstance();
	web3.eth.personal.unlockAccount(address,password, (err,res)=>{
		if(err){
			console.log("Error: ",err);
			alert("Fail to Auth Accounts");
		}else{
			console.log("Result: ",res);
			contractInstance.methods.setVoting(nameList.length).send({from:address}, 
				function(error, transactionHash){
					if(error){
						console.log("Error: ",error);
					}else{
						console.log("Result: ",transactionHash);
						// 设置姓名
						for (var i=0;i<nameList.length;i++){ 
							contractInstance.methods.setName(i,nameList[i]).send({from:address}, 
								function(error, transactionHash){
									if(error){
										console.log("Error: ",error);
									}else{
										console.log("Result: ",transactionHash);
									}
								}
							);
						}
						alert("成功发起一场投票");
					}
				}
			);
		}
	});
}

function vote(){
	if(web3.eth.net.isListening()==false){
		alert("网络连接失败");
		return;
	}

	// 获取投票人,投票名单
	var address = document.getElementById('UserAddress').value;
	// 投票场所地址
	var addressv = document.getElementById('VoteGame').value;
	if(addressv=="Select"){
		return;
	}
	//0x75Ff5F62085E14713FFFA2E13a1B8Ddd455a1eC3
	var voteID = document.getElementById('VoteID').value;
	// 密码
	var password = document.getElementById('UserPassword').value;
	
	// 进行投票
	var contractInstance=getInstance();
	web3.eth.personal.unlockAccount(address,password, (err,res)=>{
		if(err){
			console.log("Error: ",err);
			alert("Fail to Auth Accounts");
		}else{
			console.log("Result: ",res);
			contractInstance.methods.voteForCandidate(voteID,addressv).send({from:address}, 
				function(error, transactionHash){
					if(error){
						console.log("Error: ",error);
					}else{
						console.log("Result: ",transactionHash);
						alert("成功进行一场投票");
					}
				}
			);
		}
	});
}

function refresh(){
	if(web3.eth.net.isListening()==false){
		alert("网络连接失败");
		return;
	}

	// 获取操作人
	var address = document.getElementById('UserAddress').value;
	// 投票场所地址
	var addressv = document.getElementById('VoteGame').value;
	if(addressv=="Select"){
		return;
	}

	// 清理列表
	document.getElementById('TableBody').innerHTML="";

	// 获取投票数据
	var contractInstance=getInstance();
	contractInstance.methods.getLength(addressv).call({from: address}, 
		function(error, result){
			if(error){
				console.log("Error: ",error);
			}else{
				console.log("Member Number: ",result);
				for(var num = 0;num<result;num++){
					contractInstance.methods.totalVoteInfo(num,addressv).call({from: address}, 
					function(error, result){
						if(error){
							console.log("Error: ",error);
						}else{
							var tableBody = document.getElementById('TableBody').innerHTML;
							document.getElementById('TableBody').innerHTML = tableBody+"<tr><th scope=\"row\">"+result[0]+"</th><td>"+result[1]+"</td><td>"+result[2]+"</td></tr>\n";
						}
					});
				}
			}	
		}
	);
}

function getGames(){
	if(web3.eth.net.isListening()==false){
		alert("网络连接失败");
		return;
	}

	// 获取操作人
	var address = document.getElementById('UserAddress').value;

	// 清空列表
	document.getElementById('VoteGame').innerHTML="<option>Select</option>\n";
	
	// 获取投票场次数据
	var contractInstance=getInstance();
	contractInstance.methods.getVotingsNumber().call({from: address}, 
		function(error, result){
			if(error){
				console.log("Error: ",error);
			}else{
				console.log("Games Number: ",result);
				for(var num = 0;num<result;num++){
					contractInstance.methods.getVotingsAddress(num).call({from: address}, 
					function(error, result){
						if(error){
							console.log("Error: ",error);
						}else{
							if(result!='0x0000000000000000000000000000000000000000'){
								var content = document.getElementById('VoteGame').innerHTML;
								document.getElementById('VoteGame').innerHTML = content+"<option>"+result+"</option>\n";
							}
						}
					});
				}
			}	
		}
	);
	

}

function init(){
	//getGames();
}

