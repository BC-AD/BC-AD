
pragma solidity ^0.4.24;

contract Registry {

	address public owner;

	struct digitalID {
		//a single social media profile URL
		string profile;

		//the person's associated address
		address owner;

		//the person's unique ID
		uint    uid;
		//the person's reputation, this is calculated on the frontend
		uint    rep;
		//will be in unix time
		uint    timeCreated;
	}

	//addres to delegate contract logic to
	//address public delegate;

	//map social media url to a reputation
	mapping (address => digitalID) public reputation;

	//keep a mapping of all addresses that exist
	mapping (address => bool) public repExists;

	constructor (/*address _delegate*/) public
	{
		//set owner
		owner = msg.sender;
		//set delegate
		//	delegate = _delegate;
	}

	function exists(address user) public view returns (bool)
	{
		return repExists[user];
	}

	//check if someone exists
	function exist(address user) public view userExists(user) returns (bool)
	{
		return true;
	}


	//store all social media structs in case someone wants to find a person
	//you can iterate through the whole array, burn a ton of gas and see everyone
	digitalID[] public allIDs;


	modifier onlyOwner
	{
		require(msg.sender == owner);
		_;
	}

	/*
	   function setNewDelegate(address _delegate) external onlyOwner
	   {
	   delegate = _delegate;
	   }
	 */

	function createNewUser(string url, uint urep, address user, uint created) external onlyOwner
	{
		//mash all user data together and hash it, then cast to uint to
		//get a user's unique ID.
		//don't use a user's rep when hashing to verify their identity
		//only use constant values
		//their reputation score can change over time which would make verification
		//of a user impossible should their reputation change, altering their unique id
		uint id = uint(keccak256(abi.encodePacked(url, created, user)));

		//declare everything in the struct in one fell swoop.
		allIDs.push(digitalID({owner: user, profile: url, uid: id, rep: urep, timeCreated: created}));

		//push the struct onto the struct array;
		//allIDs.push(tmp);

		//set the reputation variable to the new struct pushed onto the struct array
		reputation[user] = allIDs[allIDs.length - 1];

		//remember that this person now has a reputation
		repExists[user] = true;
	}

	function getUserData(address user) public view returns (address, string, uint, uint, uint)
	{
		//make sure that the user exists before you start
		//accessing values that are out of bounds
		require(repExists[user]);

		//return all user data from specified struct
		return (reputation[user].owner, reputation[user].profile,
				reputation[user].uid, reputation[user].timeCreated,
				reputation[user].rep);
	}

	function owner() public view returns (address)
	{
		return owner;
	}

	modifier userExists(address user)
	{
		require (exists(user));
		_;
	}

	//get user's initial reputation 
	function getUserReputation(address user) userExists(user) public view returns (uint)
	{
		return (reputation[user].rep);
	}
}
