// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./Fund.sol";
import "./Asset.sol";

contract KnowledgeFarm is ChainlinkClient, Ownable {
    string public name = "Knowledge Farm";
    Fund public fund;
    Asset public asset;

    constructor(address _fund, address _asset) public {
        fund = Fund(_fund);
        asset = Asset(_asset);
    }

    address[] public members;
    // token > address
    mapping(address => address) public tokenPriceFeedMapping;
    address[] public allowedTokens;

    function addAllowedTokens(address token) public onlyOwner {
        allowedTokens.push(token);
    }

    function setPriceFeedContract(address token, address priceFeed)
        public
        onlyOwner
    {
        tokenPriceFeedMapping[token] = priceFeed;
    }

    // function to mint an Asset ERC721 to a member
    function mintAsset(string memory URI) public {
        address _member = msg.sender;
        //require(fund.balanceOf(_member) >= amount);
        //fund.transfer(_member, amount);
        //uint256 n = asset.createAsset(_member, URI);
    }

    function tokenIsAllowed(address token) public returns (bool) {
        for (
            uint256 allowedTokensIndex = 0;
            allowedTokensIndex < allowedTokens.length;
            allowedTokensIndex++
        ) {
            if (allowedTokens[allowedTokensIndex] == token) {
                return true;
            }
        }
        return false;
    }

    function issueTokens(address owner) public onlyOwner {
        // issue tokens to owner if he is not a member and add him to the members list
        if (members.length == 0) {
            members.push(owner);
            fund.mint(owner, 500);
        } else {
            for (
                uint256 memberIndex = 0;
                memberIndex < members.length;
                memberIndex++
            ) {
                if (members[memberIndex] == owner) {
                    return;
                }
            }
            members.push(owner);
            fund.mint(owner, 500);
        }
    }

    function getTokenEthPrice(address token)
        public
        view
        returns (uint256, uint8)
    {
        address priceFeedAddress = tokenPriceFeedMapping[token];
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            priceFeedAddress
        );
        (
            uint80 roundID,
            int256 price,
            uint256 startedAt,
            uint256 timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return (uint256(price), priceFeed.decimals());
    }

    // function to add a new member to the members list
    function addMember(address _member) public onlyOwner {
        require(members.length == 0);
        members.push(_member);
        fund.mint(_member, 500);
    }

    // function to check if a member is a member
    function isMember(address _member) public view returns (bool) {
        for (
            uint256 memberIndex = 0;
            memberIndex < members.length;
            memberIndex++
        ) {
            if (members[memberIndex] == _member) {
                return true;
            }
        }
        return false;
    }
}
