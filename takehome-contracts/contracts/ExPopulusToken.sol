// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ExPopulusToken is ERC20 {

  //-------------------------------------------------------------
  // STORAGE
  //-------------------------------------------------------------

    address public deployer;
    address public gameLogicAddress;

  //-------------------------------------------------------------
  // CUSTOM ERRORS
  //-------------------------------------------------------------

	error OnlyOwnerOrGameLogic();
  error OnlyDeployer();

  //-------------------------------------------------------------
  // CONSTRUCTOR
  //-------------------------------------------------------------

    constructor(
        string memory _name,
        string memory _symbol,
        address _deployer
    ) ERC20(_name, _symbol) {
        deployer = _deployer;
       
    }

  //-------------------------------------------------------------
  // STATE - MODIFIING FUNCTIONS
  //-------------------------------------------------------------

    function setGameLogicAdress(address _gameLogicAddress) external {
       if (msg.sender != deployer) revert OnlyDeployer();
       gameLogicAddress = _gameLogicAddress;
    }

    function mint(address to, uint256 amount) external {
      if (msg.sender != deployer && msg.sender != gameLogicAddress) revert OnlyOwnerOrGameLogic();
        _mint(to, amount);
    }
}
