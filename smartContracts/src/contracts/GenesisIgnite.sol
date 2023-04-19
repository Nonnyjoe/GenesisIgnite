// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

interface GenesisIgniteNFT {
    function mint(address to, uint256 tokenId) external;
}

contract GenesisIgnite is AccessControl {
    // Native token of the platform
    IERC20 private _nativeToken;
    // Address of the NFT contract
    address private _nftContract;

    // Role for minting NFTs
    bytes32 public constant NFT_MINTER_ROLE = keccak256("NFT_MINTER_ROLE");

    // Mapping to track the trade volume of each user
    mapping(address => uint256) private _tradeVolume;

    constructor(address nativeToken, address nftContract) {
        _nativeToken = IERC20(nativeToken);
        _nftContract = nftContract;
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(NFT_MINTER_ROLE, _msgSender());
    }

    function buyNativeToken(uint256 amount) external {
        _nativeToken.transferFrom(msg.sender, address(this), amount);
        _tradeVolume[msg.sender] += amount;
        if (_tradeVolume[msg.sender] >= 1000) {
            GenesisIgniteNFT(_nftContract).mint(msg.sender, block.timestamp);
            _tradeVolume[msg.sender] = 0;
        }
    }

    function setNFTContract(
        address nftContract
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _nftContract = nftContract;
    }

    function setNFTMinter(
        address account
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(NFT_MINTER_ROLE, account);
    }

    function revokeNFTMinter(
        address account
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(NFT_MINTER_ROLE, account);
    }
}
