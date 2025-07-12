import { getLiq } from "../getLiq.js";
import { formatToDollars } from "../util/formatToDollars.js";

export default async function Page() {
  const { LpPositions, unclaimedFees, netLpValue, netIdleValue } = await getLiq();

  return (
    <div>
      {LpPositions.map(({ mintA, mintB, unclaimedFee, positionValue }, indx) => (
        <div key={indx}>
          <h1>
            {mintA.symbol} / {mintB.symbol}
          </h1>
          <p>
            {mintA.percent}% - {mintB.percent}%
          </p>
          <p>
            <i>Position: {formatToDollars(positionValue)}</i>
          </p>
          <p style={{ marginBottom: "1.5rem", fontSize: "18px" }}>
            <i>Fee: {formatToDollars(unclaimedFee)}</i>
          </p>
        </div>
      ))}
      <h2>Unclaimed Fees: {formatToDollars(unclaimedFees)}</h2>
      <h2>Value: {formatToDollars(netIdleValue + netLpValue + unclaimedFees)}</h2>
    </div>
  );
}
