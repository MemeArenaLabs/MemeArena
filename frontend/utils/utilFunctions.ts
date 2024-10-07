import { PublicKey } from "@solana/web3.js";

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

export const calculateUsdValue = (
  amount: string,
  coinName: string,
  coinPrices: { [key: string]: number }
): string => {
  const price = coinPrices[coinName] || 0;
  const usdValue = parseFloat(amount.replace(/,/g, "")) * price;
  return isNaN(usdValue) ? "0.00" : usdValue.toFixed(2);
};

export function truncateSolanaAddress(address: PublicKey | string): string {
  address = address.toString();
  const prefix = address.slice(0, 4);
  const suffix = address.slice(-4);

  return `${prefix}...${suffix}`;
}
