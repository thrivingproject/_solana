import { getLiq } from "./getLiq.js";
import { formatToDollars } from "./util/formatToDollars.js";

async function main() {
  const liq = await getLiq();

  liq.LpPositions.forEach(({ mintA, mintB, unclaimedFee }) => {
    console.log(`${mintA.symbol}: ${mintA.percent}%`);
    console.log(`${mintB.symbol}: ${mintB.percent}%`);
    console.log(`Fee: ${formatToDollars(unclaimedFee)}\n`);
  });
  console.log(`Unclaimed Fees: ${formatToDollars(liq.unclaimedFees)}`);
  console.log(`Value: ${formatToDollars(liq.netLpValue + liq.netIdleValue + liq.unclaimedFees)}`);
}

main();
