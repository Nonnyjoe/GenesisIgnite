// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "../lib/openzeppelin-contracts/contracts/utils/math/SafeMath.sol";

contract Escrow {
    event buyAddCreated(
        uint escrowId,
        address token,
        address creator,
        uint amount
    );
    event sellAddCreated(
        uint escrowId,
        address token,
        address creator,
        uint amount
    );
    event buyAddFilled(
        uint escrowId,
        address token,
        address filler,
        uint amount
    );
    event sellAddFilled(
        uint escrowId,
        address token,
        address filler,
        uint amount
    );
    event tokenRecovered(address token, address admin, uint amount);

    error Insufficient_Liquidity();
    error escrowPurchased();
    error escrowCanceled();

    enum SellStatus {
        None,
        pending,
        sold,
        canceled
    }

    enum sellRate {
        abovePrice,
        belowPrice,
        marketPrice
    }

    struct EscrowDetails {
        address tokenContract;
        address proposer;
        uint amount;
        uint rate;
        uint expectedExchangeAmount;
        SellStatus status;
    }

    struct FillerDetails {
        address filler;
        uint paid;
        uint received;
    }

    address public tokenIgnite;
    address private arbitrator;
    address private shibaInu = 0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE;
    address private uniToken = 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984;
    address private linkToken = 0x514910771AF9Ca656af840dff83E8264EcF986CA;
    address private flokiToken = 0xcf0C122c6b73ff809C693DB761e7BaeBe62b6a2E;

    uint private escrowID;
    uint[] private escrowsTracker;
    mapping(uint => uint) EscrowIndexTracker;
    mapping(uint => EscrowDetails) public escrowDetails;
    mapping(uint => FillerDetails[]) public fillerDetails;
    mapping(address => mapping(bool => uint256[])) tokenToEscrowPosition;
    mapping(uint => bool) escrowPosition;
    mapping(address => uint256) feesGenerated;
    mapping(address => bool) public p2pTokens;

    constructor() {
        arbitrator = msg.sender;
        p2pTokens[shibaInu] = true;
        p2pTokens[uniToken] = true;
        p2pTokens[linkToken] = true;
        p2pTokens[flokiToken] = true;
    }

    function openEscrows() public view returns (uint) {
        return escrowsTracker.length;
    }

    function placeBuyAdd(
        address _tokenAddr,
        uint _amount,
        uint _rate
    ) external returns (uint256) {
        require(_tokenAddr != address(0), "Invalid Address");
        require(
            p2pTokens[_tokenAddr] == true,
            "Token transaction not allowed yet"
        );
        require(msg.sender != arbitrator, "Admin not Permitted");

        bool status = IERC20(_tokenAddr).transferFrom(
            address(msg.sender),
            address(this),
            _amount
        );
        require(status, "TRANSFER ERROR");
        uint256 amountToGet = (_amount * (_rate * 10 ** 18)) / 1 ether;
        EscrowDetails memory _escrowDetails;
        _escrowDetails.tokenContract = _tokenAddr;
        _escrowDetails.proposer = msg.sender;
        _escrowDetails.amount = _amount;
        _escrowDetails.rate = _rate;
        _escrowDetails.expectedExchangeAmount = amountToGet;
        _escrowDetails.status = SellStatus.pending;

        escrowID = escrowID + 1;
        escrowDetails[escrowID] = _escrowDetails;
        escrowsTracker.push(escrowID);
        escrowPosition[escrowID] = true;
        tokenToEscrowPosition[_tokenAddr][true].push(escrowID);
        emit buyAddCreated(escrowID, _tokenAddr, msg.sender, _amount);
        return escrowID;
    }

    function placeSellAdd(
        address _tokenAddr,
        uint _amount,
        uint _rate
    ) external returns (uint256) {
        require(_tokenAddr != address(0), "Invalid Address");
        require(
            p2pTokens[_tokenAddr] == true,
            "Token transaction not allowed yet"
        );
        require(msg.sender != arbitrator, "Admin not Permitted");

        bool status = IERC20(tokenIgnite).transferFrom(
            address(msg.sender),
            address(this),
            _amount
        );
        require(status, "TRANSFER ERROR");
        uint256 amountToGet = (_amount * 1 ether) / (_rate * 10 ** 18);
        EscrowDetails memory _escrowDetails;
        _escrowDetails.tokenContract = _tokenAddr;
        _escrowDetails.proposer = msg.sender;
        _escrowDetails.amount = _amount;
        _escrowDetails.rate = _rate;
        _escrowDetails.expectedExchangeAmount = amountToGet;
        _escrowDetails.status = SellStatus.pending;
        escrowID = escrowID + 1;
        escrowDetails[escrowID] = _escrowDetails;
        escrowsTracker.push(escrowID);
        EscrowIndexTracker[escrowID] =
            tokenToEscrowPosition[_tokenAddr][false].length -
            1;
        tokenToEscrowPosition[_tokenAddr][false].push(escrowID);
        emit sellAddCreated(escrowID, _tokenAddr, msg.sender, _amount);
        return escrowID;
    }

    function fillSellAdd(uint _amount, uint _escrowID) external {
        require(escrowDetails[_escrowID].amount > 0, "Escrow purchased");
        if (escrowDetails[_escrowID].status == SellStatus.sold)
            revert escrowPurchased();
        if (escrowDetails[_escrowID].status == SellStatus.canceled)
            revert escrowCanceled();
        EscrowDetails storage _ed = escrowDetails[_escrowID];
        bool status = IERC20(_ed.tokenContract).transferFrom(
            address(msg.sender),
            address(this),
            _amount
        );
        require(status, "TRANSFER ERROR");
        uint256 amountToGet = (_amount * (_ed.rate * 10 ** 18)) / 1 ether;
        if (amountToGet > _ed.amount) revert Insufficient_Liquidity();
        FillerDetails memory _fd;
        _fd.filler = msg.sender;
        _fd.paid = _amount;
        _fd.received = amount2Receive(amountToGet, 99);
        _ed.amount = _ed.amount - amountToGet;
        fillerDetails[_escrowID].push(_fd);
        _ed.expectedExchangeAmount = _ed.expectedExchangeAmount - _amount;
        if (_ed.amount == 0) {
            escrowDetails[_escrowID].status = SellStatus.sold;
            uint escrowIndex = EscrowIndexTracker[_escrowID];
            tokenToEscrowPosition[_ed.tokenContract][false][
                escrowIndex
            ] = tokenToEscrowPosition[_ed.tokenContract][false][
                tokenToEscrowPosition[_ed.tokenContract][false].length - 1
            ];
            EscrowIndexTracker[
                tokenToEscrowPosition[_ed.tokenContract][false][escrowIndex]
            ] = escrowIndex;
            tokenToEscrowPosition[_ed.tokenContract][false].pop();
        }
        bool status1 = IERC20(tokenIgnite).transfer(
            msg.sender,
            amount2Receive(amountToGet, 99)
        );
        bool status2 = IERC20(_ed.tokenContract).transfer(
            _ed.proposer,
            amount2Receive(_amount, 99)
        );
        require(status1 && status2, "TRANSFER ERROR");
        feesGenerated[_ed.tokenContract] += amount2Receive(_amount, 1);
        feesGenerated[tokenIgnite] += amount2Receive(amountToGet, 1);
        emit sellAddFilled(_escrowID, _ed.tokenContract, msg.sender, _amount);
    }

    function fillBuyAdd(uint _amount, uint _escrowID) external {
        require(escrowDetails[_escrowID].amount > 0, "Escrow purchased");
        if (escrowDetails[_escrowID].status == SellStatus.sold)
            revert escrowPurchased();
        if (escrowDetails[_escrowID].status == SellStatus.canceled)
            revert escrowCanceled();
        bool status = IERC20(tokenIgnite).transferFrom(
            address(msg.sender),
            address(this),
            _amount
        );
        require(status, "TRANSFER ERROR");

        EscrowDetails storage _ed = escrowDetails[_escrowID];
        uint256 amountToGet = (_amount * 1 ether) / (_ed.rate * 10 ** 18);
        if (amountToGet > _ed.amount) revert Insufficient_Liquidity();
        FillerDetails memory _fd;
        _fd.filler = msg.sender;
        _fd.paid = _amount;
        _fd.received = amount2Receive(amountToGet, 99);
        _ed.amount = _ed.amount - amountToGet;
        fillerDetails[_escrowID].push(_fd);
        _ed.expectedExchangeAmount = _ed.expectedExchangeAmount - _amount;
        if (_ed.amount == 0) {
            escrowDetails[_escrowID].status = SellStatus.sold;
            uint escrowIndex = EscrowIndexTracker[_escrowID];
            tokenToEscrowPosition[_ed.tokenContract][true][
                escrowIndex
            ] = tokenToEscrowPosition[_ed.tokenContract][true][
                tokenToEscrowPosition[_ed.tokenContract][true].length - 1
            ];
            EscrowIndexTracker[
                tokenToEscrowPosition[_ed.tokenContract][true][escrowIndex]
            ] = escrowIndex;
            tokenToEscrowPosition[_ed.tokenContract][true].pop();
        }

        bool status1 = IERC20(_ed.tokenContract).transfer(
            msg.sender,
            amount2Receive(amountToGet, 99)
        );
        bool status2 = IERC20(tokenIgnite).transfer(
            _ed.proposer,
            amount2Receive(_amount, 99)
        );
        require(status1 && status2, "TRANSFER ERROR");
        feesGenerated[_ed.tokenContract] += amount2Receive(amountToGet, 1);
        feesGenerated[tokenIgnite] += amount2Receive(_amount, 1);
        ////////////////////////////
        emit buyAddFilled(_escrowID, _ed.tokenContract, msg.sender, _amount);
    }

    function cancelEscrow(uint _escrowID) external {
        address proposer = escrowDetails[_escrowID].proposer;
        address Etoken = escrowDetails[_escrowID].tokenContract;
        SellStatus escrowStatus = escrowDetails[_escrowID].status;
        uint escrowBal = escrowDetails[_escrowID].amount;
        require(
            msg.sender == proposer || msg.sender == arbitrator,
            "Unauthrized Operation"
        );
        require(escrowStatus == SellStatus.pending, "Escrow Closed");
        require(escrowBal > 0, "Escrow Empty");

        bool position = escrowPosition[escrowID];
        uint escrowIndex = EscrowIndexTracker[_escrowID];

        tokenToEscrowPosition[Etoken][position][
            escrowIndex
        ] = tokenToEscrowPosition[Etoken][position][
            tokenToEscrowPosition[Etoken][position].length - 1
        ];
        EscrowIndexTracker[
            tokenToEscrowPosition[Etoken][position][escrowIndex]
        ] = escrowIndex;

        escrowDetails[_escrowID].amount = 0;
        escrowDetails[_escrowID].status = SellStatus.canceled;
        IERC20(Etoken).transfer(proposer, escrowBal);

        //@dev: lets not delete it so we can have the order details in record
        // delete escrowDetails[_escrowID];
    }

    function displayBuyAdds(
        address _token
    ) external view returns (uint256[] memory escrows) {
        escrows = tokenToEscrowPosition[_token][true];
    }

    function displaySellAdds(
        address _token
    ) external view returns (uint256[] memory escrows) {
        escrows = tokenToEscrowPosition[_token][false];
    }

    function displayAllAdds() external view returns (uint256[] memory escrows) {
        escrows = escrowsTracker;
    }

    function displayEscrowDetails(
        uint _escrowId
    ) external view returns (EscrowDetails memory _escrows) {
        _escrows = escrowDetails[_escrowId];
    }

    function amount2Receive(
        uint _mainAmount,
        uint _percentage
    ) internal pure returns (uint256 amount) {
        amount = (_percentage * _mainAmount) / 100;
    }

    function recoverTokens(uint _amount, address _tokenAddr) external {
        require(msg.sender == arbitrator, "ACCESS DENIED");
        if (p2pTokens[_tokenAddr] == true) {
            require(
                _amount <= feesGenerated[_tokenAddr],
                "NOT ENOUGH FEES YET"
            );
        }
        IERC20(_tokenAddr).transfer(msg.sender, _amount);
        emit tokenRecovered(_tokenAddr, msg.sender, _amount);
    }

    function displayGeneratedFees(
        address _add
    ) external view returns (uint256 fees) {
        fees = feesGenerated[_add];
    }
}
