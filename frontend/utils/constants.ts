import { Token } from "@/types/tokens";

export const BACKGROUND_IMAGE = "/assets/backgrounds/main-bg.png";

export type Coin = {
  name: string;
  tickerSymbol: Token;
  iconUrl: string;
};

export type MemeCoin = Coin & {
  gladiatorIcon?: string;
};

export const supportedCoins: (MemeCoin | Coin)[] = [
  {
    name: "Solana",
    tickerSymbol: Token.SOL,
    iconUrl: "/assets/coin-logos/solana.svg",
  },
  {
    name: "DOG WIF HAT",
    tickerSymbol: Token.WIF,
    iconUrl: "/assets/coin-logos/wif.png",
    gladiatorIcon: "/assets/gladiators/no-bg/wif.png",
  },
  {
    name: "POPCAT",
    tickerSymbol: Token.POPCAT,
    iconUrl: "/assets/coin-logos/popcat.png",
    gladiatorIcon: "/assets/gladiators/no-bg/popcat.png",
  },
  {
    name: "BONK",
    tickerSymbol: Token.BONK,
    iconUrl: "/assets/coin-logos/bonk.png",
    gladiatorIcon: "/assets/gladiators/no-bg/bonk.png",
  },
  {
    name: "GIGACHAD",
    tickerSymbol: Token.GIGA,
    iconUrl: "/assets/coin-logos/gigachad.png",
    gladiatorIcon: "/assets/gladiators/no-bg/gigachad.png",
  },
  {
    name: "PONKE",
    tickerSymbol: Token.BONK,
    iconUrl: "/assets/coin-logos/ponke.png",
    gladiatorIcon: "/assets/gladiators/no-bg/ponke.png",
  },
];
