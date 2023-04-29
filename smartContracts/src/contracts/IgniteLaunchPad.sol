// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interface/IUSDT.sol";
import "../interface/IROUTER.sol";
import "../interface/ILAUNCHPAD.sol";
import "../../lib/openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import "../../lib/openzeppelin-contracts/contracts/governance/IGovernor.sol";

// import "../lib/forge-std/src/console.sol";

// import "../lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";

contract IgniteLaunchPad {
    /**
     * ======================================================================== *
     * --------------------------- EVENTS ------------------------------------- *
     * ======================================================================== *
     */
    event launchpadCreated(
        address moderator,
        address padtoken,
        uint padDuration
    );
    event DepositedToLaunchPad(address _depositor, uint _ammount);
    event GovernanceInitialized(address Governor, address GovernanceToken);
    event LaunchPadTokenWithdrawn(address _user, uint _ammount);
    event GenesWithdrawnByAdmin(address admin, uint amount);
    event ExpirydateExtended(uint time);
    event NftMinted(address minter);
    event newPresale(address user, uint tokenReceived);
    event PresaleStarted(address user, uint time);
    event PresaleLiquidityEmptied(address admin, uint presaleTotalSupply);

    modifier OnlyModerator() {
        require(msg.sender == padModerator, "NOT LaunchPad Moderator");
        _;
    }

    modifier PadCanceled() {
        require(!padCanceled, "LAUNCHPAD CANCELED BY ADMIN");
        _;
    }

    /**
     * ======================================================================== *
     * --------------------------- ERRORS ------------------------------------- *
     * ======================================================================== *
     */

    error Already_Claimed_Token();
    error Amount_Exceeds_Balance();
    error Didnt_Participate_in_Launchpad();
    error invalidTransferAmount();
    error Insufficient_Presale_Liquidity();
    error LaunchPad_Still_In_Progress();
    error No_Presale_Liquidity();
    error Pad_ended();
    error Pad_ended_check_presale();
    error Presale_Must_Be_Closed();
    error Presale_Not_Open_Yet();
    error Presale_Closed();
    error Exceededs_Instalment_Limit();
    error Exceeds_Presale_Balance();

    using SafeMath for uint256;
    /**
     * ======================================================================== *
     * --------------------------- GENERAL RECORD------------------------------ *
     * ======================================================================== *
     */
    address GeneRouter;
    address feeReceiver;
    address contractOverseer;
    address GenesisToken;
    uint256 totalFees;
    uint256 TokenRateFromPad;
    uint256 launchPadFee;
    bool hasCalcFees;
    uint256 rewardCondition;

    /**
     * ======================================================================== *
     * --------------------------- LAUNCHPAD  RECORD--------------------------- *
     * ======================================================================== *
     */
    bool isActive;
    bool padCanceled;
    address padToken;
    address padModerator;
    address[] launchPadParticipators;
    uint256 PadDuration;
    uint256 LaunchPadTSupply;
    uint256 GenesRaisedByPad;
    uint256 totalPadTokensClaimed;

    /**
     * ======================================================================== *
     * ---------------------------  PRESALE RECORDS---------------------------- *
     * ======================================================================== *
     */

    bool isPresaleClosed;
    uint256 presaleTotalSupply;
    uint256 GenesRaisedFromPresale;
    uint256 percentagePriceIncrease;
    address[] presaleParticipants;

    /**
     * ======================================================================== *
     * ---------------------------  USER RECORDS------------------------------- *
     * ======================================================================== *
     */
    mapping(address => bool) sentRecord;
    mapping(address => bool) sentPresaleRecord;
    mapping(address => bool) hasClaimedLaunchpadTokens;
    mapping(address => bool) hasBeenRewarded;
    mapping(address => uint) userGenesDepositedToLaunchpad;
    mapping(address => uint) launchPadTokensOwned;

    /**
     * ======================================================================== *
     * --------------------------- GOVERNANCE RECORD------------------------------ *
     * ======================================================================== *
     */
    struct GovernanceData {
        uint256 RequestTime;
        uint256 RequestAmount;
        string Description;
    }
    address Governor;
    address GovernanceToken;
    uint256 Instalments;
    uint256 WithdrawnInstalments;
    uint256 TotalEmergencyWithdrawals;
    uint256[] proposalIds;
    uint256[] EmergencyproposalIds;
    uint256 GovernanceBallance;
    mapping(uint256 => GovernanceData) ProposalData;

    address[] target = [address(this)];
    uint[] value = [0];
    bytes[] calldatas;

    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////// CONSTRUCTOR ///////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    constructor(
        address _contractOverseer,
        uint _launchPadFee,
        address _padToken,
        uint256 _LaunchPadTSupply,
        uint256 _preSaleTokenSupply,
        uint256 _PadDuration,
        address _moderator,
        uint _percentagePresalePriceIncrease,
        address _nativeToken,
        uint _rewardCondition,
        address _GeneRouter,
        uint _instalments
    ) {
        GeneRouter = _GeneRouter;
        GenesisToken = _nativeToken;
        rewardCondition = _rewardCondition;
        Instalments = _instalments;
        createLaunchPad(
            _contractOverseer,
            _launchPadFee,
            _padToken,
            msg.sender,
            _LaunchPadTSupply,
            _preSaleTokenSupply,
            _PadDuration,
            _moderator,
            _percentagePresalePriceIncrease
        );
    }

    /**
     * ======================================================================== *
     * ---------------------------  FUNCTIONS --------------------------------- *
     * ======================================================================== *
     */

    //////// ADD FUNCTIONALITY TO COMMUNICATE BACK TO MOTHER THAT PRESALE IS OPENED AND CLOSED
    //// send number of launchpads a user has contributed to, to mother which will track an array of routers

    function InitializeGovernance(
        address _governor,
        address _governanceToken
    ) external {
        require(msg.sender == GeneRouter, "NOT ROUTER CONTRACT");
        Governor = _governor;
        GovernanceToken = _governanceToken;
        emit GovernanceInitialized(Governor, GovernanceToken);
    }

    function createLaunchPad(
        address _contractOverseer,
        uint _launchPadFee,
        address _padToken,
        address _feeReceiver,
        uint256 _LaunchPadTSupply,
        uint256 _preSaleTokenSupply,
        uint256 _PadDuration,
        address _moderator,
        uint _percentagePresalePriceIncrease
    ) internal {
        require(_padToken != address(0));
        require(_LaunchPadTSupply > 0);
        require(_PadDuration > 0);
        if (_preSaleTokenSupply > 0) {
            require(_percentagePresalePriceIncrease > 0, "PERCENTAGE TOO LOW");
            require(
                _percentagePresalePriceIncrease <= 100,
                "PERCENTAGE TOO HIGH"
            );
        }
        recordPadCreation(
            _contractOverseer,
            _launchPadFee,
            _feeReceiver,
            _padToken,
            _LaunchPadTSupply,
            _moderator,
            _PadDuration,
            _preSaleTokenSupply,
            _percentagePresalePriceIncrease
        );
    }

    function participateInLaunchPad(uint _amount) public PadCanceled {
        if (block.timestamp > PadDuration) revert Pad_ended_check_presale();
        if (_amount == 0) revert invalidTransferAmount();
        transferFrom_(IUSDT(GenesisToken), _amount, msg.sender);
        launchPadParticipators.push(msg.sender);
        GenesRaisedByPad += _amount;
        userGenesDepositedToLaunchpad[msg.sender] += _amount;
        if (sentRecord[msg.sender] == false) {
            ILAUNCHPAD(feeReceiver).RecordUserParticipation(msg.sender);
            sentRecord[msg.sender] = true;
        }
        emit DepositedToLaunchPad(msg.sender, _amount);
    }

    function WithdrawLaunchPadToken() external PadCanceled {
        if (hasClaimedLaunchpadTokens[msg.sender] == true)
            revert Already_Claimed_Token();
        if (userGenesDepositedToLaunchpad[msg.sender] == 0)
            revert Didnt_Participate_in_Launchpad();
        if (block.timestamp < PadDuration) revert LaunchPad_Still_In_Progress();
        uint reward = calculateReward();
        hasClaimedLaunchpadTokens[msg.sender] = true;
        totalPadTokensClaimed += reward;
        transfer_(IUSDT(padToken), reward, msg.sender);
        transfer_(IUSDT(GovernanceToken), reward, msg.sender);
        ChangePadState();
        emit LaunchPadTokenWithdrawn(msg.sender, reward);
    }

    function requestInstalmentWithdrawal(
        string memory _description
    ) external OnlyModerator PadCanceled returns (uint256 proposalID) {
        if (Instalments <= WithdrawnInstalments)
            revert Exceededs_Instalment_Limit();
        if (block.timestamp < PadDuration) revert LaunchPad_Still_In_Progress();
        ChangePadState();
        uint amount = GovernanceBallance / Instalments;
        if (WithdrawnInstalments < 1) {
            WithdrawnInstalments = WithdrawnInstalments + 1;
            if (totalFees != 0) {
                transfer_(IUSDT(GenesisToken), totalFees, feeReceiver);
                totalFees = 0;
            }
            transfer_(IUSDT(GenesisToken), amount, msg.sender);
            emit GenesWithdrawnByAdmin(msg.sender, amount);
        } else {
            setCalldata(amount, 1);
            proposalID = IGovernor(Governor).propose(
                target,
                value,
                calldatas,
                _description
            );
            proposalIds.push(proposalID);
            ProposalData[proposalID].Description = _description;
            ProposalData[proposalID].RequestAmount = amount;
            ProposalData[proposalID].RequestTime = block.timestamp;
        }
    }

    function requestEmmergencyWithdrawal(
        uint _amount,
        string memory _description
    ) external OnlyModerator PadCanceled returns (uint256 proposalID) {
        if (isPresaleClosed == false) revert Presale_Must_Be_Closed();
        if ((_amount + TotalEmergencyWithdrawals) > GenesRaisedFromPresale)
            revert Exceeds_Presale_Balance();
        setCalldata(_amount, 2);
        proposalID = IGovernor(Governor).propose(
            target,
            value,
            calldatas,
            _description
        );
        EmergencyproposalIds.push(proposalID);
        ProposalData[proposalID].Description = _description;
        ProposalData[proposalID].RequestAmount = _amount;
        ProposalData[proposalID].RequestTime = block.timestamp;
    }

    function setCalldata(uint _amount, uint choice) internal {
        if (choice == 1) {
            bytes memory _calldatas = bytes(
                abi.encodeWithSignature("TransferToAdmin(uint256)", _amount)
            );
            calldatas = [_calldatas];
        } else if (choice == 2) {
            bytes memory _calldatas = bytes(
                abi.encodeWithSignature(
                    "TransferEmergencyFund(uint256)",
                    _amount
                )
            );
            calldatas = [_calldatas];
        }
    }

    function getProposalIds() external view returns (uint256[] memory) {
        return proposalIds;
    }

    function viewEmergencyProposalIds()
        external
        view
        returns (uint256[] memory)
    {
        return EmergencyproposalIds;
    }

    function TransferToAdmin(uint256 _amount) external PadCanceled {
        require(
            msg.sender == Governor,
            "GOVERNANCE: ONLY ACCESSIBLE TO GOVERNANCE"
        );
        WithdrawnInstalments = WithdrawnInstalments + 1;
        transfer_(IUSDT(GenesisToken), _amount, padModerator);
    }

    function TransferEmergencyFund(uint256 _amount) external PadCanceled {
        require(
            msg.sender == Governor,
            "GOVERNANCE: ONLY ACCESSIBLE TO GOVERNANCE"
        );
        TotalEmergencyWithdrawals = TotalEmergencyWithdrawals + _amount;
        transfer_(IUSDT(GenesisToken), _amount, padModerator);
    }

    function viewProposalData(
        uint256 _ProposalId
    ) external view returns (GovernanceData memory governanceDetails_) {
        governanceDetails_ = ProposalData[_ProposalId];
    }

    function viewGovernanceAddresses()
        external
        view
        returns (address _governor, address _governanceToken)
    {
        _governor = Governor;
        _governanceToken = GovernanceToken;
    }

    function viewGovernanceData()
        external
        view
        returns (
            uint Instalments_,
            uint WithdrawnInstalments_,
            uint TotalEmergencyWithdrawals_,
            uint GovernanceBallance_
        )
    {
        Instalments_ = Instalments;
        WithdrawnInstalments_ = WithdrawnInstalments;
        TotalEmergencyWithdrawals_ = TotalEmergencyWithdrawals;
        GovernanceBallance_ = GovernanceBallance;
    }

    function extendLaunchPadExpiry(
        uint extraMinutes
    ) public OnlyModerator PadCanceled returns (bool success) {
        if (block.timestamp > PadDuration) revert Pad_ended();
        PadDuration = PadDuration.add((extraMinutes * 1 minutes));
        success = true;
        emit ExpirydateExtended(extraMinutes);
    }

    function participateInPresale(uint _amount) public PadCanceled {
        require(block.timestamp > PadDuration, "LAUNCHPAD STILL IN PROGRESS");
        ChangePadState();
        if (isActive == true) revert Presale_Not_Open_Yet();
        if (presaleTotalSupply == 0) revert No_Presale_Liquidity();
        if (isPresaleClosed == true) revert Presale_Closed();
        uint tokenReceived = calculateObtainedToken(_amount);
        if (tokenReceived > presaleTotalSupply)
            revert Insufficient_Presale_Liquidity();
        bool successful = IUSDT(GenesisToken).transferFrom(
            msg.sender,
            address(this),
            _amount
        );
        require(successful, "ERROR TRANSFERING TOKENS");
        presaleTotalSupply = presaleTotalSupply.sub(tokenReceived);
        GenesRaisedFromPresale = GenesRaisedFromPresale.add(_amount);
        presaleParticipants.push(msg.sender);
        bool success = IUSDT(padToken).transfer(msg.sender, tokenReceived);
        bool success2 = IUSDT(GovernanceToken).transfer(
            msg.sender,
            tokenReceived
        );
        if (sentPresaleRecord[msg.sender] == false) {
            ILAUNCHPAD(feeReceiver).RecordUserPresaleParticipation(msg.sender);
            sentPresaleRecord[msg.sender] = true;
        }
        require(success, "ERROR TRANSFERING TOKENS");
        require(success2, "ERROR TRANSFERING TOKENS");
        emit newPresale(msg.sender, tokenReceived);
    }

    function endPresale() public OnlyModerator {
        if (isPresaleClosed == true) revert Presale_Closed();
        isPresaleClosed = true;
        ILAUNCHPAD(feeReceiver).presaleEnded();
    }

    function viewGenesRaisedFromPresale() public view returns (uint Genes) {
        Genes = GenesRaisedFromPresale;
    }

    function viewPresaleTokenBalance() public view returns (uint tokenBalance) {
        tokenBalance = presaleTotalSupply;
    }

    function displayPresaleParticipants()
        public
        view
        returns (address[] memory)
    {
        return presaleParticipants;
    }

    function DisplayRateFromLaunchPad() public view returns (uint rate) {
        rate = TokenRateFromPad;
    }

    function withdrawExcessPresaleTokken() public OnlyModerator PadCanceled {
        if (isPresaleClosed == false) revert Presale_Must_Be_Closed();
        transfer_(IUSDT(padToken), presaleTotalSupply, msg.sender);
        emit PresaleLiquidityEmptied(msg.sender, presaleTotalSupply);
    }

    function viewGenesRaisedFromLaunchPad() public view returns (uint Raised) {
        Raised = GenesRaisedByPad;
    }

    function displayNoOfLaunchPadContributors()
        public
        view
        returns (uint contributors)
    {
        contributors = launchPadParticipators.length;
    }

    function displayLaunchPadContributors()
        public
        view
        returns (address[] memory)
    {
        return launchPadParticipators;
    }

    function calculateReward() internal returns (uint256 reward) {
        uint contribution = userGenesDepositedToLaunchpad[msg.sender];
        if (
            contribution >= rewardCondition &&
            hasBeenRewarded[msg.sender] == false
        ) {
            hasBeenRewarded[msg.sender] = true;
            IROUTER(GeneRouter).mintNft(msg.sender);
            emit NftMinted(msg.sender);
        }
        reward = ((contribution.mul(LaunchPadTSupply)).div(GenesRaisedByPad));
        launchPadTokensOwned[msg.sender] = reward;
    }

    function ChangePadState() internal {
        if (isActive == true) {
            isActive = false;
            ILAUNCHPAD(feeReceiver).presaleActivated();
            emit PresaleStarted(padToken, block.timestamp);
        }
        if (hasCalcFees == false) {
            uint Fee = ((launchPadFee * GenesRaisedByPad) / 100);
            totalFees = Fee;
            GovernanceBallance = GenesRaisedByPad - totalFees;
            hasCalcFees = true;
        }
        if (TokenRateFromPad == 0) {
            calculateTokenPrice();
        }
    }

    function calculateTokenPrice() internal {
        uint determiner = 1 ether;
        uint price = ((LaunchPadTSupply * determiner) / GenesRaisedByPad);
        TokenRateFromPad = price;
    }

    function calculateObtainedToken(
        uint _value
    ) internal view returns (uint ammount) {
        uint determiner = ((percentagePriceIncrease * 1 ether) / 100) + 1 ether;
        ammount = (_value * TokenRateFromPad) / determiner;
    }

    function transferFrom_(
        IUSDT _token,
        uint _ammount,
        address _from
    ) internal {
        bool Status_ = _token.transferFrom(
            _from,
            address(this),
            uint(_ammount)
        );
        require(Status_, "TRANSFER FAILED");
    }

    function transfer_(IUSDT _token, uint _ammount, address _to) internal {
        bool Status_ = _token.transfer(_to, uint(_ammount));
        require(Status_, "TRANSFER FAILED");
    }

    function getGenesDepositedByUser(
        address _user
    ) external view returns (uint amount) {
        amount = userGenesDepositedToLaunchpad[_user];
    }

    function recordPadCreation(
        address _contractOverseer,
        uint _launchPadFee,
        address _feeReceiver,
        address _padToken,
        uint _LaunchPadTSupply,
        address _moderator,
        uint _PadDuration,
        uint _preSaleTokenSupply,
        uint _percentageIncrease
    ) internal {
        contractOverseer = _contractOverseer;
        launchPadFee = _launchPadFee;
        isActive = true;
        padToken = _padToken;
        LaunchPadTSupply = _LaunchPadTSupply;
        PadDuration = ((_PadDuration * 1 minutes) + block.timestamp);
        padModerator = _moderator;
        presaleTotalSupply = _preSaleTokenSupply;
        percentagePriceIncrease = _percentageIncrease;
        feeReceiver = _feeReceiver;
        emit launchpadCreated(_moderator, _padToken, PadDuration);
    }

    function emergencyCancelLaunchpad() external {
        require(msg.sender == feeReceiver);
        padCanceled = true;
    }

    function emergencyRefund(uint _amount) external {
        require(padCanceled, "ONLY AVAILABLE IF PAD IS CANCELED");
        require(msg.sender == feeReceiver);
        transfer_(IUSDT(GenesisToken), _amount, msg.sender);
    }

    function viewLaunchPadTSupply() external view returns (uint) {
        return LaunchPadTSupply;
    }

    function viewLaunchPadToken() external view returns (address) {
        return padToken;
    }

    function viewLaunchPadEndTime() external view returns (uint) {
        return PadDuration;
    }

    function isPresaleActive() external view returns (bool) {
        return isPresaleClosed;
    }

    function PercentagePriceIncrease() external view returns (uint) {
        return percentagePriceIncrease;
    }

    function hasUserClaimedLP(
        address _user
    ) external view returns (bool status) {
        status = hasClaimedLaunchpadTokens[_user];
    }

    function returnPadModerator() public view returns (address) {
        return padModerator;
    }
}
