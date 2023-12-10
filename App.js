import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const BorderXInterface = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    // Connect to MetaMask
    const connectToMetaMask = async () => {
      try {
        const _web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const _account = accounts[0];
        const networkId = await _web3.eth.net.getId();
        const _contract = new _web3.eth.Contract(contractABI, contractAddress);

        setWeb3(_web3);
        setAccount(_account);
        setContract(_contract);

        // Initialize user balance
        const userBalance = await _contract.methods.getBalance().call({ from: _account });
        setBalance(userBalance);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    };
    connectToMetaMask();
  }, []);

  const sendPayment = async () => {
    try {
      await contract.methods.sendPayment(recipient, amount).send({ from: account });

      const userBalance = await contract.methods.getBalance().call({ from: account });
      setBalance(userBalance);

      alert('Payment sent successfully!');
    } catch (error) {
      alert('Error sending payment: ' + error.message);
    }
  };

  return (
    <div>
      <h1>BorderX Payment Interface</h1>
      <p>Your Balance: {balance} ETH</p>
      <label>Recipient Address:</label>
      <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Enter recipient address" />
      <br />
      <label>Amount:</label>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount in ETH" />
      <br />
      <button onClick={sendPayment}>Send Payment</button>
    </div>
  );
};

export default BorderXInterface;
