// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IROUTER {
    function mintNft(address receiver) external;

    function RegisterLaunchpad(address _launchPad) external;
}
