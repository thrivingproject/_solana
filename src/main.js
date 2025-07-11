import { getLiq } from "./getLiq.js";
import { formatToDollars } from "./util/formatToDollars.js";

async function main() {
  const { LpPositions, unclaimedFees, netLpValue, netIdleValue } = await getLiq();

  LpPositions.forEach(({ mintA, mintB, unclaimedFee }) => {
    console.log(`${mintA.symbol}: ${mintA.percent}%`);
    console.log(`${mintB.symbol}: ${mintB.percent}%`);
    console.log(`Fee: ${formatToDollars(unclaimedFee)}\n`);
  });
  console.log(`Unclaimed Fees: ${formatToDollars(unclaimedFees)}`);
  console.log(`Value: ${formatToDollars(netLpValue + netIdleValue + unclaimedFees)}`);
}

main();
