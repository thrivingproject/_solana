import { ethers } from "ethers";
import INonfungiblePositionManagerABI from "@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json";
import { UNISWAP_NF_POS_MANAGER_ADDRESS } from "../config.js";

export async function removeLiquidityBurnPosition(wallet: ethers.Wallet, tokenId: number) {
    const manager = new ethers.Contract(
        UNISWAP_NF_POS_MANAGER_ADDRESS,
        INonfungiblePositionManagerABI.abi,
        wallet
    );

    console.log(`Checking liquidity for position ${tokenId}`);
    const { liquidity } = await manager.positions(tokenId);
    if (liquidity !== 0n) {
        const deadline = Math.floor(Date.now() / 1000) + 600;

        console.log("Decreasing liquidity...");
        await (
            await manager.decreaseLiquidity({
                tokenId,
                liquidity,
                amount0Min: 0,
                amount1Min: 0,
                deadline,
            })
        ).wait();

        console.log("Collecting fees...");
        await (
            await manager.collect({
                tokenId,
                recipient: wallet.address,
                amount0Max: ethers.MaxUint256,
                amount1Max: ethers.MaxUint256,
            })
        ).wait();
    } else console.log("No Liquidity");

    // Burn the nft
    console.log("Burning...");
    await (await manager.burn(tokenId)).wait();

    console.log(`✅ Position ${tokenId} fully removed and burned.`);
}
