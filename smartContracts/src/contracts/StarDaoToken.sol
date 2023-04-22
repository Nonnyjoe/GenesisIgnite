// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "../../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract StarDaoToken is ERC20, Ownable {
    constructor(
        address to,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        _mint(to, 300000000000000000000000);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
