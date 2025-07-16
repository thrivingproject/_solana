import { ethers } from "ethers";
import { ARBITRUM_RPC } from "../config.js";
import { removeLiquidityBurnPosition } from "./removeLiquidityBurn.ts";
import "dotenv/config";

const a = [4632740, 4633927, 4643218, 4645615];

const wallet = new ethers.Wallet(
    process.env.ETH_PRIVATE_KEY!,
    new ethers.JsonRpcProvider(ARBITRUM_RPC)
);

for (const id of a) {
    await removeLiquidityBurnPosition(wallet, id).catch(error => {
        console.error("Error removing liquidity and burning position:", error);
    });
}
