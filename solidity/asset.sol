pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "./registrarNoProxy.sol";
import "./reputation.sol";

contract Asset {

	Registry registry;
  Reputation reputation;

  struct VerifierData {
    address verifiedBy;
    uint verifiedAt;
  }

  struct AssetData {
    address owner;
  }

	constructor (address _registry, address _reputation) public
	{
		registry = Registry(_registry);
		reputation = Reputation(_reputation);
	}

	//keep track of assets that we have already registered, start from 0
	uint public assetCtr = 0;

	//this mapping will store the assets
	mapping (uint => AssetData) public allAssets;

  mapping (uint => VerifierData[]) verifiers;

	//this mapping will store the assets
	//mapping (uint => address) public assetToRegistrars;

	//this mapping will store the reputation of the asset
	//retputation will be int because you can have a negative reputation
	// mapping (bytes32 => int) public assetReputation;

	//this mapping will keep track of people who have already alreadyVoted
	//for the same asset with an array
	// mapping (uint => address[]) public alreadyVoted;

	//store all names of assets that have been created
	string[] public assetNames;

	modifier inRegistry(address _address)
	{
		require(registry.exist(_address));
		_;
	}

	modifier onlyOwner(uint assetId)
	{
		require(allAssets[assetId].owner == msg.sender);
		_;
	}

	modifier assetExists(uint assetId)
	{
	    require(assetCtr > assetId);
		_;
	}

	function createNewAsset(string name) public inRegistry(msg.sender) returns (uint)
	{
		//store this asset's name
		assetNames.push(name);

		//create the new asset with this name, unique ID, and the owner
		allAssets[assetCtr] = AssetData({owner: msg.sender});

        return assetCtr++;
	}

	function getAllAssets() public view returns (string[])
	{
		//return all asset values
		return assetNames;
	}

  // this moves an asset from one owner to another
  function moveAsset(uint assetId, address to) public assetExists(assetId) onlyOwner(assetId) inRegistry(to) {
    allAssets[assetId].owner = to;
  }

  // this will add a signature to an asset (from an authenticator)
  // In the future this must be onlyOwher who ads a signature instead of an address
  // of a verifier
  function addVerifier(uint assetId, address verifier) public assetExists(assetId) onlyOwner(assetId) inRegistry(verifier) {
    verifiers[assetId].push(VerifierData({verifiedBy: verifier, verifiedAt: block.timestamp}));

    // upvote all verifiers on this artifact...re-verification helps everyone
    VerifierData[] storage v = verifiers[assetId];
    for (uint i = 0; i < v.length; i++) {
        address(reputation).delegatecall(bytes4(keccak256("upvoteUser(address)")), v[i].verifiedBy);
    }
  }

  // has to loop but verifiers should be a short list
  function hasVerified(uint assetId, address verifier) assetExists(assetId) public view returns (bool) {
    VerifierData[] storage v = verifiers[assetId];
    for (uint i = 0; i < v.length; i++) {
      if (v[i].verifiedBy == verifier) {
        return true;
      }
    }

    return false;
  }

  // downvotes all verifiers for this asset
  function refuteVerification(uint assetId) public assetExists(assetId) onlyOwner(assetId) {
    VerifierData[] storage v = verifiers[assetId];
    for (uint i = 0; i < v.length; i++) {
        address(reputation).delegatecall(bytes4(keccak256("downvoteUser(address)")), v[i].verifiedBy);
    }
  }
  
  function getVerifiersForAsset(uint assetId) public view assetExists(assetId) returns (VerifierData[])  {
      return verifiers[assetId];
  }
}
