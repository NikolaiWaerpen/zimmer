// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract PlantGrower is ERC721 {
    constructor() ERC721("PlantGrower", "plantGrower") {}

    uint8 dnaDigits = 8;
    uint256 dnaModulus = 10**dnaDigits;
    uint256 growCooldown = 1 hours;

    struct Plant {
        string name;
        uint16 dna;
        uint16 growSize;
        uint32 nextGrowTime;
    }

    Plant[] public plants;

    mapping(uint256 => address) public plantToFarmer;

    function _generateRandomDna(string memory _randomizerString)
        private
        view
        returns (uint8)
    {
        uint256 random = uint256(
            keccak256(abi.encodePacked(_randomizerString))
        );
        return uint8(random % dnaModulus);
    }

    function _createPlant(string memory _name, uint8 _dna) internal {
        plants.push(
            Plant(_name, _dna, 1, uint32(block.timestamp + growCooldown))
        );
        uint256 createdPlantId = plants.length - 1;
        plantToFarmer[createdPlantId] = msg.sender;
    }

    function createRandomPlant(string memory _name) public {
        uint8 randomDna = _generateRandomDna(_name);
        randomDna = randomDna - (randomDna % 100);
        _createPlant(_name, randomDna);
    }
}
