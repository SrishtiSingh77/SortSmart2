const hre = require("hardhat");

async function main() {
  const WasteLogger = await hre.ethers.getContractFactory("WasteLogger");
  const wasteLogger = await WasteLogger.deploy();

  await wasteLogger.waitForDeployment(); // ✅ New ethers-v6 style
  console.log(`Contract deployed to: ${wasteLogger.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
