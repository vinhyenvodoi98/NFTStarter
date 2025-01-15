import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import 'dotenv/config';

export default buildModule("NFTBridgeEthereum", (m) => {
  const contractMsgAddress = process.env.CONTRACT_MSG_ADDRESS as `0x${string}`;

  const bridge = m.contract("NFTBridgeEthereum", [contractMsgAddress]);

  return { bridge };
});
