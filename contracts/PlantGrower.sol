pragma solidity >=0.4.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract PlantGrower is ERC721 {
    constructor() {}

    struct Plant {
        string name;
        uint256 dna;
        uint16 size;
        uint32 nextGrowTime;
    }

    function create(address _owner) external onlyOwner {}
}
