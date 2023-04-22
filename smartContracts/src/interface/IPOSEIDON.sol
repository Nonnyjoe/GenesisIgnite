// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IPOSEIDON {
    function mintNft(address receiver) external;

    function RegisterLaunchpad(address _launchPad) external;

    function getEthPrice() external returns (int);

    function getDaiPrice() external returns (int);

    function getUsdcPrice() external returns (int);

    function initialize(
        address _LaunchPadFactory,
        address _NftAddress
    ) external;

    // function getUniPrice() external returns (int);
}
