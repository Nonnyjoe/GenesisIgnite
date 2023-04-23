// // SPDX-License-Identifier: MIT

// pragma solidity ^0.8.17;

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/access/AccessControl.sol";

// contract GenesisIgniteNFT is ERC721Enumerable, AccessControl {
//     bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
//     uint256 private _totalSupply;
//     uint256 private constant _maxSupply = 1000;

//     string private baseURI;

//     constructor(
//         string memory tokenName,
//         string memory tokenSymbol,
//         string memory baseTokenURI
//     ) ERC721(tokenName, tokenSymbol) {
//         _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
//         _setupRole(MINTER_ROLE, _msgSender());
//         baseURI = baseTokenURI;
//     }

//     using Strings for uint256;

//     mapping(uint256 => string) private _tokenURIs;

//     function tokenURI(
//         uint256 tokenId
//     ) public view virtual override returns (string memory) {
//         require(
//             _exists(tokenId),
//             "GenesisIgniteNFT: URI query for nonexistent token"
//         );

//         string memory _tokenURI = _tokenURIs[tokenId];
//         string memory base = _baseURI();

//         if (bytes(base).length == 0) {
//             return _tokenURI;
//         }
//         if (bytes(_tokenURI).length > 0) {
//             return string(abi.encodePacked(base, _tokenURI));
//         }

//         return super.tokenURI(tokenId);
//     }

//     function mint(address to, uint256 _tokenId) external {
//         require(
//             hasRole(MINTER_ROLE, _msgSender()),
//             "GenesisIgniteNFT: must have minter role to mint"
//         );
//         require(
//             _totalSupply < _maxSupply,
//             "GenesisIgniteNFT: maximum supply reached"
//         );

//         _mint(to, _tokenId);
//         _totalSupply++;
//     }

//     function _setTokenURI(
//         uint256 tokenId,
//         string memory _tokenURI
//     ) internal virtual {
//         require(
//             _exists(tokenId),
//             "GenesisIgniteNFT: URI set of nonexistent token"
//         );
//         _tokenURIs[tokenId] = _tokenURI;
//     }

//     function _burn(uint256 tokenId) internal virtual override {
//         super._burn(tokenId);

//         if (bytes(_tokenURIs[tokenId]).length != 0) {
//             delete _tokenURIs[tokenId];
//         }
//     }

//     function _baseURI() internal view virtual override returns (string memory) {
//         return baseURI;
//     }

//     function supportsInterface(
//         bytes4 interfaceId
//     )
//         public
//         view
//         virtual
//         override(AccessControl, ERC721Enumerable)
//         returns (bool)
//     {
//         return super.supportsInterface(interfaceId);
//     }
// }
