// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IGENESISCONTROLLER {
    function createLaunchPad(
        uint regId,
        address _padToken,
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _LaunchPadTSupply,
        uint256 _preSaleTokenSupply,
        uint256 _PadDuration,
        uint _percentagePresalePriceIncrease
    ) external;

    function registerLaunchPads(
        address _launchPadAdmin,
        address PadToken,
        uint regId,
        uint _startTime,
        uint _LaunchpadTotalSupply,
        uint _Instalments
    ) external;

    function getLaunchPadAddress(
        address tokenAddress
    ) external view returns (address);

    function RecordUserParticipation(address _user) external;

    function RecordUserPresaleParticipation(address _user) external;

    function getLaunchPads() external view returns (address[] memory);

    function saveLaunchpadGovernance(
        address governance,
        address _launchPad,
        address _governanceToken
    ) external;

    function mintNft(address receiver) external;
}
