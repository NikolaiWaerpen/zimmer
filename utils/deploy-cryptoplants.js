async function deployContract() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying CryptoPlants with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const cryptoPlantsFactory = await ethers.getContractFactory("PlantGrower");
  const cryptoPlantsContract = await cryptoPlantsFactory.deploy();

  console.log("CryptoPlants address:", cryptoPlantsContract.address);
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
