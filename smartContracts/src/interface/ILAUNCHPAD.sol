// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface ILAUNCHPAD {
    function participateInPresale(uint _amount) external;

    function presaleActivated() external;

    function presaleEnded() external;

    function DisplayPresales()
        external
        view
        returns (address[] memory presalse);

    function RecordUserParticipation(address _user) external;

    function RecordUserPresaleParticipation(address _user) external;

    function emergencyCancelLaunchpad() external;

    function emergencyRefund(uint _amount) external;

    function participateInLaunchPad(uint _amount) external;

    function displayUsersParticipation(
        address _user
    ) external view returns (address[] memory _userLaunchpads);

    function InitializeGovernance(
        address _governor,
        address _governanceToken
    ) external;

    function requestInstalmentWithdrawal(string memory _description) external;

    function requestEmmergencyWithdrawal(
        uint _amount,
        string memory _description
    ) external returns (uint256 proposalID);

    function WithdrawLaunchPadToken() external;

    function viewGovernanceAddresses()
        external
        view
        returns (address _governor, address _governanceToken);

    function Execute(uint256 proposalId) external;

    function endPresale() external;

    function getProposalIds() external view returns (uint256[] memory);
}
