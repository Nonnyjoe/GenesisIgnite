// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IROUTER {
    function mintNft(address receiver) external;

    function RegisterLaunchpad(
        address _launchPad,
        address _governanceToken
    ) external;

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
    ) external returns (address);
}
