# Solana Position Dashboard

## Wallet accounts

Fetches all wallet token accounts and classifies them as LP tokens and non-LP tokens.

## Raydium CLMM LP

For each LP token:

- fetches Raydium LP position id and provides link to IPFS gateway
- for each asset in LP position, displays asset's value as a percentage of net value of entire LP position
- shows unclaimed fees

## Wallet Net Value

Fetches prices from DeFi Llama and displays net LP positions value, net unclaimed fees, and net idle tokens value.
