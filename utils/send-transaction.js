const Web3 = require("web3");
const CryptoTest = require("../artifacts/contracts/CryptoTest.sol/CryptoTest.json");
const address = "0xEcEE80e1B6F081df8b98f31559eeECd2298adee8";

const DEV1_PRIVATE_KEY =
    "5c5e6542d8b0a6707fa535730972565fb6029d9f72e9f30881d0904a21cc1f88",
  ROPSTEN_ALCHEMY_API_KEY = "tkteCUDiE40sqIH7WkYq1Gh4fyAhoYbs";

const ROPSTEN_URL = `https://eth-ropsten.alchemyapi.io/v2/${ROPSTEN_ALCHEMY_API_KEY}`;

const init1 = async () => {
  const web3 = new Web3(ROPSTEN_URL);
  const networkId = await web3.eth.net.getId();
  const cryptoTestContract = new web3.eth.Contract(
    CryptoTest.abi
    // CryptoTest.networks[networkId].address
  );

  const tx = cryptoTestContract.methods.setData(1);
  const gas = await tx.estimateGas({ from: address });
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(address);

  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: cryptoTestContract.options.address,
      data,
      gas,
      gasPrice,
      nonce,
      chainId: networkId,
    },
    DEV1_PRIVATE_KEY
  );
  console.log(
    `Old data value: ${await cryptoTestContract.methods.data().call()}`
  );
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  console.log(
    `New data value: ${await cryptoTestContract.methods.data().call()}`
  );
};

init1();
