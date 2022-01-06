// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;

import "./CryptoPlants.sol";

contract PlantGrower is CryptoPlants {
    modifier onlyOwnerOf(uint256 _plantId) {
        require(msg.sender == plantToFarmer[_plantId]);
        _;
    }

    function _triggerGrowCooldown(PlantStruct storage _plant) internal {
        _plant.nextGrowTime = uint32(block.timestamp + growCooldown);
    }

    function _isReady(PlantStruct storage _plant) internal view returns (bool) {
        return (_plant.nextGrowTime <= block.timestamp);
    }

    function waterPlant(uint256 _plantId) public onlyOwnerOf(_plantId) {
        PlantStruct storage myPlant = plants[_plantId];
        require(_isReady(myPlant));
        myPlant.size++; // TODO: SAFEMATH
        _triggerGrowCooldown(myPlant);
    }
}
