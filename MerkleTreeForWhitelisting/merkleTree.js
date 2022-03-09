const {MerkleTree} = require('merkletreejs');
const keccak256 = require('keccak256');

let whitelistAddresses = [
    "0x74D4163f4d5B4D435BD44FBbE03Aad92daAF240f",
    "0x60C1F061B4fd365389dEFa3596FfFC8749D83b3B",
    "0x2d516D8965BC0C37789471c8FFCC5BbBE0457eBC",
    "0x90DF457de8c849aE0426B287D539c45925473821",
    "0xf5A50f2456187D79732D2705CbF592282dE1543D"
];


const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, {sortPairs: true});

console.log("leaf nodes =", leafNodes);
console.log("first leaf node = ", leafNodes[0]);
console.log("merkletree =", merkleTree.toString());

const rootHash = merkleTree.getRoot();
console.log("root =", rootHash);


//Client side

const claimingAddress = leafNodes[0];
// const claimingAddress = keccak256("0xf5A50f2456187D79732D2705CbF592282dE1543D");
// const claimingAddress = keccak256("0xf5A50f2456187D79732D2705CbF592282dE1544D");  // will fail

const hexProof = merkleTree.getHexProof(claimingAddress);
console.log("hex proof =", hexProof);

// verify the claiming address against the root hash
console.log("Verified :", merkleTree.verify(hexProof, claimingAddress, rootHash));