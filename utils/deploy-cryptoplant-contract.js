async function deployContract() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying Crypto Plants with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("PlantGrower");
  const token = await Token.deploy();

  console.log("Token address:", token.address);
}

deployContract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
