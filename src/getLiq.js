import { getTokenAccounts } from "./getTokenAccounts.js";
import { fetchClmmPosition } from "./fetchClmmPosition.js";
import { getPositionId } from "./getPositionId.js";
import { getLlamaPrices } from "./getLlamaPrices.js";

export async function getLiq() {
  const { lpTokenAccounts, nonLpTokenAccounts, solBalance } = await getTokenAccounts();
  const LpPositions = await Promise.all(
    lpTokenAccounts.map(({ account }) =>
      fetchClmmPosition(getPositionId(account.data.parsed.info.mint))
    )
  );
  const uniqueTokenAddresses = new Set([
    ...LpPositions.flatMap(position => [position.mintA.address, position.mintB.address]),
    ...nonLpTokenAccounts.map(({ account }) => account.data.parsed.info.mint),
  ]);
  const priceMap = await getLlamaPrices([...uniqueTokenAddresses]);

  let netIdleValue = solBalance * priceMap.get(process.env.SOLANA_TOKEN_ADDRESS).price;
  let netLpValue = 0;
  let unclaimedFees = 0;

  // Add value of idle tokens
  nonLpTokenAccounts.forEach(({ account }) => {
    const info = account.data.parsed.info;
    netIdleValue += info.tokenAmount.uiAmount * priceMap.get(info.mint).price;
  });

  // Add value of LP tokens
  LpPositions.forEach(({ mintA, mintB, positionValue, unclaimedFee }) => {
    unclaimedFees += unclaimedFee;
    netLpValue += positionValue;
    mintA.usd = priceMap.get(mintA.address).price * mintA.amount;
    mintA.percent = Math.round((mintA.usd / positionValue) * 100);
    mintB.usd = priceMap.get(mintB.address).price * mintB.amount;
    mintB.percent = Math.round((mintB.usd / positionValue) * 100);
  });

  return { LpPositions, netIdleValue, netLpValue, unclaimedFees, priceMap };
}
