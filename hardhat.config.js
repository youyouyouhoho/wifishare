require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",

networks:{
  hardhat:{
    chainId:1337
  },
  mumbai: {
    url: "https://polygon-mumbai.blockpi.network/v1/rpc/public",
    accounts: ["b0acc6fa7d342cadacb0b1cd46255bbfe9ed9cd7bc56096ad71b477846e1978b"]
  },
  ganache:{
    url:"http://127.0.0.1:7545",
    accounts:["0xfdd0c2fd6ed13b6a2ddb9d8e81c25d50f4cc7e54883011f8220983a0c5bcdfb8"]
  }}
};