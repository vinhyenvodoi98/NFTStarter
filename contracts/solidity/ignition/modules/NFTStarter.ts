import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import 'dotenv/config';

export default buildModule("NFTStarter", (m) => {
    const name = process.env.NAME as string;
    const symbol = process.env.SYMBOL as string;
    const nft = m.contract("NFTStarter", [name, symbol]);

    return { nft };
});
