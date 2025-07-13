import { Connection, PublicKey } from "@solana/web3.js";
import { SOLANA_RPC_ENDPOINT } from "./config.js";
import { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";

/**
 * Fetches token accounts
 *
 * @returns {Promise<{ lpTokenAccounts: Array<{pubKey: PublicKey, account: AccountInfo<ParsedAccountData>}>, nonLpTokenAccounts: Array<{pubKey: PublicKey, account: AccountInfo<ParsedAccountData>}>, solBalance: number }>} two arrays, one for LP token accounts and one for non-LP token accounts.
 */
export async function getTokenAccounts() {
  const connection = new Connection(SOLANA_RPC_ENDPOINT, "confirmed");
  const owner = new PublicKey(process.env.SOL_WALLET_ADDRESS);

  // Fetch accounts from both programs
  const [tokenAccounts, token2022Accounts] = await Promise.all([
    connection.getParsedTokenAccountsByOwner(owner, {
      programId: new PublicKey(TOKEN_PROGRAM_ID),
    }),
    connection.getParsedTokenAccountsByOwner(owner, {
      programId: new PublicKey(TOKEN_2022_PROGRAM_ID),
    }),
  ]);

  // Combine both sets of accounts
  const allAccounts = [...tokenAccounts.value, ...token2022Accounts.value];

  // Separate LP and non-LP token accounts
  const lpTokenAccounts = [];
  const nonLpTokenAccounts = [];

  // Separate LP and non-LP token accounts
  allAccounts.forEach(acct => {
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
