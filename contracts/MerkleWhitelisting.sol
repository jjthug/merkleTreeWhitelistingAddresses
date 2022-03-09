pragma solidity ^0.8.9;

import "./MerkleProof.sol";

error AddressAlreadyClaimed();
error InvalidProof();

contract Merkle{

    bytes32 public merkleRoot = "";

    mapping (address => bool) public whitelistClaimed;

    function whitelistMint(bytes32[] calldata merkleProof) public{
        if(whitelistClaimed[msg.sender]) revert AddressAlreadyClaimed();

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        if(!MerkleProof.verify(merkleProof, merkleRoot, leaf)) revert InvalidProof();
    
        whitelistClaimed[msg.sender] = true;

        //Mint
    }
}