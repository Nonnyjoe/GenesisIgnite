// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../lib/forge-std/src/Test.sol";
// import "../src/contracts/StarDaoToken.sol";
import "../src/contracts/LaunchPad/IgniteLaunchPad.sol";

import "../src/contracts/LaunchPad/IgniteLaunchPadFactory.sol";

import "../lib/openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import "../src/interface/IUSDT.sol";
import "../src/contracts/GenesisSwap.sol";
import "../src/interface/IGENESISCONTROLLER.sol";

import "../src/contracts/tokens/mockToken.sol";

import "../src/contracts/LaunchPad/GenesisIgniteController.sol";

import "../src/interface/ILAUNCHPAD.sol";
import "../src/interface/IGToken.sol";
import "../src/interface/IGOVERN.sol";
import "../src/contracts/Dao/GovernanceTokenFactory.sol";
import "../src/contracts/Dao/GovernanceFactory.sol";

contract DNP is Script {
    address Admin = 0xA771E1625DD4FAa2Ff0a41FA119Eb9644c9A46C8;
    address User2 = 0x13B109506Ab1b120C82D0d342c5E64401a5B6381;
    address User3 = 0xfd182E53C17BD167ABa87592C5ef6414D25bb9B4;
    address User4 = 0xBB9F947cB5b21292DE59EFB0b1e158e90859dddb;

    MockToken public GIT;
    MockToken public LPToken;
    IgniteLaunchPadFactory public LPFactory;
    GovernanceTokenFactory public GTokenFactory;
    GovernanceFactory public GFactory;
    GenesisIgniteController public GenesisController;

    uint proposalId =
        42263944791628653919593695388098034558077919607370133745859912031683553496920;
    address _newLaunchpad;
    uint presaleId =
        13451033083514596939918063210787257970623327842460883485067275258480664413022;
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

    function run() public {
        vm.startBroadcast(deployerPrivateKey);
        GIT = new MockToken();
        writeAddressesToFile(address(GIT), "GIT token");
        LPToken = new MockToken();
        writeAddressesToFile(address(LPToken), "LP token");
        GTokenFactory = new GovernanceTokenFactory();
        writeAddressesToFile(
            address(GTokenFactory),
            "Governance token factory"
        );
        LPFactory = new IgniteLaunchPadFactory(address(GTokenFactory));
        writeAddressesToFile(address(LPFactory), "LAUNCHPAD FACTORY");

        GenesisController = new GenesisIgniteController(
            Admin,
            10,
            address(GIT),
            address(GIT),
            address(LPFactory),
            address(GTokenFactory),
            500000 * 10 ** 18
        );
        writeAddressesToFile(
            address(GenesisController),
            "GOVERNANCE CONTROLLER"
        );

        GFactory = new GovernanceFactory(
            address(GTokenFactory),
            address(GenesisController)
        );
        writeAddressesToFile(address(GFactory), "GOVERNANCE FACTORY");
        GTokenFactory.initialize(address(LPFactory), address(GFactory));
        GenesisController.registerLaunchPads(
            Admin,
            address(LPToken),
            101,
            block.timestamp,
            (100000 * 10 ** 18),
            3
        );

        IUSDT(address(LPToken)).approve(
            address(GenesisController),
            (200000 * 10 ** 18)
        );

        IUSDT(address(LPToken)).mint(Admin, (200000 * 10 ** 18));
        address newLaunchpad = GenesisController.createLaunchPad(
            101,
            address(LPToken),
            "ALPHA CORE",
            "AHC",
            (100000 * 10 ** 18),
            (100000 * 10 ** 18),
            10080,
            10
        );
        writeAddressesToFile(address(newLaunchpad), "TEST LAUNCHPAD");

        vm.stopBroadcast();
    }

    //     participate(Admin, address(newLaunchpad), address(GIT));

    //     participate(User2, address(newLaunchpad), address(GIT));

    //     participate(User3, address(newLaunchpad), address(GIT));

    //     participate(User4, address(newLaunchpad), address(GIT));

    //     vm.warp(10 minutes);

    //     WithdrawLPToken(Admin, address(newLaunchpad));
    //     WithdrawLPToken(User2, address(newLaunchpad));
    //     WithdrawLPToken(User3, address(newLaunchpad));
    //     WithdrawLPToken(User4, address(newLaunchpad));

    //     vm.startPrank(Admin);

    //     ILAUNCHPAD(newLaunchpad).requestInstalmentWithdrawal("FIRST PAYMENT");
    //     ILAUNCHPAD(newLaunchpad).requestInstalmentWithdrawal("SECOND PAYMENT");
    //     vm.stopPrank();

    //     // GET GOVERNANCE AND GOVERNANCE TOKEN ADDRESS
    //     (address _Governor, address GToken) = ILAUNCHPAD(newLaunchpad)
    //         .viewGovernanceAddresses();

    //     Delegate(Admin, GToken);
    //     Delegate(User2, GToken);
    //     Delegate(User3, GToken);
    //     Delegate(User4, GToken);

    //     vm.warp(100 minutes);
    //     vm.warp(21600);

    //     IGOVERN(_Governor).votingPeriod();
    //     IGOVERN(_Governor).state(proposalId);

    //     // VOTE IN DAO
    //     // Vote(proposalId, 1, Admin, _Governor);
    //     Vote(proposalId, 1, User2, _Governor);
    //     Vote(proposalId, 1, User3, _Governor);
    //     Vote(proposalId, 1, User4, _Governor);
    // }

    // function WithdrawLPToken(address user, address newLaunchpad) internal {
    //     vm.prank(user);
    //     ILAUNCHPAD(newLaunchpad).WithdrawLaunchPadToken();
    // }

    // function participate(
    //     address user,
    //     address newLaunchpad,
    //     address _GIT
    // ) internal {
    //     vm.prank(Admin);
    //     IUSDT(_GIT).mint(user, (20000 * 10 ** 18));

    //     vm.startPrank(user);
    //     IUSDT(_GIT).approve(newLaunchpad, (20000 * 10 ** 18));
    //     ILAUNCHPAD(newLaunchpad).participateInLaunchPad(20000 * 10 ** 18);
    //     vm.stopPrank();
    // }

    // function Delegate(address user, address GTA) internal {
    //     vm.prank(user);
    //     IGIToken(GTA).delegate(user);
    // }

    // function Vote(
    //     uint Id,
    //     uint8 support,
    //     address user,
    //     address _Governor
    // ) internal {
    //     vm.prank(user);
    //     IGOVERN(_Governor).castVote(Id, support);
    // }

    function writeAddressesToFile(address addr, string memory text) public {
        string memory filename = "./deployed_contracts.txt";

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
}
