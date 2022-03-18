require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  solidity: "0.8.4",
  networks: {
    kovan: {
      url: `https://mainnet.infura.io/v3/${process.env.PROVIDER}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    }
  }
};
