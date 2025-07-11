import { PublicKey } from "@solana/web3.js";
import { CLMM_PROGRAM_ID, getPdaPersonalPositionAddress } from "@raydium-io/raydium-sdk-v2";

/**
 * Generates the position ID for a given mint address.
 *
 * @param {String} mintAddress - The mint address of the position NFT.
 * @returns {String} - The public key of the position PDA.
 */
export function getPositionId(mintAddress) {
  const positionNftMint = new PublicKey(mintAddress);
  const { publicKey } = getPdaPersonalPositionAddress(CLMM_PROGRAM_ID, positionNftMint);
  return publicKey.toBase58();
}
