import Link from "next/link.js";
import { getLiq } from "../getLiq.js";
import { formatToDollars } from "../util/formatToDollars.js";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { LpPositions, unclaimedFees, netLpValue, netIdleValue } = await getLiq();

  return (
    <div>
      <h1>
        <Link
          className="external-link"
          target="_blank"
          href={process.env.SOLSCAN_URL + process.env.SOL_WALLET_ADDRESS}>
          {process.env.SOL_WALLET_ADDRESS}
        </Link>
      </h1>
      {LpPositions.map(({ mintA, mintB, unclaimedFee, positionValue, ipfs }, indx) => (
        <div key={indx}>
          <h2>
            <Link href={ipfs} target="_blank" className="external-link">
              {mintA.symbol} / {mintB.symbol}
            </Link>
          </h2>
          <p>
            <b>
              {mintA.percent}% - {mintB.percent}%
            </b>
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
        <i>Net idle value: {formatToDollars(netIdleValue)}</i>
      </p>
      <p>
        <i>
          Net LP & unclaimed fees: {formatToDollars(netLpValue)} + {formatToDollars(unclaimedFees)}
        </i>
      </p>
      <h2>Total: {formatToDollars(netIdleValue + netLpValue + unclaimedFees)}</h2>
    </div>
  );
}
