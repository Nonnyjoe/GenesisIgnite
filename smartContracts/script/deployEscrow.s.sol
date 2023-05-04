// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import "../src/contracts/swapDexPoseidon.sol";
import "../src/contracts/GenesisSwap.sol";
import "../src/contracts/escrow.sol";
import "../src/interface/IUSDT.sol";

// import "../src/contracts/StarDaoToken.sol";

contract deployEscrow is Script {
    swapDexPoseidon public SwapDexPoseidon;
    GenesisSwap public genesisSwap;
    Escrow public p2p;

    // StarDaoToken public starDaoToken;

    function setUp() public {}

    function run() public {
        address ETH = 0xD9faA0667434dF28e7F5Df15C0521f9D98CefCCf;
        address Shiba = 0x41f8fd69dc1F6a5c0753B0ae2444bfcbb826682D;
        address ARBITRUM = 0x7a2FBef68e39eDD7a9763bF70AE039860DECF44E;
        address deployer = 0xA771E1625DD4FAa2Ff0a41FA119Eb9644c9A46C8;
        address GIT = 0xCF22316d0C63b3616a027620A703f362287Ca106;
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        uint256 deployerPrivateKey2 = vm.envUint("PRIVATE_KEY2");
        vm.startBroadcast(deployerPrivateKey2);
        // SwapDexPoseidon = new swapDexPoseidon();
        // starDaoToken = new StarDaoToken(deployer);
        p2p = new Escrow(GIT, Shiba, ARBITRUM, ETH);

        writeAddressesToFile(address(p2p), "ESCROW ADDRESS");
        vm.stopBroadcast();
        vm.startBroadcast(deployerPrivateKey);
        IUSDT(GIT).approve(address(p2p), 4000 * 10 ** 18);
        p2p.placeSellAdd(ETH, 1200 * 10 ** 18, 3);
        p2p.placeSellAdd(Shiba, 1000 * 10 ** 18, 20);
        p2p.placeSellAdd(ARBITRUM, 1500 * 10 ** 18, 5);
    }

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
