// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "../../lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";
import "../../lib/openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import "../interface/IPOSEIDON.sol";
import "../interface/IGENE.sol";

contract GenesisSwap {
    error invalidTransferAmount();
    error priceFeedError();
    error minimumConversionIs_10_Dollar();

    address Admin;
    address Poseidon;
    address GeneToken;
    address DaiAddress;
    address UsdcAddress;
    uint EthBalance;
    uint DaiBalance;
    uint UsdcBalance;

    constructor(address _poseidon, address _geneToken) {
        Poseidon = _poseidon;
        GeneToken = _geneToken;
        Admin = msg.sender;
    }

    function setTokenAddresses(address _Daiaddr, address _UsdcAddr) external {
        require(msg.sender == Admin, "ACCESS DENIED");
        DaiAddress = _Daiaddr;
        UsdcAddress = _UsdcAddr;
    }

    function swapEthToGene() external payable {
        require(!isContract(msg.sender), "CONTRACT ADDRESS DETECTED");
        if (msg.value <= 0) revert invalidTransferAmount();
        int Iprice = (IPOSEIDON(Poseidon).getEthPrice() / 1e8);
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
        int Iprice = (IPOSEIDON(Poseidon).getEthPrice() / 1e8);
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
        int Iprice = (IPOSEIDON(Poseidon).getDaiPrice());
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
        int Iprice = (IPOSEIDON(Poseidon).getUsdcPrice());
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
        int Iprice = (IPOSEIDON(Poseidon).getDaiPrice());
        if (Iprice == 0) revert priceFeedError();
        uint GenesReceived = ((uint(Iprice) * _amount) / 1e8);
        IGENE(GeneToken).transfer(msg.sender, GenesReceived);
    }

    function swapUsdcToGene(uint _amount) external {
        require(!isContract(msg.sender), "CONTRACT ADDRESS DETECTED");
        if (_amount < (11 * (10 ** 18))) revert minimumConversionIs_10_Dollar();
        IGENE(UsdcAddress).transferFrom(msg.sender, address(this), _amount);
        UsdcBalance += _amount;
        int Iprice = (IPOSEIDON(Poseidon).getUsdcPrice());
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

    receive() external payable {}
}
