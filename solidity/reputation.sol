pragma solidity ^0.4.24;

import "./registrarNoProxy.sol";

contract Reputation {

	//create a local instance of contract so we understand how to call the contract
	Registry users;

	//keep track of the owner of this contract
	address owner;

	//keep track of people's reputation as voted on by others
	mapping (address => int) userReputation;

	//keep track of how many times someone has upvoted others
	mapping (address => uint) alreadyUpVoted;

	//keep track of how many times someone has downvoted others
	mapping (address => uint) alreadyDownVoted;

	constructor (address reg) public 
	{
		users = Registry(reg);

		//owner of reputation contract is the owner of the registry contract
		owner = users.owner();
	}

	modifier isRegistered(address user)
	{
		//this user can only interact with the contract
		//if they are already registered in the registry contract
		require(users.exists(user));
		_;
	}

	function upvoteUser(address toVote) public isRegistered(msg.sender) isRegistered(toVote)
	{
		//you can only upvote other users 2 times in your whole lifetime, use these wisely
		require(alreadyUpVoted[msg.sender] < 2);

		//you can't upvote yourself
		require(msg.sender != toVote);

		//add 1 to the amount of times they have up voted
		alreadyUpVoted[msg.sender] += 1;

		//increase the users reputation by my own rep
		userReputation[toVote] += 1;
	}

	function downvoteUser(address toVote) public isRegistered(msg.sender) isRegistered(toVote)
	{
		//you can only downvote other users 5 times in your whole lifetime, use these wisely
		require(alreadyDownVoted[msg.sender] < 5);

		//add 1 to the amount of times they have down voted
		alreadyDownVoted[msg.sender] += 1;

		//decrease the users reputation
		userReputation[toVote] -= 1;
	}

	function getReputation(address user) isRegistered(user) public view returns (int)
	{
		//get reputation from the registry contract, then add that 
		//to the users reputations in this contract
		return userReputation[user] + int(users.getUserReputation(user));
	}
}
