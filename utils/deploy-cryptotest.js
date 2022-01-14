async function deployContract() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying CryptoTest with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const cryptoTestFactory = await ethers.getContractFactory("CryptoTest");
  const cryptoTestContract = await cryptoTestFactory.deploy();

  console.log("CryptoTest address:", cryptoTestContract.address);

  console.log("");
  console.log(
    `Check on etherscan (ropsten): https://ropsten.etherscan.io/address/${deployer.address}`
  );
  console.log(
    `Check on etherscan (ropsten): https://rinkeby.etherscan.io/address/${deployer.address}`
  );
}

async function runDeployContract() {
  try {
    await deployContract();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runDeployContract();
