// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract Asset is ERC721 {
    uint256 public tokenCounter;
    bytes32 public keyhash;
    uint256 public fee;
    enum GridNets {
        Knowledge,
        Social,
        Political,
        Economic
    }
    mapping(uint256 => GridNets) public tokenIdToNet;
    mapping(bytes32 => address) public requestIdToSender;
    event requestedAsset(bytes32 indexed requestId, address requester);
    event NetAssigned(uint256 indexed tokenId, GridNets Net);

    constructor(
        address _vrfCoordinator,
        address _linkToken,
        bytes32 _keyhash,
        uint256 _fee
    ) public ERC721("Asset", "ASS") {
        tokenCounter = 0;
        keyhash = _keyhash;
        fee = _fee;
    }

    function createAsset(string memory tokenURI) public {
        GridNets Net = GridNets(1);
        uint256 newTokenId = tokenCounter;
        tokenIdToNet[newTokenId] = Net;
        emit NetAssigned(newTokenId, Net);
        address owner = msg.sender;
        _safeMint(owner, newTokenId);
        setTokenURI(newTokenId, tokenURI);
        tokenCounter = tokenCounter + 1;
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        // pug, shiba inu, st bernard
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: caller is not owner, not approved"
        );
        //_setTokenURI(tokenId, _tokenURI);

        //print("New token has been created!");
    }
}
