// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/contracts/GenesisSwap.sol";
import "../src/contracts/LaunchPad/IgniteLaunchPad.sol";
import "../src/contracts/LaunchPad/GenesisIgniteController.sol";
import "../src/contracts/LaunchPad/IgniteLaunchPadFactory.sol";
import "../lib/openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import "../src/interface/IUSDT.sol";
import "../src/contracts/GenesisSwap.sol";
import "../src/interface/IGENESISCONTROLLER.sol";
import "../src/contracts/tokens/mockToken.sol";

import "../src/interface/ILAUNCHPAD.sol";
import "../src/interface/IGToken.sol";
import "../src/interface/IGOVERN.sol";
import "../src/contracts/Dao/GovernanceTokenFactory.sol";
import "../src/contracts/Dao/GovernanceFactory.sol";

// import "../src/contracts/StarDaoToken.sol";

contract testGovernance is Test {
    address Admin = 0xA771E1625DD4FAa2Ff0a41FA119Eb9644c9A46C8;
    address User2 = 0x13B109506Ab1b120C82D0d342c5E64401a5B6381;
    address User3 = 0xfd182E53C17BD167ABa87592C5ef6414D25bb9B4;
    address User4 = 0xBB9F947cB5b21292DE59EFB0b1e158e90859dddb;
    MockToken public GIT;
    MockToken public LPToken;
    IgniteLaunchPadFactory public LPFactory;
    GovernanceTokenFactory public GToken;
    GovernanceFactory public GFactory;
    GenesisIgniteController public GenesisController;

    uint proposalId =
        42263944791628653919593695388098034558077919607370133745859912031683553496920;
    address _newLaunchpad;
    uint presaleId =
        13451033083514596939918063210787257970623327842460883485067275258480664413022;

    function setUp() public {}

    function testDeploys() public {
        vm.startPrank(Admin);
        GIT = new MockToken();
        LPToken = new MockToken();
        GToken = new GovernanceTokenFactory();
        LPFactory = new IgniteLaunchPadFactory(address(GToken));

        GenesisController = new GenesisIgniteController(
            Admin,
            10,
            address(GIT),
            address(GIT),
            address(LPFactory),
            address(GToken),
            500000 * 10 ** 18
        );

        GFactory = new GovernanceFactory(
            address(GToken),
            address(GenesisController)
        );
        GToken.initialize(address(LPFactory), address(GFactory));
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
            "TEST",
            "TST",
            (100000 * 10 ** 18),
            (100000 * 10 ** 18),
            5,
            10
        );
        vm.stopPrank();
        _newLaunchpad = newLaunchpad;
    }

    function testParticipation() public {
        testDeploys();
        participate(Admin, address(_newLaunchpad), address(GIT));
        participate(User2, address(_newLaunchpad), address(GIT));
        participate(User3, address(_newLaunchpad), address(GIT));
        participate(User4, address(_newLaunchpad), address(GIT));
    }

    function testWithdrawal() public {
        testParticipation();
        vm.warp(10 minutes);
        WithdrawLPToken(Admin, address(_newLaunchpad));
        WithdrawLPToken(User2, address(_newLaunchpad));
        WithdrawLPToken(User3, address(_newLaunchpad));
        WithdrawLPToken(User4, address(_newLaunchpad));
        vm.startPrank(Admin);
        ILAUNCHPAD(_newLaunchpad).requestInstalmentWithdrawal("FIRST PAYMENT");
        ILAUNCHPAD(_newLaunchpad).requestInstalmentWithdrawal("SECOND PAYMENT");
        ILAUNCHPAD(_newLaunchpad).getProposalIds();
        vm.stopPrank();
    }

    function testAnotherWithdrawal() public {
        testWithdrawal();
        (address _Governor, address GovToken) = ILAUNCHPAD(_newLaunchpad)
            .viewGovernanceAddresses();
        Delegate(Admin, GovToken);
        Delegate(User2, GovToken);
        Delegate(User3, GovToken);
        Delegate(User4, GovToken);
        vm.warp(10);
    }

    function testVoteInGovernance() public {
        testAnotherWithdrawal();
        (address _Governor, address GovToken) = ILAUNCHPAD(_newLaunchpad)
            .viewGovernanceAddresses();
        vm.roll(block.number + 3);
        Vote(proposalId, 1, Admin, _Governor);
        vm.roll(block.number + 3);
        Vote(proposalId, 1, User2, _Governor);
        Vote(proposalId, 1, User3, _Governor);
        Vote(proposalId, 1, User4, _Governor);
    }

    function testExexuteGovernance() public {
        testVoteInGovernance();
        vm.roll(block.number + 21600);
        ILAUNCHPAD(_newLaunchpad).Execute(proposalId);
    }

    function testPresalseParticipation() public {
        testVoteInGovernance();
        vm.warp(1 days);
        participateInPresale(Admin, address(_newLaunchpad), address(GIT));
        participateInPresale(User2, address(_newLaunchpad), address(GIT));
        participateInPresale(User3, address(_newLaunchpad), address(GIT));
        participateInPresale(User4, address(_newLaunchpad), address(GIT));
    }

    function testEmergencyWithdrawal() public {
        testPresalseParticipation();
        vm.startPrank(Admin);
        ILAUNCHPAD(_newLaunchpad).endPresale();
        ILAUNCHPAD(_newLaunchpad).requestEmmergencyWithdrawal(
            (20000 * 10 ** 18),
            "EMERGENCY PAYMENT"
        );
        vm.stopPrank();
    }

    function testEmergencyWithdrawalVotting() public {
        testEmergencyWithdrawal();
        (address _Governor, address GovToken) = ILAUNCHPAD(_newLaunchpad)
            .viewGovernanceAddresses();
        vm.roll(block.number + 3);
        Vote(presaleId, 1, Admin, _Governor);
        vm.roll(block.number + 3);
        Vote(presaleId, 1, User2, _Governor);
        Vote(presaleId, 1, User3, _Governor);
        Vote(presaleId, 0, User4, _Governor);
    }

    function testzEmergrncyGovernance() public {
        testEmergencyWithdrawalVotting();
        vm.roll(block.number + 21600);
        ILAUNCHPAD(_newLaunchpad).Execute(presaleId);
    }

    function Vote(
        uint Id,
        uint8 support,
        address user,
        address _Governor
    ) internal {
        vm.prank(user);
        IGOVERN(_Governor).castVote(Id, support);
    }

    function Delegate(address user, address GTA) internal {
        vm.prank(user);
        IGIToken(GTA).delegate(user);
    }

    function participate(
        address user,
        address newLaunchpad,
        address _GIT
    ) internal {
        vm.prank(Admin);
        IUSDT(_GIT).mint(user, (20000 * 10 ** 18));

        vm.startPrank(user);
        IUSDT(_GIT).approve(newLaunchpad, (20000 * 10 ** 18));
        ILAUNCHPAD(newLaunchpad).participateInLaunchPad(20000 * 10 ** 18);
        vm.stopPrank();
    }

    function participateInPresale(
        address user,
        address newLaunchpad,
        address _GIT
    ) internal {
        vm.prank(Admin);
        IUSDT(_GIT).mint(user, (20000 * 10 ** 18));

        vm.startPrank(user);
        IUSDT(_GIT).approve(newLaunchpad, (20000 * 10 ** 18));
        ILAUNCHPAD(newLaunchpad).participateInPresale(20000 * 10 ** 18);
        vm.stopPrank();
    }

    function WithdrawLPToken(address user, address newLaunchpad) internal {
        vm.prank(user);
        ILAUNCHPAD(newLaunchpad).WithdrawLaunchPadToken();
    }
}
