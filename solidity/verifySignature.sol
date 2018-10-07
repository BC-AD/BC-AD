pragma solidity ^0.4.24;

contract VerifySignature {
    function verify(bytes32 mhash, uint8 v, bytes32 r, bytes32 s) public pure returns (address) {
       /* prefix might be needed for geth only
        * https://github.com/ethereum/go-ethereum/issues/3731
        */
        address signer = ecrecover(mhash, v, r, s);

        return signer;
    }
}
