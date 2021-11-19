// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract Asset is ERC721URIStorage {
    uint256 public tokenCounter;

    constructor() public ERC721("Asset", "ASS") {
        tokenCounter = 0;
    }

    function createAsset(address _owner, string memory tokenURI)
        public
        returns (uint256)
    {
        uint256 newTokenId = tokenCounter;
        address owner = _owner;
        _safeMint(owner, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        tokenCounter = tokenCounter + 1;
        return newTokenId - 1;
    }
}
