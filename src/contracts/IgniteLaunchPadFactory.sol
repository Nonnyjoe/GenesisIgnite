// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IUSDT.sol";
import "./IROUTER.sol";
import "./IgniteLaunchPad.sol";
import "./ILAUNCHPAD.sol";

// import "../lib/forge-std/src/console.sol";

contract IgniteLaunchPadFactory {
    event LaunchPadRegistered(address PadToken, uint regId);
    event launchpadCreated(
        address moderator,
        address padtoken,
        uint padDuration
    );
    event presale_Activated(address Launchpad);
    event presale_Ended(address Launchpad);

    error Id_Already_Taken();
    error Cannot_Be_Address_Zero();
    error cannot_Accept_Zero_Value();

    address[] launchpads;
    address[] presaleTokens;
    address[] allPresaleTokens;
    address ProjectAdmin;
    address GenesisToken;
    address GenesisNft;
    address GenesRouter;
    uint launchPadFee;
    uint rewardCondition;

    struct padDetails {
        uint LaunchPadStartTime;
        address LaunchpadAddress;
        address LaunchPadAdmin;
        uint LaunchpadTotalSupply;
    }

    struct tokenDetails {
        string name;
        string symbol;
    }

    mapping(uint => bool) idIsTaken;
    mapping(address => uint) LaunchpadIdRecord;
    mapping(address => uint) LaunchpadPresaleIndex;
    mapping(address => tokenDetails) TokenDetails;
    mapping(uint => padDetails) LaunchPadRecord;
    mapping(address => address) TokenToLaunchPadRecord;
    mapping(address => bool) validCildRecord;
    mapping(address => mapping(address => bool)) hasUserParticipatedInLaunchpad;
    mapping(address => address[]) userLaunchpads;
    mapping(address => mapping(address => bool)) hasUserParticipatedInPresale;
    mapping(address => address[]) UserPresales;

    modifier IsAdmin() {
        require(msg.sender == ProjectAdmin, "NOT THE PROJECT ADMIN");
        _;
    }

    modifier isValidChild() {
        require((validCildRecord[msg.sender] == true), "NOT A VALID CHILD");
        _;
    }

    modifier onlyVerifiedAdmin(
        uint regId,
        address _padToken,
        uint LaunchPadTotalSupply
    ) {
        require(idIsTaken[regId] == true, "INVALID ID");
        require(
            LaunchPadRecord[regId].LaunchPadAdmin == msg.sender,
            "NOT REGISTERED ADMIN"
        );
        require(
            LaunchPadRecord[regId].LaunchPadStartTime <= block.timestamp,
            "REGISTRATION NOT OPEN YET"
        );
        require(LaunchpadIdRecord[_padToken] == regId, "TOKEN NOT REGISTERED");
        require(
            LaunchPadRecord[regId].LaunchpadTotalSupply == LaunchPadTotalSupply,
            "INVALID LAUCHPAD TOKEN TOTAL SUPPLY"
        );
        _;
    }

    constructor(
        address admin,
        uint _launchPadFees,
        address _nativeToken,
        address _GenesisNft,
        address _GenesRouter,
        uint _rewardCondition
    ) {
        ProjectAdmin = admin;
        launchPadFee = _launchPadFees;
        GenesisToken = _nativeToken;
        GenesisNft = _GenesisNft;
        GenesRouter = _GenesRouter;
        rewardCondition = _rewardCondition;
    }

    function registerLaunchPads(
        address _launchPadAdmin,
        address PadToken,
        uint regId,
        uint _startTime,
        uint _LaunchpadTotalSupply
    ) public IsAdmin {
        if (regId == 0) revert cannot_Accept_Zero_Value();
        if (_launchPadAdmin == address(0) || PadToken == address(0))
            revert Cannot_Be_Address_Zero();
        if (idIsTaken[regId] == true) revert Id_Already_Taken();
        LaunchpadIdRecord[PadToken] = regId;
        LaunchPadRecord[regId].LaunchPadAdmin = _launchPadAdmin;
        LaunchPadRecord[regId].LaunchPadStartTime = _startTime;
        LaunchPadRecord[regId].LaunchpadTotalSupply = _LaunchpadTotalSupply;
        idIsTaken[regId] = true;
        emit LaunchPadRegistered(PadToken, regId);
    }

    function createLaunchPad(
        uint regId,
        address _padToken,
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _LaunchPadTSupply,
        uint256 _preSaleTokenSupply,
        uint256 _PadDuration,
        uint _percentagePresalePriceIncrease
    ) public onlyVerifiedAdmin(regId, _padToken, _LaunchPadTSupply) {
        IgniteLaunchPad igniteLaunchPad = new IgniteLaunchPad(
            ProjectAdmin,
            launchPadFee,
            _padToken,
            address(this),
            _LaunchPadTSupply,
            _preSaleTokenSupply,
            _PadDuration,
            msg.sender,
            _percentagePresalePriceIncrease,
            GenesisToken,
            rewardCondition,
            GenesRouter
        );
        TokenDetails[address(igniteLaunchPad)].name = _tokenName;
        TokenDetails[address(igniteLaunchPad)].symbol = _tokenSymbol;
        uint totalToken = _LaunchPadTSupply + _preSaleTokenSupply;
        IUSDT(_padToken).transferFrom(
            msg.sender,
            address(igniteLaunchPad),
            totalToken
        );
        if (_preSaleTokenSupply != 0) {
            allPresaleTokens.push(address(igniteLaunchPad));
        }
        launchpads.push(address(igniteLaunchPad));
        validCildRecord[address(igniteLaunchPad)] = true;
        IROUTER(GenesRouter).RegisterLaunchpad(address(igniteLaunchPad));
        LaunchPadRecord[regId].LaunchpadAddress = address(igniteLaunchPad);
        TokenToLaunchPadRecord[_padToken] = address(igniteLaunchPad);
        emit launchpadCreated(
            address(igniteLaunchPad),
            _padToken,
            _PadDuration
        );
    }

    function setLaunchPadFee(uint _amount) public IsAdmin {
        require(_amount != 0, "INVALID PERCENTAGE FEE");
        launchPadFee = _amount;
    }

    function setRewardCondition(uint _amount) public IsAdmin {
        require(_amount != 0, "INVALID AMOUNT");
        rewardCondition = _amount;
    }

    function getLaunchPads() public view returns (address[] memory) {
        return allPresaleTokens;
    }

    function getAllPresaleSupporters() public view returns (address[] memory) {
        return launchpads;
    }

    function getLaunchPadAddress(
        address tokenAddress
    ) public view returns (address) {
        return TokenToLaunchPadRecord[tokenAddress];
    }

    function withdrawEth(uint _amount) public IsAdmin {
        (bool success, ) = payable(msg.sender).call{value: _amount}("");
        require(success, "TRANSFER ERROR OCCURED");
    }

    function presaleActivated() external isValidChild {
        presaleTokens.push(msg.sender);
        LaunchpadPresaleIndex[msg.sender] = (presaleTokens.length - 1);
        emit presale_Activated(msg.sender);
    }

    function RecordUserParticipation(address _user) external isValidChild {
        require(
            hasUserParticipatedInLaunchpad[_user][msg.sender] == false,
            "USER ALREADY RECORDED"
        );
        hasUserParticipatedInLaunchpad[_user][msg.sender] = true;
        userLaunchpads[_user].push(msg.sender);
    }

    function RecordUserPresaleParticipation(
        address _user
    ) external isValidChild {
        // hasUserParticipatedInPresale[_user][msg.sender] = true;
        UserPresales[_user].push(msg.sender);
    }

    function displayUsersParticipation(
        address _user
    ) external view returns (address[] memory _userLaunchpads) {
        _userLaunchpads = userLaunchpads[_user];
    }

    function displayUsersPresaleParticipation(
        address _user
    ) external view returns (address[] memory _userPressales) {
        _userPressales = UserPresales[_user];
    }

    function presaleEnded() external isValidChild {
        uint position = LaunchpadPresaleIndex[msg.sender];
        presaleTokens[position] = presaleTokens[presaleTokens.length - 1];
        LaunchpadPresaleIndex[
            presaleTokens[presaleTokens.length - 1]
        ] = position;
        presaleTokens.pop();
        emit presale_Ended(msg.sender);
    }

    function displayTokenDetails(
        address igniteLaunchPad
    ) external view returns (tokenDetails memory td) {
        td = TokenDetails[address(igniteLaunchPad)];
    }

    function DisplayPresales()
        external
        view
        returns (address[] memory presalse)
    {
        presalse = presaleTokens;
    }

    function emergencyCancelLaunchPad(address _pad) external IsAdmin {
        ILAUNCHPAD(_pad).emergencyCancelLaunchpad();
    }

    function EmergencyRefund(address _pad, uint _amount) external IsAdmin {
        ILAUNCHPAD(_pad).emergencyRefund(_amount);
    }

    receive() external payable {}
}
