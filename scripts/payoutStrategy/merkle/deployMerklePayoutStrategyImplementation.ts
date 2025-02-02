// This script deals with deploying the MerklePayoutStrategyImplementation on a given network
import hre, { ethers } from "hardhat";
import { confirmContinue, getBlocksToWait } from "../../../utils/script-utils";
import * as utils from "../../utils";

utils.assertEnvironment();

export async function main() {
  await confirmContinue({
    contract: "MerklePayoutStrategyImplementation",
    network: hre.network.name,
    chainId: hre.network.config.chainId,
  });

  // Deploy MerklePayoutStrategyImplementation
  const contractFactory = await ethers.getContractFactory(
    "MerklePayoutStrategyImplementation"
  );
  const contract = await contractFactory.deploy();

  console.log(
    `Deploying MerklePayoutStrategyImplementation to ${contract.address}`
  );
  await contract.deployTransaction.wait(getBlocksToWait(hre.network.name));
  console.log("✅ Deployed");

  return contract.address;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
