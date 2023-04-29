// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../../../lib/openzeppelin-contracts/contracts/governance/Governor.sol";

import "../../../lib/openzeppelin-contracts/contracts/governance/extensions/GovernorCountingSimple.sol";

import "../../../lib/openzeppelin-contracts/contracts/governance/extensions/GovernorVotes.sol";

import "../../../lib/openzeppelin-contracts/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";

contract MyGovernor is
    Governor,
    GovernorCountingSimple,
    GovernorVotes,
    GovernorVotesQuorumFraction
{
    address LaunchPad;

    constructor(
        IVotes _token,
        address _launchPad
    )
        Governor("MyGovernor")
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(30)
    {
        LaunchPad = _launchPad;
    }

    function votingDelay() public pure override returns (uint256) {
        return 0; // 1 block
    }

    function votingPeriod() public pure override returns (uint256) {
        return 21600; // 3 days
    }

    // The following functions are overrides required by Solidity.

    function quorum(
        uint256 blockNumber
    )
        public
        view
        override(IGovernor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }

    function propose(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description
    ) public virtual override returns (uint256) {
        require(msg.sender == LaunchPad, "NOT A VALID PROPOSER");
        return super.propose(targets, values, calldatas, description);
    }
}
