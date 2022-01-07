// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CryptoPlants is ERC721 {
    constructor() ERC721("CryptoPlants", "CryptoPlants") {
        createRandomPlant("Thea");
    }

    event NewPlant(string name, address farmer, uint256 dna);

    uint8 dnaDigits = 16;
    uint256 dnaModulus = 10**dnaDigits;
    uint256 growCooldown = 1 hours;

    struct PlantStruct {
        string name;
        address farmer;
        uint16 dna; // TODO: FIX THE DNA
        uint16 size;
        uint32 nextGrowTime; // TODO: FIX BUG IN THE 1970 growtime thing
    }

    PlantStruct[] public plants;

    mapping(address => bool) public hasPlant;
    mapping(uint256 => address) public plantIdToFarmer;
    mapping(address => uint256) public farmerToPlantId;

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

    function _createPlant(string memory _name, uint16 _dna) internal {
        plants.push(
            PlantStruct(
                _name,
                msg.sender,
                _dna,
                1,
                uint32(block.timestamp + growCooldown)
            )
        );
        uint256 plantId = plants.length - 1;
        plantIdToFarmer[plantId] = msg.sender;
        farmerToPlantId[msg.sender] = plantId;
        hasPlant[msg.sender] = true;
        emit NewPlant(_name, msg.sender, _dna);
    }

    function createRandomPlant(string memory _name) public {
        require(hasPlant[msg.sender] != true);
        uint16 randomDna = _generateRandomDna(_name);
        randomDna = randomDna - (randomDna % 100);
        _createPlant(_name, randomDna);
    }

    function getPlants() external view returns (PlantStruct[] memory) {
        return plants;
    }

    function getPlant() public view returns (uint256) {
        return farmerToPlantId[msg.sender];
    }
}
