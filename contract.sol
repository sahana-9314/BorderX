// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BorderXPayment {

    address public owner;
    mapping(address => uint256) public balances;

    event PaymentSent(address indexed sender, address indexed recipient, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function sendPayment(address recipient, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient funds");
        
        balances[msg.sender] -= amount;
        balances[recipient] += amount;

        emit PaymentSent(msg.sender, recipient, amount);
    }

    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }

    function withdrawBalance() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
