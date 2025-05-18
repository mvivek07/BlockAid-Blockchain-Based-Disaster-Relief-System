const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const contract = await HelloWorld.deploy();

  await contract.waitForDeployment(); // ✅ This is the correct method in newer Hardhat versions

  console.log("Contract deployment: HelloWorld");
  console.log("Contract address:", await contract.getAddress());

  const tx = contract.deploymentTransaction();
  console.log("Transaction: ", tx?.hash);
  console.log("From: ", tx?.from);
  console.log("Gas used (estimated): ", tx?.gasLimit.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
