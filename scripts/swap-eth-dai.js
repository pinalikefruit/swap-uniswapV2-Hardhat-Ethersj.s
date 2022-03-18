const { legos } = require('@studydefi/money-legos');
const { ethers } = require('hardhat');
const moment = require('moment');

//Set provider
const network = 'kovan';
const provider = ethers.getDefaultProvider(network);

//Kovan DAI token  https://kovan.etherscan.io/address/0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa
const DAI_ABI = legos.erc20.dai.abi;
const DAI_ADDRESS = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa';
const daiContract = new ethers.Contract(DAI_ADDRESS, DAI_ABI, provider);


//Kovan Uniswap v2 Router 02  https://kovan.etherscan.io/address/0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
const EXCHANGE_ABI = legos.uniswapV2.router02.abi;
const EXCHANGE_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
const exchangeContract = new ethers.Contract(EXCHANGE_ADDRESS, EXCHANGE_ABI, provider);


//Set deadline
const now = moment.unix();
const DEADLINE = now + 60;

// Transaction Setting
const SETTING = {
  gasLimit: 3000000,
  gasPrice: 5000000000,
  from: '[YOUR_PUBLIC_KEY]',
  value: ethers.utils.parseUnits("0.001", 18)
}

async function main() {
  let balance;

  //Check ether balance BEFORE swap
  balance = await ethers.provider.getBalance(SETTING.from);
  balance = ethers.utils.formatEther(balance);
  console.log(`Ether balance is: ${balance} ETH`);

  //Check DAI balance BEFORE swap
  balance = await daiContract.balanceOf(SETTING.from);
  balance = ethers.utils.formatEther(balance);
  console.log(`Dai balance is: ${balance} DAI`);

  const [signer] = await ethers.getSigners();
  const exchangeWithSigner = exchangeContract.connect(signer);

  //Get WETH address
  const WETH_ADDRESS = await exchangeContract.WETH();

  //Array of tokens address
  const pairArray = [WETH_ADDRESS, DAI_ADDRESS];

  //Get DAI amount for 0.001 ETH
  const tokenAmount = await exchangeContract.getAmountsOut(SETTING.value, pairArray);

  console.log(`${ethers.utils.formatEther(SETTING.value)} ETH will be swapped to ${ethers.utils.formatEther(tokenAmount[1])} `);


  const tx = await exchangeWithSigner.swapETHForExactTokens(tokenAmount[1].toString(), pairArray, SETTING.from, DEADLINE, SETTING);

  receipt = await tx.wait();
  console.log(`Succesful swap: https://kovan.etherscan.io/tx/${receipt.transactionHash}`);

  //Check Ether balance after swap
  balance = await ethers.provider.getBalance(SETTING.from);
  balance = ethers.utils.formatEther(balance);
  console.log(`The new ether balance is: ${balance} ETH`);

  //Check DAI balance AFTER swap
  balance = await daiContract.balanceOf(SETTING.from);
  balance = ethers.utils.formatEther(balance);
  console.log(`The new DAI balance ${balance} DAI`)

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
