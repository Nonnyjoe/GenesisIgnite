// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IGOVERN {
    enum ProposalState {
        Pending,
        Active,
        Canceled,
        Defeated,
        Succeeded,
        Queued,
        Expired,
        Executed
    }

    function castVote(uint256 proposalId, uint8 support) external;

    function votingPeriod() external pure returns (uint256);

    function state(uint256 proposalId) external returns (ProposalState);

    function execute(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) external returns (uint256);
}
