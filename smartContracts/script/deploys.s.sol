// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../lib/forge-std/src/Test.sol";
// import "../src/contracts/StarDaoToken.sol";
import "../src/contracts/LaunchPad/IgniteLaunchPad.sol";
import "../src/contracts/swapDexPoseidon.sol";
import "../src/contracts/LaunchPad/IgniteLaunchPadFactory.sol";
import "../lib/openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import "../src/interface/IUSDT.sol";
import "../src/contracts/GenesisSwap.sol";
import "../src/interface/IGENESISCONTROLLER.sol";

contract mint is Script {
    GenesisSwap public swapPad;
    swapDexPoseidon public router;
    // IgniteLaunchPadFactory public igniteLaunchPadFactory;
    // StarDaoToken public starDaoToken;
    // StarDaoToken public launchpadToken1;
    // StarDaoToken public launchpadToken2;
    // StarDaoToken public launchpadToken3;
    // StarDaoToken public launchpadToken4;
    // StarDaoToken public launchpadToken5;
    address Admin = 0xA771E1625DD4FAa2Ff0a41FA119Eb9644c9A46C8;
    address padCreator = 0xA771E1625DD4FAa2Ff0a41FA119Eb9644c9A46C8;
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

    function setUp() public {
        // uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    }

    function run() public {
        // uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // launchpadToken2 = new StarDaoToken(Admin, "USDC", "USDC");
        // writeAddressesToFile(address(launchpadToken2), "USDC");

        // launchpadToken3 = new StarDaoToken(Admin, "DAI", "DAI");
        // writeAddressesToFile(address(launchpadToken3), "DAI");

        // igniteLaunchPadFactory = new IgniteLaunchPadFactory(
        //     Admin,
        //     10,
        //     address(0xf6331218F26643AD596DAa065457Bfe5ac1d5Ba6),
        //     address(0xf6331218F26643AD596DAa065457Bfe5ac1d5Ba6),
        //     address(0xb7A3AAee5DABc7a85821657969cBBD6cFC7D1827),
        //     1000 * 10 ** 18
        // );
        // writeAddressesToFile(
        //     address(igniteLaunchPadFactory),
        //     "IGNITE LAUNCHPAD FACTORY MAIN2"
        // );

        // router = new swapDexPoseidon();
        // writeAddressesToFile(address(router), "NEW ROUTER CONTRACT FINAL");
        // // starDaoToken = new StarDaoToken(Admin, "GenesisIgnite", "GIT");

        // igniteLaunchPadFactory = new IgniteLaunchPadFactory(
        //     Admin,
        //     10,
        //     address(0xf6331218F26643AD596DAa065457Bfe5ac1d5Ba6),
        //     address(0xf6331218F26643AD596DAa065457Bfe5ac1d5Ba6),
        //     address(router),
        //     1000 * 10 ** 18
        // );
        // writeAddressesToFile(
        //     address(igniteLaunchPadFactory),
        //     "IGNITE LAUNCHPAD FACTORY FINAL"
        // );

        // router.initialize(
        //     address(igniteLaunchPadFactory),
        //     address(0xf6331218F26643AD596DAa065457Bfe5ac1d5Ba6)
        // );

        swapPad = new GenesisSwap(
            address(0xCF22316d0C63b3616a027620A703f362287Ca106)
        );
        writeAddressesToFile(address(swapPad), "SWAP PAD FINAL");

        // writeAddressesToFile(
        //     address(0xf078f89B3cAD8bAe62DA4C15cb2fD1e6A3eB032F),
        //     "DYNAMIC TRUST TOKEN"
        // );
        mintTokens(0xCF22316d0C63b3616a027620A703f362287Ca106);
        mintTokens(0xCF22316d0C63b3616a027620A703f362287Ca106);
        mintTokens(0xCF22316d0C63b3616a027620A703f362287Ca106);
        mintTokens(0xCF22316d0C63b3616a027620A703f362287Ca106);

        IUSDT(0xCF22316d0C63b3616a027620A703f362287Ca106).transfer(
            address(swapPad),
            200000 * 10 ** 18
        );

        mintTokens(0x1F8a1018d1f84749aD4aE3d3711Cc98b79E8f962);
        // writeAddressesToFile(
        //     address(0x1F8a1018d1f84749aD4aE3d3711Cc98b79E8f962),
        //     "STAR LIGHT TOKEN"
        // );

        mintTokens(0x4fe39e64CdE340AfF497D7da0e16F6E60848cDbd);
        // writeAddressesToFile(
        //     address(0x4fe39e64CdE340AfF497D7da0e16F6E60848cDbd),
        //     "FUTURES LIGHT TOKEN"
        // );

        mintTokens(0xb556a7FF66c0CEF30a52d3cC579e91D4574a6037);
        // writeAddressesToFile(
        //     address(0xb556a7FF66c0CEF30a52d3cC579e91D4574a6037),
        //     "INCOGNITOBLISS TOKEN"
        // );

        mintTokens(0x358aE5C64bBF71851Cf817fE0e4b975594DbA78e);
        // writeAddressesToFile(
        //     address(0x358aE5C64bBF71851Cf817fE0e4b975594DbA78e),
        //     "LAST DAWN TOKEN"
        // );

        mintTokens(0x77A61844D548E8bbD221AEff646fde357006d525);
        // writeAddressesToFile(
        //     address(0x77A61844D548E8bbD221AEff646fde357006d525),
        //     "Lights Song TOKEN"
        // );

        mintTokens(0xC8610Db0D58A4F71a1F2f17cf6AFcb3f659F3d4d);
        // writeAddressesToFile(
        //     address(0xC8610Db0D58A4F71a1F2f17cf6AFcb3f659F3d4d),
        //     "interConnected TOKEN"
        // );

        mintTokens(0x6E7A13CfD3D35319C91EED0F69822B54055f7D3C);
        // writeAddressesToFile(
        //     address(0x6E7A13CfD3D35319C91EED0F69822B54055f7D3C),
        //     "brave TOKEN"
        // );

        // launchpadToken1 = new StarDaoToken(Admin, "DynamicTrust", "DTY");
        // igniteLaunchPadFactory.registerLaunchPads(
        //     padCreator,
        //     address(launchpadToken1),
        //     101,
        //     (block.timestamp),
        //     (10000 * 10 ** 18)
        // );
        // launchpadToken1.approve(
        //     address(igniteLaunchPadFactory),
        //     100000000000000 * 10 ** 18
        // );
        // igniteLaunchPadFactory.createLaunchPad(
        //     uint(101),
        //     address(launchpadToken1),
        //     "DynamicTrust",
        //     "DTY",
        //     (10000 * 10 ** 18),
        //     (50000 * 10 ** 18),
        //     5000,
        //     10
        // );

        // createLaunchPad2();
        // createLaunchPad3();
        // createLaunchPad4();
        // createLaunchPad5();

        // registerLaunchPad(
        //     101,
        //     0xf078f89B3cAD8bAe62DA4C15cb2fD1e6A3eB032F,
        //     Admin,
        //     "DYNAMIC TRUST",
        //     "DNT",
        //     120,
        //     10
        // );

        registerLaunchPad(
            102,
            0xb556a7FF66c0CEF30a52d3cC579e91D4574a6037,
            Admin,
            "INCOGNITOBLISS",
            "IGB",
            30,
            15,
            3
        );

        registerLaunchPad(
            103,
            0x4fe39e64CdE340AfF497D7da0e16F6E60848cDbd,
            Admin,
            "FUTURES LIGHT",
            "FTL",
            2880,
            5,
            4
        );

        registerLaunchPad(
            104,
            0x1F8a1018d1f84749aD4aE3d3711Cc98b79E8f962,
            Admin,
            "STAR LIGHT",
            "SRL",
            7200,
            8,
            5
        );

        registerLaunchPad(
            105,
            0x358aE5C64bBF71851Cf817fE0e4b975594DbA78e,
            Admin,
            "LAST DAWN",
            "LDN",
            30,
            20,
            4
        );

        registerLaunchPad(
            106,
            0x77A61844D548E8bbD221AEff646fde357006d525,
            Admin,
            "LIGHTS SONG",
            "LGS",
            10080,
            3,
            2
        );

        registerLaunchPad(
            107,
            0xC8610Db0D58A4F71a1F2f17cf6AFcb3f659F3d4d,
            Admin,
            "INTERCONNECTED",
            "ITD",
            12960,
            16,
            4
        );

        registerLaunchPad(
            108,
            0x6E7A13CfD3D35319C91EED0F69822B54055f7D3C,
            Admin,
            "BRAVE",
            "BRV",
            60,
            9,
            3
        );
    }

    function mintTokens(address add) internal {
        IUSDT(add).mint(Admin, 60000 * 10 ** 18);
    }

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
            0x6E87d1935C377B6A82Abc33693ED1edCf7F2F235
        );
        igniteLaunchPadFactory.registerLaunchPads(
            Admin,
            address(tokenAddr),
            regNo,
            (block.timestamp - 10),
            (29000 * 10 ** 18),
            _instalments
        );
        IUSDT(tokenAddr).approve(
            address(igniteLaunchPadFactory),
            100000000000000 * 10 ** 18
        );
        igniteLaunchPadFactory.createLaunchPad(
            uint(regNo),
            address(tokenAddr),
            Name,
            Symbol,
            (29000 * 10 ** 18),
            (29000 * 10 ** 18),
            duration,
            pIncrease
        );
    }

    // function createLaunchPad3() internal {
    //     // vm.startBroadcast(deployerPrivateKey);
    //     launchpadToken3 = new StarDaoToken(Admin, "FuturesLight", "FLT");
    //     igniteLaunchPadFactory.registerLaunchPads(
    //         padCreator,
    //         address(launchpadToken3),
    //         103,
    //         (block.timestamp - 10),
    //         (10000 * 10 ** 18)
    //     );
    //     launchpadToken3.approve(
    //         address(igniteLaunchPadFactory),
    //         100000000000000 * 10 ** 18
    //     );
    //     igniteLaunchPadFactory.createLaunchPad(
    //         uint(103),
    //         address(launchpadToken3),
    //         "FuturesLight",
    //         "FLT",
    //         (10000 * 10 ** 18),
    //         (50000 * 10 ** 18),
    //         5000,
    //         20
    //     );
    //     // writeAddressesToFile(address(launchpadToken3));
    // }

    // function createLaunchPad4() internal {
    //     // vm.startBroadcast(deployerPrivateKey);
    //     launchpadToken4 = new StarDaoToken(Admin, "IncongnitoBliss", "IGB");
    //     igniteLaunchPadFactory.registerLaunchPads(
    //         padCreator,
    //         address(launchpadToken4),
    //         104,
    //         (block.timestamp - 10),
    //         (10000 * 10 ** 18)
    //     );
    //     launchpadToken4.approve(
    //         address(igniteLaunchPadFactory),
    //         100000000000000 * 10 ** 18
    //     );
    //     igniteLaunchPadFactory.createLaunchPad(
    //         uint(104),
    //         address(launchpadToken4),
    //         "IncongnitoBliss",
    //         "IGB",
    //         (10000 * 10 ** 18),
    //         (50000 * 10 ** 18),
    //         5000,
    //         15
    //     );
    //     // writeAddressesToFile(address(launchpadToken4));
    // }

    // function createLaunchPad5() internal {
    //     // vm.startBroadcast(deployerPrivateKey);
    //     launchpadToken5 = new StarDaoToken(Admin, "LastDawn", "LDN");
    //     igniteLaunchPadFactory.registerLaunchPads(
    //         padCreator,
    //         address(launchpadToken5),
    //         105,
    //         (block.timestamp - 10),
    //         (10000 * 10 ** 18)
    //     );
    //     launchpadToken5.approve(
    //         address(igniteLaunchPadFactory),
    //         100000000000000 * 10 ** 18
    //     );
    //     igniteLaunchPadFactory.createLaunchPad(
    //         uint(105),
    //         address(launchpadToken5),
    //         "LastDawn",
    //         "LDN",
    //         (10000 * 10 ** 18),
    //         (50000 * 10 ** 18),
    //         5000,
    //         17
    //     );
    //     // writeAddressesToFile(address(launchpadToken5));
    // }

    function writeAddressesToFile(address addr, string memory text) public {
        string memory filename = "./deployed_contracts.txt";
        // string[7] memory labels = ["router", "starDaoToken", "igniteLaunchPadFactory", "launchpadToken1", "launchpadToken2", "launchpadToken3", "launchpadToken4", "launchpadToken5"];
        // address[7] memory addresses = [address(router), address(starDaoToken), address(igniteLaunchPadFactory), address(launchpadToken1), address(launchpadToken2), address(launchpadToken3), address(launchpadToken4), address(launchpadToken5)];

        // Write labels and addresses to file
        // for (uint256 i = 0; i < addresses.length; i++) {
        //     string memory label = labels[i];
        //     address addr = addresses[i];

        //     }
        vm.writeLine(
            filename,
            "-------------------------------------------------"
        );
        vm.writeLine(filename, text);
        vm.writeLine(filename, vm.toString(addr));
        vm.writeLine(
            filename,
            "-------------------------------------------------"
        );
    }

    // 0xE8c34E90E0B1920685313679b661Ed933878D2CE --- SWAPDEX POSEIDION /
    // 0x7b061BF3e978b387Ed22d1b0812B764Fb421014B --- GENESIS IGNITE TOKEN /
    // 0x74EBAD5E6975D917E6261632946358bC8aaa2b65 ---  FACTORY CONTRACT /
    // 0xf078f89B3cAD8bAe62DA4C15cb2fD1e6A3eB032F ---- DYNAMIC TRUST TOKENN /
    // 0x644177E7680df85a08cEC33358cfAeD6DAdf639E ---- DYNAMIC TRUST LAUNCHPAD /
    //0x1F8a1018d1f84749aD4aE3d3711Cc98b79E8f962 -- starligth token
    // 0x0eFA517DDAe5CeC111E37029bA71E2f0713B3d35 -- starligth LaunchPad
    // 0x4fe39e64CdE340AfF497D7da0e16F6E60848cDbd -- futuresLigth token
    // 0x1ae3300C76047e7c6eBB657CCd65c084f5A5B7d0 -- futureLight Launchpad
    // 0xb556a7FF66c0CEF30a52d3cC579e91D4574a6037 -- incognitoBliss Token
    // 0x65504a37E8f2d6c1c1a958cF09B3688C1b36fc28 --incognitoBliss Launchpad
    // 0x358aE5C64bBF71851Cf817fE0e4b975594DbA78e -- LadtDawn Token
    // 0x3835FCC284Bd71539bfa092bF6705A0Cb4848C3B -- LastDawn Launchpad
}
