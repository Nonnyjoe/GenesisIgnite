// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "./GovernanceContract.sol";

interface IRouter {
    function saveLaunchpadGovernance(
        address governance,
        address _launchPad,
        address _governanceToken
    ) external;
}

contract GovernanceFactory {
    address GTFactory;
    address GenesisController;

    event Factory_Called();

    constructor(address _GTFactory, address _GenesisController) {
        GTFactory = _GTFactory;
        GenesisController = _GenesisController;
    }

    modifier OnlyFactory() {
        require(msg.sender == GTFactory, "NOT ADMIN");
        _;
    }

    function RegisterLaunchpad(
        address _launchPad,
        address _governanceToken
    ) external OnlyFactory {
        MyGovernor governance = new MyGovernor(
            IVotes(_governanceToken),
            _launchPad
        );
        emit Factory_Called();
        IRouter(GenesisController).saveLaunchpadGovernance(
            address(governance),
            _launchPad,
            _governanceToken
        );
    }
}
