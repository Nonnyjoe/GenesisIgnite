// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "../interface/INFT.sol";
import "../../lib/chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "../../lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";

contract swapDexPoseidon {
    event launcpadRegistered(address _launchPad);

    AggregatorV3Interface internal priceFeedDai;
    AggregatorV3Interface internal priceFeedEth;
    AggregatorV3Interface internal priceFeedUni;
    AggregatorV3Interface internal priceFeedUsdc;

    address admin;
    address LaunchPadFactory;
    address NftAddress;
    address[] Launchpads;
    bool init;
    uint256 NftCounter;
    mapping(address => uint256) private LaunchpadIndex;

    // constructor(address _launchpadFactory) {
    constructor() {
        priceFeedDai = AggregatorV3Interface(
            0x14866185B1962B63C3Ea9E03Bc1da838bab34C19
        );
        priceFeedEth = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
        priceFeedUsdc = AggregatorV3Interface(
            0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E
        );
        admin = msg.sender;
        // LaunchPadFactory = _launchpadFactory;
    }

    modifier OnlyAdmin() {
        require(msg.sender == admin, "NOT ADMIN");
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

    function RegisterLaunchpad(address _launchPad) external OnlyLaunchpad {
        Launchpads.push(_launchPad);
        LaunchpadIndex[_launchPad] = Launchpads.length;
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

    function getLatestPrice_(
        AggregatorV3Interface _pricefeed
    ) internal view returns (int) {
        (, int price, , , ) = _pricefeed.latestRoundData();
        return (price);
    }

    function getEthPrice() external view returns (int price) {
        price = getLatestPrice_(priceFeedEth);
    }

    function getDaiPrice() external view returns (int price) {
        price = getLatestPrice_(priceFeedDai);
    }

    // function getUniPrice() external view returns (int price) {
    //     price = getLatestPrice_(priceFeedUni);
    // }

    function getUsdcPrice() external view returns (int price) {
        price = getLatestPrice_(priceFeedUsdc);
    }
}
