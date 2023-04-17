// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/swapDexPoseidon.sol";
import "../src/GenesisSwap.sol";

import "../src/StarDaoToken.sol";

contract testSwap is Test {
    swapDexPoseidon public SwapDexPoseidon;
    GenesisSwap public genesisSwap;
    StarDaoToken public starDaoToken;

    address deployer = 0xA771E1625DD4FAa2Ff0a41FA119Eb9644c9A46C8;

    function setUp() public {
        SwapDexPoseidon = new swapDexPoseidon();
        starDaoToken = new StarDaoToken(deployer);
        genesisSwap = new GenesisSwap(
            address(SwapDexPoseidon),
            address(starDaoToken)
        );
        genesisSwap.setTokenAddresses(
            address(starDaoToken),
            address(starDaoToken)
        );
    }

    function testGeneUsdc() public {
        vm.startPrank(deployer);
        vm.deal(deployer, 100 ether);
        starDaoToken.transfer(address(genesisSwap), 50000 * 10 ** 18);
        starDaoToken.approve(address(genesisSwap), 1100000 * 10 ** 18);
        genesisSwap.swapDaiToGene(300 * 10 ** 18);
        genesisSwap.swapUsdcToGene(300 * 10 ** 18);
    }

    //199892000000000000000

    //199892000000000000000000000000000000000
    //200108058351500000000 000000000000000000
    // 2001080583515
    // 200108058351500000000
    //299972643000000000000

    // function testGeneToDai() public {
    //     testGeneUsdc();
    //     genesisSwap.swapGeneToDai(200 * 10 ** 18);
    // }

    // function testGeneToUsdc() public {
    //     testGeneUsdc();
    //     genesisSwap.swapGeneToUsdc(200 * 10 ** 18);
    // }

    // 1922000000000000000000
    function testEthToGene() public {
        testGeneUsdc();
        genesisSwap.swapEthToGene{value: 1 ether}();
    }

    //1000000000000000000
    function testGeneToEth() public {
        testEthToGene();
        genesisSwap.swapGeneForEth(1922000000000000000000);
    }
}
