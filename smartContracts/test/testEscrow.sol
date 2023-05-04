// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/contracts/escrow.sol";
import "../src/contracts/tokens/mockToken.sol";
import "../src/contracts/tokens/Floki.sol";
import "../src/contracts/tokens/Link.sol";
import "../src/contracts/tokens/Shiba.sol";
import "../src/contracts/tokens/UniT.sol";

contract EscrowContractTest is Test {
    Escrow public escrow;
    MockToken public tokenM;
    FlokiToken public flk;
    LinkToken public lkt;
    ShibaToken public sbt;
    UniToken public uit;

    address arbitrator = mkaddr("arbitrator");

    address seller1 = mkaddr("seller1");
    address seller2 = mkaddr("seller2");
    address seller3 = mkaddr("seller3");
    address seller4 = mkaddr("seller4");

    address buyer1 = mkaddr("buyer1");
    address buyer2 = mkaddr("buyer2");
    address buyer3 = mkaddr("buyer3");
    address buyer4 = mkaddr("buyer4");

    function setUp() public {
        vm.startPrank(arbitrator);
        tokenM = new MockToken();
        flk = new FlokiToken();
        lkt = new LinkToken();
        sbt = new ShibaToken();
        uit = new UniToken();
        escrow = new Escrow(
            address(tokenM),
            address(sbt),
            address(flk),
            address(uit)
        );
    }

    function testOpenEscrows() public {
        escrow.openEscrows();
        tokenM.mint(seller1, 1 ether);
        flk.mint(seller1, 1 ether);
        tokenM.mint(address(escrow), 5 ether);
        tokenM.mint(seller2, 1 ether);
        lkt.mint(seller2, 1 ether);
        lkt.mint(seller3, 1 ether);
        sbt.mint(seller4, 1 ether);

        uit.mint(buyer1, 1.2 ether);
        tokenM.mint(buyer1, 2 ether);

        vm.stopPrank();

        vm.startPrank(seller1);
        flk.approve(address(escrow), 0.5 ether);
        escrow.placeBuyAdd(address(flk), 0.4 ether, 10);
        vm.stopPrank();

        vm.startPrank(seller2);
        lkt.approve(address(escrow), 0.55 ether);
        escrow.placeBuyAdd(address(lkt), 0.4 ether, 3);
        vm.stopPrank();

        vm.startPrank(buyer1);
        uit.approve(address(escrow), 5 ether);
        escrow.placeBuyAdd(address(uit), 1 ether, 4);
        vm.stopPrank();

        vm.startPrank(buyer1);
        tokenM.approve(address(escrow), 5 ether);
        escrow.placeSellAdd(address(uit), 1 ether, 4);
        vm.stopPrank();

        vm.prank(buyer1);
        escrow.fillBuyAdd(0.4 ether, 2);

        vm.prank(seller1);
        escrow.cancelEscrow(1);

        vm.prank(buyer1);
        escrow.cancelEscrow(3);

        vm.prank(seller2);
        escrow.cancelEscrow(2);

        vm.prank(buyer1);
        escrow.cancelEscrow(4);
    }

    function mkaddr(string memory name) public returns (address) {
        address addr = address(
            uint160(uint256(keccak256(abi.encodePacked(name))))
        );
        vm.label(addr, name);
        return addr;
    }
}
