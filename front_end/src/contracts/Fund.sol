// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Fund is ERC20 {
    constructor() public ERC20("Fund", "FUN") {
        _mint(msg.sender, 1000000000000000000000000);
    }
}
