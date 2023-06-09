// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../lib/forge-std/src/Test.sol";
import "../lib/forge-std/src/Test.sol";
// import "../src/contracts/StarDaoToken.sol";
import "../src/contracts/LaunchPad/IgniteLaunchPad.sol";
import "../src/contracts/swapDexPoseidon.sol";
import "../src/contracts/LaunchPad/IgniteLaunchPadFactory.sol";
import "../lib/openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import "../src/interface/IUSDT.sol";
import "../src/interface/IUSDT.sol";
import "../src/contracts/GenesisSwap.sol";
import "../src/interface/IGENESISCONTROLLER.sol";
import "../lib/openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import "../src/contracts/tokens/mockToken.sol";

contract more is Script {
    swapDexPoseidon public router;
    // StarDaoToken public starDaoToken;
    // StarDaoToken public launchpadToken1;
    // StarDaoToken public launchpadToken2;
    // StarDaoToken public launchpadToken3;
    // StarDaoToken public launchpadToken4;
    MockToken public launchpadToken5;
    address Admin = 0xA771E1625DD4FAa2Ff0a41FA119Eb9644c9A46C8;
    address padCreator = 0xA771E1625DD4FAa2Ff0a41FA119Eb9644c9A46C8;
    // address igniteLaunchPadFactory = 0x74EBAD5E6975D917E6261632946358bC8aaa2b65;
    // address igniteLaunchPadFactory =
    //     address(0x063F23aAfaA0B39a1Cf42827f77da0CA04840523);

    address GIT = 0x7b061BF3e978b387Ed22d1b0812B764Fb421014B;
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

    function setUp() public {}

    function run() public {
        // uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        // createLaunchPad2();
        // createLaunchPad3();
        // createLaunchPad4();
        // createLaunchPad5();
        // launchpadToken5 = new MockToken();
        registerLaunchPad(
            120,
            address(0x8760DD5CCDe41e812E62D6df4c3e06f8233931df),
            Admin,
            "Genesis Farms",
            "GFT",
            12960,
            15,
            4
        );
    }

    // function createLaunchPad2() internal {
    //     // uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    //     // vm.startBroadcast(deployerPrivateKey);
    //     // launchpadToken2 = new StarDaoToken(Admin, "Lights Song", "LHS");
    //     address launchpadToken2 = address(
    //         0x8760DD5CCDe41e812E62D6df4c3e06f8233931df
    //     );
    //     IGENESISCONTROLLER(igniteLaunchPadFactory).registerLaunchPads(
    //         padCreator,
    //         address(launchpadToken2),
    //         119,
    //         (block.timestamp - 10),
    //         (1000000 * 10 ** 18),
    //         4
    //     );
    //     IUSDT(launchpadToken2).approve(
    //         address(igniteLaunchPadFactory),
    //         100000000000000 * 10 ** 18
    //     );
    //     IGENESISCONTROLLER(0x063F23aAfaA0B39a1Cf42827f77da0CA04840523)
    //         .createLaunchPad(
    //             uint(120),
    //             address(launchpadToken2),
    //             "Genesis Farms",
    //             "GFT",
    //             (1000000 * 10 ** 18),
    //             (600000 * 10 ** 18),
    //             12960,
    //             15
    //         );
    //     // address[] memory pads = ILAUNCHPADFACTORY(igniteLaunchPadFactory)
    //     //     .getLaunchPads();
    //     // IUSDT(GIT).approve(pads[5], (10000 * 10 ** 18));
    //     // ILAUNCHPAD(pads[5]).participateInLaunchPad(5000 * 10 ** 18);
    // }

    function registerLaunchPad(
        uint regNo,
        address tokenAddr,
        address _padCreator,
        string memory Name,
        string memory Symbol,
        uint duration,
        uint pIncrease,
        uint _instalments
    ) internal {
        IGENESISCONTROLLER igniteLaunchPadFactory = IGENESISCONTROLLER(
            0x063F23aAfaA0B39a1Cf42827f77da0CA04840523
        );
        igniteLaunchPadFactory.registerLaunchPads(
            address(0x13B109506Ab1b120C82D0d342c5E64401a5B6381),
            address(tokenAddr),
            regNo,
            (125415),
            (700000 * 10 ** 18),
            _instalments
        );
        IUSDT(tokenAddr).approve(
            address(igniteLaunchPadFactory),
            100000000000000 * 10 ** 18
        );
        igniteLaunchPadFactory.createLaunchPad(
            uint(104),
            address(0x1F8a1018d1f84749aD4aE3d3711Cc98b79E8f962),
            Name,
            Symbol,
            (29000 * 10 ** 18),
            (10000 * 10 ** 18),
            duration,
            pIncrease
        );
    }

    // function createLaunchPad3() internal {
    //     // vm.startBroadcast(deployerPrivateKey);
    //     launchpadToken3 = new StarDaoToken(Admin, "Futures ", "FTR");
    //     ILAUNCHPADFACTORY(igniteLaunchPadFactory).registerLaunchPads(
    //         padCreator,
    //         address(launchpadToken3),
    //         107,
    //         (block.timestamp - 10),
    //         (10000 * 10 ** 18)
    //     );
    //     launchpadToken3.approve(
    //         address(igniteLaunchPadFactory),
    //         100000000000000 * 10 ** 18
    //     );
    //     ILAUNCHPADFACTORY(igniteLaunchPadFactory).createLaunchPad(
    //         uint(107),
    //         address(launchpadToken3),
    //         "Futures",
    //         "FTR",
    //         (10000 * 10 ** 18),
    //         (50000 * 10 ** 18),
    //         5,
    //         20
    //     );
    //     address[] memory pads = ILAUNCHPADFACTORY(igniteLaunchPadFactory)
    //         .getLaunchPads();
    //     IUSDT(GIT).approve(pads[6], (10000 * 10 ** 18));
    //     ILAUNCHPAD(pads[6]).participateInLaunchPad(5000 * 10 ** 18);
    // }

    // function createLaunchPad4() internal {
    //     // vm.startBroadcast(deployerPrivateKey);
    //     launchpadToken4 = new StarDaoToken(Admin, "Interconnected", "IRC");
    //     ILAUNCHPADFACTORY(igniteLaunchPadFactory).registerLaunchPads(
    //         padCreator,
    //         address(launchpadToken4),
    //         108,
    //         (block.timestamp - 10),
    //         (10000 * 10 ** 18)
    //     );
    //     launchpadToken4.approve(
    //         address(igniteLaunchPadFactory),
    //         100000000000000 * 10 ** 18
    //     );
    //     ILAUNCHPADFACTORY(igniteLaunchPadFactory).createLaunchPad(
    //         uint(108),
    //         address(launchpadToken4),
    //         "Interconnected",
    //         "IRC",
    //         (10000 * 10 ** 18),
    //         (50000 * 10 ** 18),
    //         5,
    //         15
    //     );
    //     address[] memory pads = ILAUNCHPADFACTORY(igniteLaunchPadFactory)
    //         .getLaunchPads();
    //     IUSDT(GIT).approve(pads[7], (10000 * 10 ** 18));
    //     ILAUNCHPAD(pads[7]).participateInLaunchPad(5000 * 10 ** 18);
    // }

    // function createLaunchPad5() internal {
    //     // vm.startBroadcast(deployerPrivateKey);
    //     launchpadToken5 = new StarDaoToken(Admin, "Brave", "BVE");
    //     ILAUNCHPADFACTORY(igniteLaunchPadFactory).registerLaunchPads(
    //         padCreator,
    //         address(launchpadToken5),
    //         109,
    //         (block.timestamp - 10),
    //         (10000 * 10 ** 18)
    //     );
    //     launchpadToken5.approve(
    //         address(igniteLaunchPadFactory),
    //         100000000000000 * 10 ** 18
    //     );
    //     ILAUNCHPADFACTORY(igniteLaunchPadFactory).createLaunchPad(
    //         uint(109),
    //         address(launchpadToken5),
    //         "Brave",
    //         "BVE",
    //         (10000 * 10 ** 18),
    //         (50000 * 10 ** 18),
    //         5,
    //         17
    //     );
    //     address[] memory pads = ILAUNCHPADFACTORY(igniteLaunchPadFactory)
    //         .getLaunchPads();
    //     IUSDT(GIT).approve(pads[8], (10000 * 10 ** 18));
    //     ILAUNCHPAD(pads[8]).participateInLaunchPad(5000 * 10 ** 18);
    // }

    // 0x77A61844D548E8bbD221AEff646fde357006d525 -- Lights Song token
    //  0x53F177897a59cbDbeDD1aC472D8061fE0711ED41 -- light song launchPad
    // 0x904C6d3cF9051898402c02EAd4F608e369C33af3 -- futures token
    // 0xf38b7ea7971AE4B83750EA57A2BB2961E1aaDcAE -- futures launchPad
    // 0xC8610Db0D58A4F71a1F2f17cf6AFcb3f659F3d4d -- interConnected token
    // 0xBc5ce3495AcF7e2cBFDEFab0857723E108d6ea72 -- interconnected launchpad
    // 0x6E7A13CfD3D35319C91EED0F69822B54055f7D3C -- brave token
    // 0x132387DE036Aba7E3e1375e3e5067325BA35A2b1 -- brave LaunchPad
}

//
