import "hardhat-etherscan-abi";
import "@nomiclabs/hardhat-waffle";
import "@xyrusworx/hardhat-solidity-json";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-contract-sizer";
import {HardhatUserConfig} from "hardhat/config";

const mnemonic = "major ostrich lake feed mean term sort essay claw catch deal toddler naive subject inmate";

const accounts = {
  count: 10,
  initialIndex: 0,
  mnemonic,
  path: "m/44'/60'/0'/0",
};

export const config: HardhatUserConfig & any = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      accounts,
      chainId: 43114,
      blockGasLimit: 30000000,
    }
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
            details: {
              yul: true,
            },
          },
          viaIR: true,
        },
      },
    ],
  },
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/solidity-template/issues/31
        bytecodeHash: "none",
      },
      // You should disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
    },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};

export default config;
