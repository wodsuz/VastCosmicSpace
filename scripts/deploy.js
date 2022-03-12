// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const VastSpace = await hre.ethers.getContractFactory("VastSpacePlanets");
  const vastSpace = await VastSpace.deploy();

  await vastSpace.deployed();
  console.log("VastSpace to:", vastSpace.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
// VastSpace to: 0x2D572F29088B8471033aCcB4Bb373D7c9De8dCD0
// NEW! astSpace to: 0xC2C310107039c11D5C37A227A338e6D04c4deddE
