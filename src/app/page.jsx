import { getLiq } from "../getLiq.js";
import { formatToDollars } from "../util/formatToDollars.js";

export const dynamic = "force-dynamic";

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
            <i>Unclaimed fee: {formatToDollars(unclaimedFee)}</i>
          </p>
        </div>
      ))}
      <p>
        <i>
          Net LP & unclaimed fees: {formatToDollars(netLpValue)} + {formatToDollars(unclaimedFees)}
        </i>
      </p>
      <p>
        <i>Net idle value: {formatToDollars(netIdleValue)}</i>
      </p>
      <h2>Total: {formatToDollars(netIdleValue + netLpValue + unclaimedFees)}</h2>
    </div>
  );
}
