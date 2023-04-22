// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import "../src/contracts/swapDexPoseidon.sol";
import "../src/contracts/GenesisSwap.sol";

import "../src/contracts/StarDaoToken.sol";

contract deployLaunchPad is Script {
    swapDexPoseidon public SwapDexPoseidon;
    GenesisSwap public genesisSwap;
    StarDaoToken public starDaoToken;

    function setUp() public {}

    function run() public {
        address poseidon = 0xE8c34E90E0B1920685313679b661Ed933878D2CE;
        address deployer = 0xA771E1625DD4FAa2Ff0a41FA119Eb9644c9A46C8;
        // address swap = 0x3a6a1C444cD309Ad27Fc49FF56B7D9311305A53b;
        address newSwap = 0x2da0cA791DdBcb7eBBd74997c7e758e507247f5f;
        address GENESIS = 0x7b061BF3e978b387Ed22d1b0812B764Fb421014B;
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        // SwapDexPoseidon = new swapDexPoseidon();
        // starDaoToken = new StarDaoToken(deployer);
        genesisSwap = new GenesisSwap(poseidon, GENESIS);
    }
}
