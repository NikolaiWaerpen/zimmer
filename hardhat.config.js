require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: __dirname + "/.env" });

const { DEV1_PRIVATE_KEY, ROPSTEN_ALCHEMY_API_KEY, RINKEBY_ALCHEMY_API_KEY } =
  process.env;

const ROPSTEN_URL = `https://eth-ropsten.alchemyapi.io/v2/${ROPSTEN_ALCHEMY_API_KEY}`,
  RINKEBY_URL = `https://eth-rinkeby.alchemyapi.io/v2/${RINKEBY_ALCHEMY_API_KEY}`;

module.exports = {
  solidity: "0.8.9",
  networks: {
    ropsten: {
      url: ROPSTEN_URL,
      accounts: [`${DEV1_PRIVATE_KEY}`],
    },
    rinkeby: {
      url: RINKEBY_URL,
      account: [`${DEV1_PRIVATE_KEY}`],
    },
  },
};
