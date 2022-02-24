// SPDX-License-Identifier: SimPL-2.0
pragma solidity ^0.8.0; 
contract Voting {

    // 一位候选人的记录
    struct Candidater{
        string name;
        uint8 id;
        uint8 voteCount;
    }

    // 一场投票
    struct VoteData{
        string voteName;
        Candidater[] candidaters;
    }
    mapping(address => VoteData) GetVoteData;
    
    // 所有场次的投票
    address[] public votings;

    // 管理员
    address managerAddress;
    constructor(){
        managerAddress = msg.sender;
    }
    
    // 清空一场投票
    function clearVoting()public{
        address operaterAddress = msg.sender;
        while(GetVoteData[operaterAddress].candidaters.length!=0){
            GetVoteData[operaterAddress].candidaters.pop();
        }
        for(uint8 i=0; i<votings.length;i++){
            if(votings[i]==operaterAddress){
                delete votings[i];
                break;
            }
        }
    }

    // 清空一场投票
    function clearVotingMan(address operaterAddress)public{
        while(GetVoteData[operaterAddress].candidaters.length!=0){
            GetVoteData[operaterAddress].candidaters.pop();
        }
        for(uint8 i=0; i<votings.length;i++){
            if(votings[i]==operaterAddress){
                delete votings[i];
                break;
            }
        }
    }

    // 设置一场投票
    function setVoting(uint8 _number)public{
        clearVoting();
        address operaterAddress = msg.sender;
        for (uint8 i = 0; i < _number; i++) {
            GetVoteData[operaterAddress].candidaters.push(Candidater({
                name: "default name",
                id: i,
                voteCount: 0
            }));
        }
        votings.push(operaterAddress);
    }

    // 获取自己的投票活动的列表长度
    function getMyLength()public view returns(uint){
        return GetVoteData[msg.sender].candidaters.length;
    }

    // 获取某投票活动的列表长度
    function getLength(address voteAddress)public view returns(uint){
        return GetVoteData[voteAddress].candidaters.length;
    }

    // 设置竞选者名字
    function setName(uint8 _id, string memory _name) public{
        for(uint i = 0; i < getMyLength(); i++) {
            if (GetVoteData[msg.sender].candidaters[i].id == _id) {
                GetVoteData[msg.sender].candidaters[i].name=_name;
            }
        }
    }

    // 设置竞选者名字(管理员)
    function setNameMan(uint8 _id, string memory _name,address opAddress) public{
        require(msg.sender==managerAddress);
        for(uint i = 0; i < getLength(opAddress); i++) {
            if (GetVoteData[opAddress].candidaters[i].id == _id) {
                GetVoteData[opAddress].candidaters[i].name=_name;
            }
        }
    }

    // 获取竞选者名字
    function getNameSelf(uint8 _id) view public returns(string memory){
        for(uint i = 0; i < getMyLength(); i++) {
            if (GetVoteData[msg.sender].candidaters[i].id == _id) {
                return GetVoteData[msg.sender].candidaters[i].name;
            }
        }
        return "";
    }

    // 获取竞选者名字
    function getName(uint8 _id,address voteSetter) view public returns(string memory){
        for(uint i = 0; i < getLength(voteSetter); i++) {
            if (GetVoteData[voteSetter].candidaters[i].id == _id) {
                return GetVoteData[voteSetter].candidaters[i].name;
            }
        }
        return "";
    }

    // 查看票数
    function totalVotesFor(uint8 candidate,address opAddress) view public returns (uint8) {
        for(uint i = 0; i < getLength(opAddress); i++) {
            if (GetVoteData[opAddress].candidaters[i].id == candidate) {
                return GetVoteData[opAddress].candidaters[i].voteCount;
            }
        }
        return 0;
    }

    // 获取全套参数
    function totalVoteInfo(uint8 candidate,address opAddress) view public returns (uint8,string memory,uint8) {
        for(uint i = 0; i < getLength(opAddress); i++) {
            if (GetVoteData[opAddress].candidaters[i].id == candidate) {
                return (GetVoteData[opAddress].candidaters[i].id, GetVoteData[opAddress].candidaters[i].name, GetVoteData[opAddress].candidaters[i].voteCount);
            }
        }
        return (0,"",0);
    }

    // 投票
    function voteForCandidate(uint8 candidate,address opAddress) public{
        for(uint i = 0; i < getLength(opAddress); i++) {
            if (GetVoteData[opAddress].candidaters[i].id == candidate) {
                GetVoteData[opAddress].candidaters[i].voteCount+=1;
            }
        }
    }

    // 获取总票场
    function getVotingsNumber() view public returns(uint){
        return votings.length;
    }

    // 获取总票场
    function getVotingsAddress(uint8 number) view public returns(address){
        // 0x0000000000000000000000000000000000000000
        return votings[number];//被删除的场次返回值为0x0000..00
    }
}