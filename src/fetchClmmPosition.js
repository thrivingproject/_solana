import { RAYDIUM_IPFS_GATEWAY } from "./config.js";

/**
 *
 * @param {String} positionID - The ID of the CLMM position to fetch.
 * @returns
 */
export async function fetchClmmPosition(positionID) {
  const url = RAYDIUM_IPFS_GATEWAY + positionID;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  // return data;
  return {
    ipfs: url,
    mintA: {
      symbol: data.poolInfo.mintA.symbol.toUpperCase(),
      address: data.poolInfo.mintA.address,
      amount: data.positionInfo.amountA,
      usd: 0,
      percent: 0,
    },
    mintB: {
      symbol: data.poolInfo.mintB.symbol.toUpperCase(),
      address: data.poolInfo.mintB.address,
      amount: data.positionInfo.amountB,
      usd: 0,
      percent: 0,
    },
    positionValue: data.positionInfo.usdValue,
    unclaimedFee: data.positionInfo.unclaimedFee.usdValue,
  };
}
