// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "./IgniteLaunchPad.sol";

interface IGTF {
    function CreateGovernanceToken(
        address _launchPad,
        uint256 _totalSupply
    ) external;
}

contract IgniteLaunchPadFactory {
    address GovernanceTokenFactory;

    constructor(address GTFactory) {
        GovernanceTokenFactory = GTFactory;
    }

    function newIgniteLaunchPad(
        address ProjectAdmin,
        uint256 launchPadFee,
        address _padToken,
        uint256 _LaunchPadTSupply,
        uint256 _preSaleTokenSupply,
        uint256 _PadDuration,
        address admin,
        uint256 _percentagePresalePriceIncrease,
        address GenesisToken,
        uint256 rewardCondition,
        uint256 Instalments
    ) external returns (address) {
        IgniteLaunchPad igniteLaunchPad = new IgniteLaunchPad(
            ProjectAdmin,
            launchPadFee,
            _padToken,
            _LaunchPadTSupply,
            _preSaleTokenSupply,
            _PadDuration,
            admin,
            _percentagePresalePriceIncrease,
            GenesisToken,
            rewardCondition,
            Instalments,
            msg.sender
        );

        IGTF(GovernanceTokenFactory).CreateGovernanceToken(
            address(igniteLaunchPad),
            (_LaunchPadTSupply + _preSaleTokenSupply)
        );

        return address(igniteLaunchPad);
    }
}
