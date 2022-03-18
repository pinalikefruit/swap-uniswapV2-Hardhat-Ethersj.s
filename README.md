### How to swap in with Uniswap v2 with Web3.js and Truffle.

In this repo, you can interact with the Uniswap protocol v2.
I'm show an example simple swap between ETH -> WETH -> DAI. Can you find the address exchange for any other token you want to swap.[Uniswap v2 Router 02](https://kovan.etherscan.io/address/0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D) and using [Uniswap v2 Factory](https://kovan.etherscan.io/address/0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f#readContract) Can you find the address exchange for any other token you want to swap.

Will you work with [Hardhat](https://hardhat.org/) like development enviroment and the library [Ethers.js](https://docs.ethers.io/) that allow you to interact with remote ethereum node in this case the Kovan test network.

> [Get Faucet](https://faucets.chain.link/) Ether for Kovan Testnet

#### Prerequsites
Please install or have installed the following:
* nodejs (v16.13.2) and npm (8.1.2).

#### Installation

1. Clone this repo
`git clone https://github.com/pinajmr/swap-uniswapV2-Hardhat-Ethersjs.git Swap-with-UniswapV2`
2. Then, 
`cd Swap-with-UniswapV2`.
3. Install dependencies using 
`npm install`.
4. update .env_example file for .env and change the information.
5. Update Public_Key in script files.

#### Usage
##### Running Scripts
`truffle exec scripts/swap-eth-dai.js --network kovan  `

#### Help
You can contact to me in discord like pinajmr#4347 glad to help you.

Remember: _Only your work on Kovan testnet_.