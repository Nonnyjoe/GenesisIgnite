// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../../../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20 {
    address owner;

    constructor() ERC20("MockToken", "MTK") {
        owner = msg.sender;
        _mint(owner, 2000000 * 10 ** 18);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
