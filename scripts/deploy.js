const fs = require('fs');
const {ethers} = require("hardhat")
async function main()
{   
    const Wifidemo = await ethers.getContractFactory("wifishare");
    console.log("Deploy contract .....")
    const wifidemo = await Wifidemo.deploy()
    await wifidemo.deployed()
    console.log(
        ` deployed to ${wifidemo.address}`
      );

    console.log(`ownerAddress: ${wifidemo.signer.address}`);
    const chainId = await ethers.provider.getNetwork().then((network) => network.chainId);
    console.log("Chain ID:", chainId);
    fs.writeFileSync('./config2'+chainId.toString()+'.js', `
    export const chainId = "${chainId}"
    export const contractAddress = "${wifidemo.address}"
    export const ownerAddress = "${wifidemo.signer.address}"
    `)
}
main()
    .then(()=> process.exit(0))
    .catch((error) =>{console.error(error);
    process.exit(1);});