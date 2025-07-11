/**
 * Fetches the current prices of tokens from the Llama API. Returns a map.
 * Keys are all the symbol in uppercase.
 *
 * @param {String} uniqueTokenAddresses addresses to get prices for
 * @returns {Promise<Map<string, { price: number, symbol: string }>>}
 */
export async function getLlamaPrices(uniqueTokenAddresses) {
  const path = uniqueTokenAddresses.map(a => `solana:${a}`).join(",");
  const url = `https://coins.llama.fi/prices/current/${path}`;
  const res = await fetch(url);
  const json = await res.json();

  return new Map(
    Object.entries(json.coins).map(([key, { symbol, price }]) => {
      // strip off the "solana:" prefix to get just the address
      const address = key.split(":")[1];
      return [address, { symbol, price }];
    })
  );
}
