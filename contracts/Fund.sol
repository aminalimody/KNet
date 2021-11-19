// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Fund is ERC20 {
    constructor(uint256 initialSupply) public ERC20("Fund", "FUN") {
        _mint(msg.sender, initialSupply);
    }

    function mint(address recipient, uint256 amount) public {
        //require(msg.sender == _owner);
        _mint(recipient, amount);
    }
}
