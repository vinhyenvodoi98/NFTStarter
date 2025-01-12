import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config';

const config: HardhatUserConfig = {
  defaultNetwork: 'localhost',
  networks: {
    localhost: {
      url: 'http://localhost:8545',
    },
    sepolia: {
      url: 'https://eth-sepolia.public.blastapi.io',
      accounts: [process.env.ACCOUNT_PRIVATE_KEY as `0x${string}`],
    },
    ethereum: {
      url: 'https://eth.llamarpc.com',
      accounts: [process.env.ACCOUNT_PRIVATE_KEY as `0x${string}`],
    },
  },
  solidity: "0.8.28",
};

export default config;
