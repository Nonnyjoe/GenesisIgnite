// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IROUTER {
    function mintNft(address receiver) external;

    function RegisterLaunchpad(
        address _launchPad,
        address _governanceToken
    ) external;

    function CreateGovernanceToken(
        address _launchPad,
        uint256 _totalSupply
    ) external;
}
