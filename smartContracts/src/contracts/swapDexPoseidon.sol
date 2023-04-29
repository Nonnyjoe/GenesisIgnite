interface ILAUNCHPAD2 {
    function InitializeGovernance(
        address _governor,
        address _governanceToken
    ) external;
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "../interface/INFT.sol";
// import "../interface/ILAUNCHPAD.sol";
import "../../lib/openzeppelin-contracts/contracts/governance/utils/IVotes.sol";
import "./Dao/GovernanceContract.sol";

contract swapDexPoseidon {
    event launcpadRegistered(address _launchPad);
    event Factory_Called();

    struct governanceDetails {
        address governanceToken;
        address Governor;
    }

    address admin;
    address LaunchPadFactory;
    address NftAddress;
    address GTFactory;
    address[] Launchpads;
    bool init;
    uint256 NftCounter;
    mapping(address => uint256) private LaunchpadIndex;
    mapping(address => governanceDetails) GovernanceDetails;

    // constructor(address _launchpadFactory) {
    constructor() {
        admin = msg.sender;
    }

    modifier OnlyAdmin() {
        require(msg.sender == admin, "NOT ADMIN");
        _;
    }
    modifier OnlyFactory() {
        require(msg.sender == GTFactory, "NOT ADMIN");
        _;
    }
    modifier OnlyLaunchpad() {
        require(msg.sender == LaunchPadFactory, "NOT LAUNCHPAD");
        _;
    }
    modifier validCaller() {
        require(LaunchpadIndex[msg.sender] > 0, "NOT A VALID CALLER");
        _;
    }

    function initialize(
        address _LaunchPadFactory,
        address _NftAddress
    ) external OnlyAdmin {
        require(init == false, "ALREADY INITIALIZED");
        init = true;
        LaunchPadFactory = _LaunchPadFactory;
        NftAddress = _NftAddress;
    }

    function mintNft(address receiver) external validCaller {
        NftCounter++;
        INFT(NftAddress).mint(receiver, NftCounter);
    }

    function getRegisteredLaunchpads()
        external
        view
        returns (address[] memory _Launchpads)
    {
        _Launchpads = Launchpads;
    }

    function saveLaunchpad(
        address governance,
        address _launchPad,
        address _governanceToken
    ) external {
        emit Factory_Called();
        ILAUNCHPAD2(_launchPad).InitializeGovernance(
            address(governance),
            address(_governanceToken)
        );
        GovernanceDetails[_launchPad].Governor = address(governance);
        GovernanceDetails[_launchPad].governanceToken = address(
            _governanceToken
        );
    }
}
