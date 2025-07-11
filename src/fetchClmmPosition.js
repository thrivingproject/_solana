import { env } from "process";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

/**
 *
 * @param {String} positionID - The ID of the CLMM position to fetch.
 * @returns
 */
export async function fetchClmmPosition(positionID) {
  const url = env.RAYDIUM_IPFS_GATEWAY + positionID;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  // return data;
  return {
    mintA: {
      symbol: data.poolInfo.mintA.symbol.toUpperCase(),
      address: data.poolInfo.mintA.address,
      amount: data.positionInfo.amountA,
    },
    mintB: {
      symbol: data.poolInfo.mintB.symbol.toUpperCase(),
      address: data.poolInfo.mintB.address,
      amount: data.positionInfo.amountB,
    },
    positionValue: data.positionInfo.usdValue,
    unclaimedFee: data.positionInfo.unclaimedFee.usdValue,
  };
}
