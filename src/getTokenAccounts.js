import { env } from "process";
import { Connection, PublicKey } from "@solana/web3.js";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

/**
 * Fetches token accounts
 *
 * @returns {Promise<{ lpTokenAccounts: Array<{pubKey: PublicKey, account: AccountInfo<ParsedAccountData>}>, nonLpTokenAccounts: Array<{pubKey: PublicKey, account: AccountInfo<ParsedAccountData>}>, solBalance: number }>} two arrays, one for LP token accounts and one for non-LP token accounts.
 */
export async function getTokenAccounts() {
  const connection = new Connection(env.SOLANA_RPC_ENDPOINT, "confirmed");
  const owner = new PublicKey(env.SOL_WALLET_ADDRESS);
  const { value } = await connection.getParsedTokenAccountsByOwner(owner, {
    programId: new PublicKey(env.TOKEN_2022_PROGRAM_ID),
  });

  // Separate LP and non-LP token accounts
  const lpTokenAccounts = [];
  const nonLpTokenAccounts = [];

  // Separate LP and non-LP token accounts
  value.forEach(acct => {
    const decimals = acct.account.data.parsed.info.tokenAmount.decimals;
    if (decimals === 0) {
      lpTokenAccounts.push(acct);
    } else {
      nonLpTokenAccounts.push(acct);
    }
  });

  // Get SOL balance (in lamports, convert to SOL)
  const lamports = await connection.getBalance(owner);
  const solBalance = lamports / 1e9;

  return { lpTokenAccounts, nonLpTokenAccounts, solBalance };
}
