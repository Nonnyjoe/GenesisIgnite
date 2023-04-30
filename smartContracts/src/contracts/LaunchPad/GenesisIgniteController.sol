// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../../interface/IUSDT.sol";
import "../../interface/IROUTER.sol";
import "../../interface/ILAUNCHPAD.sol";
import "../../interface/INFT.sol";

// import "../lib/forge-std/src/console.sol";

contract GenesisIgniteController {
    event LaunchPadRegistered(address PadToken, uint regId);
    event launchpadCreated(
        address moderator,
        address padtoken,
        uint padDuration
    );
    event presale_Activated(address Launchpad);
    event presale_Ended(address Launchpad);
    event Factory_Called(address Factory);

    error Id_Already_Taken();
    error Cannot_Be_Address_Zero();
    error cannot_Accept_Zero_Value();

    address[] launchpads;
    address[] presaleTokens;
    address[] allPresaleTokens;
    address ProjectAdmin;
    address GenesisToken;
    address GenesisNft;
    uint256 public NftCounter;
    address GovernanceTokenFactory;
    address LaunchPadFactory;
    uint launchPadFee;
    uint rewardCondition;

    struct padDetails {
        uint LaunchPadStartTime;
        address LaunchpadAddress;
        address LaunchPadAdmin;
        uint LaunchpadTotalSupply;
        uint Instalments;
    }

    struct governanceDetails {
        address governanceToken;
        address Governor;
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

    mapping(address => bool) LPrequested;
    mapping(address => address) LPrequester;
    mapping(address => string) LPTokenCid;
    mapping(address => governanceDetails) GovernanceDetails;

    modifier IsAdmin() {
        require(msg.sender == ProjectAdmin, "NOT THE PROJECT ADMIN");
        _;
    }

    modifier isValidChild() {
        require((validCildRecord[msg.sender] == true), "NOT A VALID CHILD");
        _;
    }

    modifier validCaller() {
        require(
            validCildRecord[address(msg.sender)] == true,
            "NOT A VALID CALLER"
        );
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
        address _LaunchPadFactory,
        address _governanceTokenFactory,
        uint _rewardCondition
    ) {
        ProjectAdmin = admin;
        launchPadFee = _launchPadFees;
        GenesisToken = _nativeToken;
        GenesisNft = _GenesisNft;
        LaunchPadFactory = _LaunchPadFactory;
        rewardCondition = _rewardCondition;
        GovernanceTokenFactory = _governanceTokenFactory;
    }

    function requestLaunchPad(address TokenAddress, string memory cid) public {
        if (LPrequested[TokenAddress] == true) {
            require(
                msg.sender == LPrequester[TokenAddress],
                "NOT PROJECT ADMIN"
            );
            require(
                LaunchpadIdRecord[TokenAddress] == 0,
                "LAUNCHPAD ALREADY REGISTERED"
            );
        }
        LPrequested[TokenAddress] = true;
        LPrequester[TokenAddress] = msg.sender;
        LPTokenCid[TokenAddress] = cid;
    }

    function returnCid(
        address TokenAddress
    ) public view returns (string memory cid) {
        cid = LPTokenCid[TokenAddress];
    }

    function registerLaunchPads(
        address _launchPadAdmin,
        address PadToken,
        uint regId,
        uint _startTime,
        uint _LaunchpadTotalSupply,
        uint _Instalments
    ) public IsAdmin {
        if (regId == 0) revert cannot_Accept_Zero_Value();
        if (_launchPadAdmin == address(0) || PadToken == address(0))
            revert Cannot_Be_Address_Zero();
        if (idIsTaken[regId] == true) revert Id_Already_Taken();
        LaunchpadIdRecord[PadToken] = regId;
        LaunchPadRecord[regId].LaunchPadAdmin = _launchPadAdmin;
        LaunchPadRecord[regId].LaunchPadStartTime = _startTime;
        LaunchPadRecord[regId].LaunchpadTotalSupply = _LaunchpadTotalSupply;
        LaunchPadRecord[regId].Instalments = _Instalments;
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
    )
        public
        onlyVerifiedAdmin(regId, _padToken, _LaunchPadTSupply)
        returns (address)
    {
        string memory name = _tokenName;
        string memory symbol = _tokenSymbol;
        address padToken = _padToken;
        uint _regId = regId;
        uint percentagePresalePriceIncrease = _percentagePresalePriceIncrease;
        uint LaunchPadTSupply = _LaunchPadTSupply;
        uint256 preSaleTokenSupply = _preSaleTokenSupply;
        uint256 PadDuration = _PadDuration;

        uint Instalments = LaunchPadRecord[_regId].Instalments;
        address igniteLaunchPad = IROUTER(LaunchPadFactory).newIgniteLaunchPad(
            ProjectAdmin,
            launchPadFee,
            padToken,
            LaunchPadTSupply,
            preSaleTokenSupply,
            PadDuration,
            msg.sender,
            percentagePresalePriceIncrease,
            GenesisToken,
            rewardCondition,
            Instalments
        );
        uint totalToken = LaunchPadTSupply + preSaleTokenSupply;
        saveDetails(name, symbol, igniteLaunchPad, _regId);
        IUSDT(padToken).transferFrom(
            msg.sender,
            address(igniteLaunchPad),
            totalToken
        );
        if (preSaleTokenSupply != 0) {
            allPresaleTokens.push(address(igniteLaunchPad));
        }

        TokenToLaunchPadRecord[padToken] = address(igniteLaunchPad);
        emit launchpadCreated(address(igniteLaunchPad), padToken, PadDuration);
        return address(igniteLaunchPad);
    }

    function saveDetails(
        string memory Name,
        string memory Symbol,
        address igniteLaunchPad,
        uint _regId
    ) internal {
        TokenDetails[address(igniteLaunchPad)].name = Name;
        TokenDetails[address(igniteLaunchPad)].symbol = Symbol;
        launchpads.push(address(igniteLaunchPad));
        validCildRecord[address(igniteLaunchPad)] = true;
        LaunchPadRecord[_regId].LaunchpadAddress = address(igniteLaunchPad);
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

    function mintNft(address receiver) external validCaller {
        NftCounter++;
        INFT(GenesisNft).mint(receiver, NftCounter);
    }

    function saveLaunchpadGovernance(
        address governance,
        address _launchPad,
        address _governanceToken
    ) external {
        ILAUNCHPAD(_launchPad).InitializeGovernance(
            address(governance),
            address(_governanceToken)
        );
        GovernanceDetails[_launchPad].Governor = address(governance);
        GovernanceDetails[_launchPad].governanceToken = address(
            _governanceToken
        );
        emit Factory_Called(msg.sender);
    }

    receive() external payable {}
}
