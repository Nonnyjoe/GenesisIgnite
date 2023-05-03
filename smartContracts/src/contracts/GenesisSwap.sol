// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "../../lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";
import "../../lib/openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import "../../lib/chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "../interface/IGENE.sol";

contract GenesisSwap {
    error invalidTransferAmount();
    error priceFeedError();
    error minimumConversionIs_10_Dollar();

    address Admin;
    address GeneToken;
    address DaiAddress;
    address UsdcAddress;
    uint EthBalance;
    uint DaiBalance;
    uint UsdcBalance;

    AggregatorV3Interface internal priceFeedDai;
    AggregatorV3Interface internal priceFeedEth;
    AggregatorV3Interface internal priceFeedUni;
    AggregatorV3Interface internal priceFeedUsdc;

    constructor(address _geneToken) {
        GeneToken = _geneToken;
        Admin = msg.sender;

        priceFeedDai = AggregatorV3Interface(
            0x14866185B1962B63C3Ea9E03Bc1da838bab34C19
        );
        priceFeedEth = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
        priceFeedUsdc = AggregatorV3Interface(
            0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E
        );
    }

    function setTokenAddresses(address _Daiaddr, address _UsdcAddr) external {
        require(msg.sender == Admin, "ACCESS DENIED");
        DaiAddress = _Daiaddr;
        UsdcAddress = _UsdcAddr;
    }

    function swapEthToGene() external payable {
        require(!isContract(msg.sender), "CONTRACT ADDRESS DETECTED");
        if (msg.value <= 0) revert invalidTransferAmount();
        int Iprice = (getEthPrice() / 1e8);
        if (Iprice == 0) revert priceFeedError();
        uint PriceMin = (1 ether * 10) / uint(Iprice);
        if (PriceMin > msg.value) revert minimumConversionIs_10_Dollar();
        // CALCULATE THE WORTH OF GENES TOKEN A USER IS TO RECEIVE
        uint GenesReceived = ((uint(Iprice) * msg.value) * (10 ** 18)) /
            1 ether;
        EthBalance += msg.value;
        IGENE(GeneToken).transfer(msg.sender, GenesReceived);
    }

    function swapGeneForEth(uint _amount) external {
        require(!isContract(msg.sender), "CONTRACT ADDRESS DETECTED");
        if (_amount < (11 * (10 ** 18))) revert minimumConversionIs_10_Dollar();
        IGENE(GeneToken).transferFrom(msg.sender, address(this), _amount);
        int Iprice = (getEthPrice() / 1e8);
        if (Iprice == 0) revert priceFeedError();
        uint EthReceived = ((1 ether * (_amount / 10 ** 18)) / uint(Iprice));
        EthBalance -= EthReceived;
        (bool status, ) = payable(msg.sender).call{value: EthReceived}("");
        require(status, "TRANSFER ERROR");
    }

    function swapGeneToDai(uint _amount) external {
        require(!isContract(msg.sender), "CONTRACT ADDRESS DETECTED");
        if (_amount < (11 * (10 ** 18))) revert minimumConversionIs_10_Dollar();
        IGENE(GeneToken).transferFrom(msg.sender, address(this), _amount);
        int Iprice = (getDaiPrice());
        if (Iprice == 0) revert priceFeedError();
        uint DaiToReceive = (((_amount) / (uint(Iprice))) * 10 ** 8);
        require(DaiBalance >= DaiToReceive, "INSUFFICIENT LIQUIDITY");
        DaiBalance -= DaiToReceive;
        IGENE(DaiAddress).transfer(msg.sender, DaiToReceive);
    }

    function swapGeneToUsdc(uint _amount) external {
        require(!isContract(msg.sender), "CONTRACT ADDRESS DETECTED");
        if (_amount < (11 * (10 ** 18))) revert minimumConversionIs_10_Dollar();
        IGENE(GeneToken).transferFrom(msg.sender, address(this), _amount);
        int Iprice = (getUsdcPrice());
        if (Iprice == 0) revert priceFeedError();
        uint UsdcToReceive = (((_amount) / (uint(Iprice))) * 10 ** 8);
        require(UsdcBalance >= UsdcToReceive, "INSUFFICIENT LIQUIDITY");
        UsdcBalance -= UsdcToReceive;
        IGENE(UsdcAddress).transfer(msg.sender, UsdcToReceive);
    }

    function swapDaiToGene(uint _amount) external {
        require(!isContract(msg.sender), "CONTRACT ADDRESS DETECTED");
        if (_amount < (11 * (10 ** 18))) revert minimumConversionIs_10_Dollar();
        IGENE(DaiAddress).transferFrom(msg.sender, address(this), _amount);
        DaiBalance += _amount;
        int Iprice = (getDaiPrice());
        if (Iprice == 0) revert priceFeedError();
        uint GenesReceived = ((uint(Iprice) * _amount) / 1e8);
        IGENE(GeneToken).transfer(msg.sender, GenesReceived);
    }

    function swapUsdcToGene(uint _amount) external {
        require(!isContract(msg.sender), "CONTRACT ADDRESS DETECTED");
        if (_amount < (11 * (10 ** 18))) revert minimumConversionIs_10_Dollar();
        IGENE(UsdcAddress).transferFrom(msg.sender, address(this), _amount);
        UsdcBalance += _amount;
        int Iprice = (getUsdcPrice());
        if (Iprice == 0) revert priceFeedError();
        uint GenesReceived = ((uint(Iprice) * _amount) / 1e8);
        IGENE(GeneToken).transfer(msg.sender, GenesReceived);
    }

    function recoverTokens(uint _amount, address _tokenAddr) external {
        require(msg.sender == Admin, "ACCESS DENIED");
        IGENE(_tokenAddr).transfer(msg.sender, _amount);
    }

    function withdrawEth(uint _amount) external {
        require(msg.sender == Admin, "ACCESS DENIED");
        require(address(this).balance > _amount, "INSUFFICIENT BALANCE");
        payable(Admin).transfer(_amount);
    }

    function DisplayDaiBalance() external view returns (uint balance) {
        balance = DaiBalance;
    }

    function DisplayUsdcBalance() external view returns (uint balance) {
        balance = UsdcBalance;
    }

    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }

    function getLatestPrice_(
        AggregatorV3Interface _pricefeed
    ) internal view returns (int) {
        (, int price, , , ) = _pricefeed.latestRoundData();
        return (price);
    }

    function getEthPrice() internal view returns (int price) {
        price = getLatestPrice_(priceFeedEth);
    }

    function getDaiPrice() internal view returns (int price) {
        price = getLatestPrice_(priceFeedDai);
    }

    function getUsdcPrice() internal view returns (int price) {
        price = getLatestPrice_(priceFeedUsdc);
    }

    receive() external payable {}
}
