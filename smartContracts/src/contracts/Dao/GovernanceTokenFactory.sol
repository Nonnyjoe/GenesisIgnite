// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./GovernanceToken.sol";

import "../../../lib/openzeppelin-contracts/contracts/governance/utils/IVotes.sol";
import "../../interface/IROUTER.sol";

contract GovernanceTokenFactory {
    address LaunchPadFactory;
    bool initialized;
    address GovernanceFactory;

    modifier OnlyLaunchpad() {
        require(msg.sender == LaunchPadFactory, "NOT LAUNCHPAD");
        _;
    }

    constructor() {}

    function initialize(
        address _launchPadFactory,
        address _GovernanceFactory
    ) external {
        require(initialized == false, "ALREADY INITIALIZED");
        LaunchPadFactory = _launchPadFactory;
        GovernanceFactory = _GovernanceFactory;
        initialized = true;
    }

    function CreateGovernanceToken(
        address _launchPad,
        uint256 _totalSupply
    ) external OnlyLaunchpad {
        GovernanceToken governanceToken = new GovernanceToken(
            _launchPad,
            _totalSupply
        );

        IROUTER(GovernanceFactory).RegisterLaunchpad(
            address(_launchPad),
            address(governanceToken)
        );
    }
}
