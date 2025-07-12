# Solana Position Dashboard

This app allows you monitor your Raydium LP positions without connecting a wallet or using a private key so that LP tokens can be moved to cold storage. This allows you to see if your position is still in range and your unclaimed fees while keeping your wallet cold. Also shows the net value of all of the LP positions and idle tokens in the wallet.

## Wallet accounts

Fetches all wallet token accounts and classifies them as LP tokens and non-LP tokens.

## Raydium CLMM LP

For each LP token:

- fetches Raydium LP position id and provides link to IPFS gateway
- for each asset in LP position, displays asset's value as a percentage of net value of entire LP position
- shows unclaimed fees

## Wallet Net Value

Fetches prices from DeFi Llama and displays net LP positions value, net unclaimed fees, and net idle tokens value.
